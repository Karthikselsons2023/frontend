import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "http://localhost:3000" //this is socket server or express server



export const useAuthStore = create((set,get)   => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket:null,
  allUsers: [],
  isFetchingAllUsers: false,

fetchAllUsers: async () => {
  set({ isFetchingAllUsers: true });
  try {
    const res = await axiosInstance.get("/allusers");
    set({ allUsers: res.data });
  } catch (error) {
    console.log("Error fetching all users:", error);
  } finally {
    set({ isFetchingAllUsers: false });
  }
},


   checkAuth: async () => {
      try {
        const res = await axiosInstance.get("/auth/check");
        set({ authUser: res.data });
        get().connectSocket()
      } catch (error) {
        console.log("Error in checkAuth: ", error);
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Successfully logged in!");
      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
    logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
    connectSocket: ()=>{
    const {authUser} = get();
    if(!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL,{
      query:{
        userId: authUser.user_id,
      },
      transports: ["websocket", "polling"],
      withCredentials: true,
    })
    socket.connect()

    set({socket:socket })

    socket.on("getOnlineUsers",(userIds)=>{
      set({onlineUsers: userIds})
    })
  },
  disconnectSocket: ()=>{
    if(get().socket?.connected) get().socket.disconnect(); // check if connected and them disconnect
  },
}));
