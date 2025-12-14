import React, { useRef, useState } from 'react';
import toast from "react-hot-toast";
import { useChatStore } from '../../store/useChatStore';
import { Image } from 'lucide-react';
import { Send } from 'lucide-react';
import { X } from 'lucide-react';

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file?.type?.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setImageFile(file);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        // if (!text && !imageFile) {
        //     toast.error("Please type a message or select an image");
        //     return;
        // }

        // try {
        //     await sendMessage({ text: text.trim(), image: imagePreview });
        //     setText("");
        //     setImagePreview(null);
        //     if (fileInputRef.current) fileInputRef.current.value = "";
        // } catch (error) {
        //     console.error("Failed to send message:", error);
        // }

        toast.success('Successfully clicked')
    };

    return (
        <div className="p-4 w-full bg-white text-main">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-muted"
                        />
                        <button
                            onClick={removeImage}
                            className="p-1 cursor-pointer absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-surface flex items-center justify-center"
                            type="button"
                        >
                            <X />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-xl border-2  sm:input-md bg-white text-black border-gray-300 focus-within:border-[#998eff]"
                        value={text}
                        placeholder="Type a message..."
                        onChange={(e) => setText(e.target.value)}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className={`sm:flex btn btn-circle rounded-xl shadow-none bg-[#edebff]  border-1 border-gray-300 ${imagePreview ? "text-success" : "text-muted"
                            }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image className='text-[#555555]' />
                    </button>
                </div>

                <button
                    type="submit"
                    className="btn btn-circle rounded-xl shadow-none bg-[#ebebff] border-1 border-gray-300"
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send className='text-[#555555]' />
                </button>
            </form>
        </div>
    )
}

export default MessageInput