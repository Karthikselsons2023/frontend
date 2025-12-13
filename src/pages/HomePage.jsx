import React from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/ui/BottomNav";
import OnlineUsersSlider from "../components/OnlineUsersSlider";
import NewChat from "../components/ui/NewChat";
import LoginPage from "./LoginPage";



export default function HomePage() {
  const { authUser, isLogginIn } = useAuthStore();
  return (
    <div>
      {authUser ? (
        <div className="min-h-screen bg-white border-1 inter-large pt-5 border-[#e9e9e9] sm:w-[65vw] w-full  items-center flex flex-col mx-auto">
          <Header />
          <OnlineUsersSlider />
          <BottomNav />
        </div>
      ) : (
        // <LoginPage />
        <div className="min-h-screen bg-white border-1 inter-large pt-5 border-[#e9e9e9] sm:w-[65vw] w-full  items-center flex flex-col mx-auto">
          <Header />
          <OnlineUsersSlider />
          <BottomNav />
        </div>
      )}
    </div>
  );
}
