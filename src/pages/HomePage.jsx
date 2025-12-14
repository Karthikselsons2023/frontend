import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/ui/BottomNav";
import NewChat from "../components/ui/NewChat";
import LoginPage from "./LoginPage";
import SettingsPage from "./SettingsPage.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from "../components/Sidebar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import { MessageSquareHeart } from 'lucide-react';



export default function HomePage() {
  const { authUser, isLogginIn, checkAuth, currentPage } = useAuthStore();
  const { selectedUser, setSelectedUser } = useChatStore();

  console.log("Auth User in HomePage:", authUser);
  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar */}
      <div
        className={`w-full md:w-1/3 bg-white ${selectedUser ? "hidden md:block" : "block"
          }`}
      >
        <Sidebar />
      </div>

      {/* Chat Window */}
      <div
        className={`flex-1 ${selectedUser ? "block" : "hidden md:flex"
          }`}
      >
        {selectedUser ? (
          <ChatWindow onBack={() => setSelectedUser(null)} />
        ) : (
          <div className="flex items-center justify-center gap-3 w-full text-gray-400 nochatbg flex-col">
            <MessageSquareHeart
              size={60}
              className="text-[#9594e4]"
              style={{
                animation: "float 3s ease-in-out infinite",
              }}
            />

            <style>
              {`
@keyframes float {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
`}
            </style>
            <h1 className="inter-large text-[#9594e4] text-2xl">
              Select a Contact to Chat!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
