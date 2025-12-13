import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/ui/BottomNav";
import OnlineUsersSlider from "../components/OnlineUsersSlider";
import NewChat from "../components/ui/NewChat";
import LoginPage from "./LoginPage";
import SettingsPage from "./SettingsPage.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 


export default function HomePage() {
  const { authUser, isLogginIn, checkAuth, currentPage  } = useAuthStore();
  
  
  console.log("Auth User in HomePage:", authUser);
 return (
      <div className="min-h-screen bg-white border-1 inter-large pt-5 border-[#e9e9e9] sm:w-[65vw] w-full items-center flex flex-col mx-auto">
        <Header />
        <OnlineUsersSlider />
        <BottomNav />
      </div>
  );
}
