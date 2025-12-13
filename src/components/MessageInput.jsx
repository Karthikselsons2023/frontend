export default function MessageInput() {
  return (
    <div className="p-3 bg-white border-t flex gap-2">
      <input
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Type a message"
      />
      <button className="bg-green-500 text-white px-4 rounded-full">
        Send
      </button>
    </div>
  );
}
