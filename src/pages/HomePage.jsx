import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/ui/BottomNav";
import NewChat from "../components/ui/NewChat";
import LoginPage from "./LoginPage";
import SettingsPage from "./SettingsPage.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from "../components/Sidebar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";


export default function HomePage() {
  const { authUser, isLogginIn, checkAuth, currentPage } = useAuthStore();
  const [activeChat, setActiveChat] = useState(null);

  console.log("Auth User in HomePage:", authUser);
  return (
    <div className="h-screen flex bg-amber-600">
      {/* Sidebar */}
      <div
        className={`w-full md:w-1/3 border-r bg-white ${activeChat ? "hidden md:block" : "block"
          }`}
      >
        <Sidebar onSelect={setActiveChat} />
      </div>

      {/* Chat Window */}
      <div
        className={`flex-1 ${activeChat ? "block" : "hidden md:flex"
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
