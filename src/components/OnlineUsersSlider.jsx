import { useEffect, useMemo } from "react";
import { useAuthStore } from "../store/useAuthStore";

const OnlineUsersSlider = () => {
  const {
    onlineUsers,   // ["SL22333", "SL22444"]
    allUsers,      // full user objects
    fetchAllUsers,
    authUser,
  } = useAuthStore();

  // fetch all users once
  useEffect(() => {
    if (allUsers.length === 0) {
      fetchAllUsers();
    }
  }, [allUsers.length, fetchAllUsers]);

  // merge socket + DB
const onlineUserDetails = useMemo(() => {
  if (
    !Array.isArray(onlineUsers) ||
    !Array.isArray(allUsers) ||
    !authUser
  ) {
    return [];
  }

  return allUsers.filter(user =>
    onlineUsers.includes(user.user_id) &&
    user.user_id !== authUser.user_id
  );
}, [onlineUsers, allUsers, authUser?.user_id]);


  if (onlineUserDetails.length === 0) {
    return <div className="text-sm text-gray-400">No users online</div>;
  }

  return (
    <div className="flex gap-4 overflow-x-auto py-2">
      {onlineUserDetails.map(user => (
        <div
          key={user.user_id}
          className="flex flex-col items-center min-w-[70px]"
        >
          <img
            src={user.profile}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover border"
          />
          <span className="text-xs mt-1 text-center truncate w-16">
            {user.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default OnlineUsersSlider;
