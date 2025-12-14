import { useEffect, useState, useMemo } from "react";
import { X } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { Search } from "lucide-react";


function SearchModal({
    value,
    onChange,
    placeholder = "Search by Name...",
    className = "",
}) {
    return (
        <div
            className={`mt-5 mb-1 flex items-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-3 py-[7px] focus-within:border-[#998eff] ${className}`}
        >
            <Search size={18} className="text-gray-500" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
        </div>
    );
}


export default function NewChatModal({ open, onClose, title }) {
    const {
        allUsers,
        isFetchingAllUsers,
        fetchAllUsers,
    } = useAuthStore();
    const [search, setSearch] = useState("");
    const filteredUsers = useMemo(() => {
        const q = search.toLowerCase().trim();
        if (!q) return Array.isArray(allUsers) ? allUsers : [];

        return allUsers.filter((user) =>
            user.name.toLowerCase().includes(q) ||
            user.email.toLowerCase().includes(q)
        );
    }, [search, allUsers]);


    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => (document.body.style.overflow = "");
    }, [open]);

    useEffect(() => {
        if (open && Array.isArray(allUsers) && allUsers.length === 0) {
            fetchAllUsers();
        }
    }, [open]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center
        ${open ? "pointer-events-auto" : "pointer-events-none"}
      `}
        >
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`
    absolute inset-0 bg-black/40
    transition-all duration-200
    ${open ? "backdrop-blur-sm opacity-100" : "backdrop-blur-0 opacity-0"}
  `}
            />

            {/* Modal */}
            <div
                className={`
          relative z-10 w-full max-w-md h-[70vh]
          rounded-xl bg-white p-4 shadow-xl
          transform transition-all duration-200 ease-out
          ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          flex flex-col min-h-0
        `}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-2 mt-1">
                    <h2 className="text-lg font-medium text-[#0c16a7]">Start new chat</h2>
                    <button className="cursor-pointer" onClick={onClose}>
                        <X size={20} className="text-gray-500 hover:text-gray-700" />
                    </button>
                </div>

                <p className="text-xs text-gray-500">
                    Select a contact to get started
                </p>

                <SearchModal
                    value={search}
                    onChange={setSearch}
                />

                {/* Users List */}
                <div className="mt-3 flex-1 overflow-y-auto pr-1">
                    {isFetchingAllUsers && (
                        <p className="text-sm text-gray-400 text-center mt-6">
                            Loading contacts…
                        </p>
                    )}

                    {!isFetchingAllUsers && filteredUsers.length === 0 && (
                        <p className="text-sm text-gray-400 text-center mt-6">
                            No users found
                        </p>
                    )}

                    

                    {!isFetchingAllUsers &&
                        Array.isArray(filteredUsers) &&
filteredUsers.map((user) => (
                            <div
                                key={user.user_id}
                                className="flex items-center gap-3 p-3 rounded-lg
                  hover:bg-[#e6ecff] cursor-pointer transition"
                            >
                                <img
                                    src={user.profile}
                                    alt={user.name}
                                    className="h-10 w-10 rounded-full object-cover"
                                />

                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">
                                        {user.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
