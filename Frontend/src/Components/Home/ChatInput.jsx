import { Send } from "lucide-react";

const ChatInput = ({ input, setInput, setChats }) => {
  const handleSend = () => {
    if (!input.trim()) return;
    setChats((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    // TODO: Add AI response later here
  };

  return (
    <div className="p-4 border-t border-gray-700 flex items-center gap-2 bg-[#40414f]">
      <input
        type="text"
        placeholder="Send a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-[#40414f] text-gray-100 px-4 py-2 rounded-xl outline-none"
      />
      <button
        onClick={handleSend}
        className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl transition-colors"
      >
        <Send size={18} />
      </button>
    </div>
  );
};

export default ChatInput;