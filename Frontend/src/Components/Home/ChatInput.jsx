import { Send } from "lucide-react";
import socket from "../../Utils/socket";

const ChatInput = ({ input, setInput, setMessages, disabled, activeChat }) => {
  const handleSend = () => {
    if (!input.trim() || disabled) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);



    socket.emit('ai-message', {
      chat: activeChat._id,
      content: input
    })

    setInput("");
    // Simulate AI response (replace with actual API call)
    // setTimeout(() => {
    // setMessages((prev) => [
    // ...prev,
    // {
    // role: "assistant",
    // content: "This is a simulated AI response. Replace with actual API integration."
    // }
    // ]);
    // }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      <textarea
        rows={1}
        placeholder={disabled ? "Select a chat to start messaging..." : "Send a message..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="w-full bg-[#40414f] text-[#ececf1] rounded-xl pl-4 pr-12 py-3 resize-none
          border border-[#565869] shadow-sm
          focus:outline-none focus:border-[#10a37f] focus:ring-1 focus:ring-[#10a37f] 
          hover:bg-[#4a4b5c] disabled:opacity-50 transition-colors duration-200
          placeholder:text-[#8e8ea0] scrollbar-thin scrollbar-thumb-gray-700"
        style={{ minHeight: "48px", maxHeight: "200px" }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="absolute right-2 bottom-3 p-1.5 rounded-lg
          text-[#8e8ea0] hover:text-[#ececf1] disabled:opacity-50
          hover:bg-[#4a4b5c] transition-colors duration-200"
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default ChatInput;