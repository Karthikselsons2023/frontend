import { useState } from "react";
import ChatList from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function ChatApp() {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="h-screen flex bg-amber-600">

      <div
        className={`w-full md:w-1/3 border-r bg-white ${
          activeChat ? "hidden md:block" : "block"
        }`}
      >
        <ChatList onSelect={setActiveChat} />
      </div>


      <div
        className={`flex-1 ${
          activeChat ? "block" : "hidden md:flex"
        }`}
      >
        {activeChat ? (
          <ChatWindow chat={activeChat} onBack={() => setActiveChat(null)} />
        ) : (
          <div className="flex items-center justify-center w-full text-gray-400">
            Select a chat
          </div>
        )}
      </div>
    </div>
  );
}
