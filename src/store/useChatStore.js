import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import {useAuthStore} from "./useAuthStore.js";

export const useChatStore = create((set,get) => ({
    messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  currentPage: 'home',

  setPage: (page) => {
    console.log("Setting page to:", page);
    set({ currentPage: page})
  },

  }));
