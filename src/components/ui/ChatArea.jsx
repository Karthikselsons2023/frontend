import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../../store/useChatStore.js';
import { formatMessageTime } from "../../lib/utils.js";
import { useAuthStore } from '../../store/useAuthStore.js';


const ChatArea = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeToMessages
  } = useChatStore();


  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // useEffect(() => {
  //   getMessages(selectedUser.user_id)
  // }, [selectedUser.user_id, getMessages, subscribeToMessages, unsubscribeToMessages])

  // useEffect(() => {
  //   if (messageEndRef.current && messages) {
  //     messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages])

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-main">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    // <div className="flex-1 overflow-y-auto p-4 space-y-4">
    //   {messages.map((message) => (
    //     <div
    //       key={message.id}
    //       className={`chat ${message.user_id === authUser.user_id ? "chat-end" : "chat-start"}`}
    //       ref={messageEndRef}
    //     >
    //       {/* <div className="chat-image avatar">
    //         <div className="size-10 rounded-full border border-muted">
    //           <img
    //             src={
    //               message.senderId === authUser._id
    //                 ? authUser.profilePic || "/profile-pic.jpg"
    //                 : selectedUser.profilePic || "/profile-pic.jpg"
    //             }
    //             alt="profile pic"
    //           />
    //         </div>
    //       </div> */}

    //       <div className="chat-header mb-1">
    //         <time className="text-xs text-muted ml-1">
    //           {formatMessageTime(message.createdAt)}
    //         </time>
    //       </div>

    //       <div className="chat-bubble flex flex-col bg-surface-dark text-main">
    //         {message.file_url && message.file_type==="img" (
    //           <img
    //             src={message.file_url}
    //             alt="attachment"
    //             className="sm:max-w-[200px] rounded-md mb-2"
    //           />
    //         )}
    //         {message.message_text && <p>{message.message_text}</p>}
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <h1>
      hello
    </h1>
  )
}

export default ChatArea;