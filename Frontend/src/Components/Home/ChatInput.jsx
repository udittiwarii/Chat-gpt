import { Send } from "lucide-react";
import socket from "../../Utils/socket";
import axios from "axios";
import { useUser } from "../../Context/UserContext";
const ChatInput = ({
  input,
  setInput,
  setMessages,
  disabled,
  activeChat,
  setActiveChat,
  tempMode,
  setChats,
  messages
}) => {
  const { user } = useUser()

  const handleSend = async () => {
    if (!input.trim() || disabled) return;

    // Add user message instantly
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      // 🟡 Temporary Chat Mode → only socket emit
      if (tempMode) {
        socket.emit("Start-temporary", { content: input });
        console.log("Temporary chat message sent:", input);
      }

      // 👤 Guest user (optional mode)
      else if (!user || user.isGuest) {
        console.log("Guest user message sent:", input);
        socket.emit("guest-message", { content: input });
      }

      // 🟢 Normal logged-in user
      else {
        let chatId = activeChat?._id;

        // If chat not yet created in backend (first message)
        if (!chatId || chatId.startsWith("temp")) {
          const res = await axios.post(
            "http://localhost:3000/api/chat",
            { title: "New Chat" },
            { withCredentials: true }
          );

          chatId = res.data.chat._id;

          // Replace temporary chat with backend one
          setActiveChat(res.data.chat);

          // 🟢 Add chat to sidebar list now (first real message)
          setChats((prev) => [res.data.chat, ...prev]);
        }

        // Send message through socket (after chat exists)
        console.log("Sending message to chat ID:", chatId);
        socket.emit("ai-message", { chat: chatId, content: input });
      }
    } catch (err) {
      console.error("❌ Error sending message:", err);
    }

    // Reset input
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      <textarea
        rows={1}
        placeholder={
          disabled
            ? "Select a chat to start messaging..."
            : tempMode
              ? "Temporary Chat — won’t be saved"
              : "Send a message..."
        }
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
