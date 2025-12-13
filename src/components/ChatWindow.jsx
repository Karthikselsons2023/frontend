import MessageInput from "./MessageInput";

export default function ChatWindow({ chat, onBack }) {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white border-b">
        <button
          onClick={onBack}
          className="md:hidden text-xl"
        >
          ←
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div className="font-medium">{chat.name}</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="max-w-xs bg-white p-2 rounded-lg shadow">
          Hey brother, are you into UI?
        </div>

        <div className="max-w-xs bg-green-500 text-white p-2 rounded-lg ml-auto">
          Yeah, show me
        </div>

        <div className="max-w-xs bg-white p-2 rounded-lg shadow">
          Checkout this project
        </div>
      </div>

      <MessageInput />
    </div>
  );
}
