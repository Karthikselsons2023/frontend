import { useState } from "react";
import SearchSidebar from "./ui/SearchSidebar";
import Selector from "./ui/Selector";
import { PencilLine } from 'lucide-react';
import NewChatModal from "./ui/NewChatModal";
import { CircleUser } from 'lucide-react';
import ProfileDetailsModal from "./ui/ProfileDetailsModal";

const chats = [
  { id: 1, name: "Regis Saffi", last: "Checkout this project" },
  { id: 2, name: "Claire", last: "Haha oh man" },
  { id: 3, name: "Joe", last: "That’s terrifying 😂" },
];

export default function Sidebar({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const [query, setQuery] = useState("");
  return (
    <div className="h-full flex flex-col inter-large text-black">
        <div className="flex flex-row items-center justify-between p-4 font-semibold border-b inter-very-large text-2xl">
          <h1>Selsons <span className="mycolortext inter-large">Chat </span></h1> 
          <button onClick={() => setOpenProfile(true)} className="text-black cursor-pointer rounded-full"><CircleUser size={26} className=" " /></button>
        </div>
        
      <SearchSidebar value={query} onChange={setQuery} />
      <div className="flex justify-between h-11 mb-3 items-center">
        <div className="flex flex-row">
          <Selector label={'All'} />
          <Selector label={'Groups'} />
        </div>
        <button onClick={() => setOpen(true)} className="bg-transparent border-[#d9d4ff] border-[1.5px] transition px-5 rounded-xl items-center py-[5px] flex gap-2 mt-3 mr-3 hover:bg-[#d6d4ff] cursor-pointer text-sm">New Chat <PencilLine size={16}/></button>
        
       

       <ProfileDetailsModal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        title="Start new chat"
      >
        

        <button
          onClick={() => setOpen(false)}
          className="mt-6 w-full rounded-lg bg-indigo-600 py-2 text-white"
        >
          Continue
        </button>
      </ProfileDetailsModal>

      <NewChatModal
        open={open}
        onClose={() => setOpen(false)}
        title="Start new chat"
      >
        

        <button
          onClick={() => setOpen(false)}
          className="mt-6 w-full rounded-lg bg-indigo-600 py-2 text-white"
        >
          Continue
        </button>
      </NewChatModal>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSelect(chat)}
            className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100"
          >
            <div className="w-10 h-10 rounded-full bg-gray-300" />
            <div>
              <div className="font-medium">{chat.name}</div>
              <div className="text-sm text-gray-500 truncate">
                {chat.last}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
