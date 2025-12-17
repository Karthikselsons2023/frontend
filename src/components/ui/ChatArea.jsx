import React, { useEffect, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import { formatMessageTime } from "../../lib/utils";



const ChatArea = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeToMessages,
    subscribeToTyping,
    unsubscribeFromTyping,
    isTyping,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const bottomRef = useRef(null);
  
  // Fetch messages when user changes
  useEffect(() => {
    if (!selectedUser || !authUser) return;

    getMessages({
      sender_id: authUser.user_id,
      receiver_id: selectedUser.user_id,
    });

    subscribeToMessages();
    subscribeToTyping();


    console.log("messages fetched in fronrtend:", messages);

    

    return () => {
      unsubscribeToMessages();
      unsubscribeFromTyping();
    }
  }, [selectedUser?.user_id]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages,isTyping]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  
  console.log("Selected user: ",selectedUser.user_id)
  

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((message, index) => {
        const isMine = message.user_id === authUser.user_id;

        return (
          <div
            key={`${message.user_id}-${message.created_at}-${index}`}
            className={`chat   ${isMine ? "chat-end " : "chat-start"}`}
          >
            <div className="chat-header  mb-1 text-black">
              <time className="text-xs opacity-50">
                {formatMessageTime(message.created_at)}
              </time>
            </div>

            <div className={`chat-bubble ${isMine ? "bg-[#5878DF] " : "bg-[#2f2f2f]"} text-white rounded-xl`}>
              <h2>{message.message_text}</h2>
            </div>
          </div>
        );
      })}
      {isTyping && (
  <div className="text-sm mb-3 text-gray-800 italic ml-2">
    typing...
  </div>
)}
      <div ref={bottomRef} />
        
    </div>
  );
};

export default ChatArea;
