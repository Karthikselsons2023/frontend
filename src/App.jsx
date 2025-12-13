import React , {useEffect} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import GroupsPage from "./pages/GroupsPage.jsx";
import { Loader } from "lucide-react";
import { useAuthStore } from "./store/useAuthStore.js";
import SettingsPage from "./pages/SettingsPage.jsx";

export default function App() {
   const { authUser, checkAuth, isCheckingAuth, } = useAuthStore();
    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth && !authUser) {
    return (
        <div className="flex items-center justify-center h-screen bg-surface-dark">
          <span className="loading loading-ring loading-xl text-main"></span>
        </div>
    );
  }
  return (
    <div className="h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />}  />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/groups" element={authUser ? <GroupsPage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        
      </Routes>
    </div>
  );
}
