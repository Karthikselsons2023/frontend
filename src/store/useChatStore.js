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
    set({ selectedUser });
  },
 sendMessage: async (payload) => {
  console.log("POST /chat/send payload:", payload);
  await axiosInstance.post("/chat/send", payload);
}


}));
