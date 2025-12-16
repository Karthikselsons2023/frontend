import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  currentPage: 'home',
  isTyping: false,

  emitTyping: () => {
    const socket = useAuthStore.getState().socket;
    const authUser = useAuthStore.getState().authUser;
    const { selectedUser } = get();

    if (!selectedUser) return;

    socket.emit("typing", {
      senderId: authUser.user_id,
      receiverId: selectedUser.user_id,
    });
  },

  emitStopTyping: () => {
    const socket = useAuthStore.getState().socket;
    const authUser = useAuthStore.getState().authUser;
    const { selectedUser } = get();

    if (!selectedUser) return;

    socket.emit("stopTyping", {
      senderId: authUser.user_id,
      receiverId: selectedUser.user_id,
    });
  },

  subscribeToTyping: () => {
    const socket = useAuthStore.getState().socket;
    const { selectedUser } = get();

    socket.on("typing", ({ senderId }) => {
      if (senderId === selectedUser?.user_id) {
        set({ isTyping: true });
      }
    });

    socket.on("stopTyping", ({ senderId }) => {
      if (senderId === selectedUser?.user_id) {
        set({ isTyping: false });
      }
    });
  },

  unsubscribeFromTyping: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("typing");
    socket.off("stopTyping");
  },
  clearMessages : async () => {
    set({messages: []});
  },



  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },




  getMessages: async ({ sender_id, receiver_id }) => {
  if (!sender_id || !receiver_id) return;

  set({ isMessagesLoading: true });

  try {
    const res = await axiosInstance.get(
      `/chat/getMessages?receiver_id=${receiver_id}&sender_id=${sender_id}`
    );

    console.log("received messages:", res.data);

    set({ messages: res.data.messages });
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to load messages"
    );
  } finally {
    set({ isMessagesLoading: false });
  }
},


  

  subscribeToMessages: () => {
  const { selectedUser } = get();
  if (!selectedUser) return;

  const socket = useAuthStore.getState().socket;
  const authUser = useAuthStore.getState().authUser;

  socket.on("newMessage", (newMessage) => {
  const isCurrentChat =
    (newMessage.user_id === selectedUser.user_id &&
      newMessage.receiver_id === authUser.user_id) ||
    (newMessage.user_id === authUser.user_id &&
      newMessage.receiver_id === selectedUser.user_id);

  if (!isCurrentChat) return;

  set({ messages: [...get().messages, newMessage] });
});

},


  unsubscribeToMessages:()=>{
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setPage: (page) => {
    console.log("Setting page to:", page);
    set({ currentPage: page })
  },
  setSelectedUser: (selectedUser) => {
    set({ selectedUser,
      messages: [], 
     });
    
  },
 sendMessage: async (payload) => {
  console.log("POST /chat/send payload:", payload);
  await axiosInstance.post("/chat/send", payload);
}


}));
