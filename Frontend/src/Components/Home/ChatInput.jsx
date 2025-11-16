import { Send } from "lucide-react";
import socket from "../../Utils/socket";
import axios from "axios";
import { useUser } from "../../Context/UserContext";
import { MdArrowUpward } from "react-icons/md";
import { IoMicOutline } from "react-icons/io5";
import { UseSpeechToText } from "./useSpeechToText ";

const ChatInput = ({
  input,
  setInput,
  setMessages,
  disabled,
  activeChat,
  setActiveChat,
  tempMode,
  setChats,
  setAiLoading
}) => {
  const { user } = useUser()


  const handleSend = async () => {
    if (!input.trim() || disabled) return;

    // Add user message instantly
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setMessages(prev => [...prev, { role: "assistant", content: "", loading: true }]);
    setAiLoading(true);
    try {
      // 🟡 Temporary Chat Mode → only socket emit
      if (tempMode == true) {
        socket.emit("Start-temporary", { content: input });
        console.log("Temporary chat message sent:", input);
        setInput("");
        return
      }

      // 👤 Guest user (optional mode)
      else if (!user) {
        console.log("Guest user message sent:", input);
        socket.emit("ai-message", { content: input });
        setInput("");
        return
      }

      // 🟢 Normal logged-in user
      else {
        let chatId = activeChat?._id;

        // If chat not yet created in backend (first message)
        if (!chatId || chatId.startsWith("temp")) {
          const res = await axios.post(
            "https://chatgpt-qpm4.onrender.com/api/chat",
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
        setInput("");
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

  const { startListening } = UseSpeechToText((voiceText) => {
    setInput(prev => prev + (prev ? " " : "") + voiceText);
  });


  return (

    <div className="relative">
      {!user ? (
        // ---------------- Guest Mode UI -----------------
        <div className="relative flex items-center ">
          <textarea
            rows={1}
            placeholder="ask anything"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className="w-full bg-[#40414f] text-[#ececf1] rounded-full pl-6 pr-28 py-5 resize-none
            border border-[#565869] shadow-sm
            focus:outline-none focus:border-[#10a37f] focus:ring-1 focus:ring-[#10a37f]
            hover:bg-[#4a4b5c] disabled:opacity-50 transition-colors duration-200
            placeholder:text-[#8e8ea0] scrollbar-thin scrollbar-thumb-gray-700"
            style={{ minHeight: "48px", maxHeight: "200px" }}
          />
          <button
            onClick={startListening}
            className="absolute right-14 bottom-3 w-10 h-10 rounded-full bg-[#3a3a3a]
    flex items-center justify-center hover:bg-[#4a4a4a] transition"
          >
            <IoMicOutline size={20} className="text-white" />
          </button>
          {/* SEND BUTTON — ALWAYS */}
          <button
            onClick={handleSend}
            disabled={disabled}
            className="absolute right-2 bottom-3 w-10 h-10 rounded-full bg-white
    flex items-center justify-center hover:bg-gray-200 transition disabled:opacity-40"
          >
            <MdArrowUpward size={22} className="text-black" />
          </button>
        </div>
      ) : (
        // ---------------- Logged-in User UI -------------
        <div className="relative flex items-center ">

          {/* TEXTAREA */}
          <textarea
            rows={1}
            placeholder={
              !user
                ? "Ask anything..."
                : disabled
                  ? "Select a chat to start messaging..."
                  : tempMode
                    ? "Temporary Chat — won’t be saved"
                    : "Send a message..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className="w-full bg-[#40414f] text-[#ececf1] rounded-full pl-6 pr-28 py-5 resize-none
      border border-[#565869] shadow-sm
      focus:outline-none focus:border-[#10a37f] focus:ring-1 focus:ring-[#10a37f]
      hover:bg-[#4a4b5c] disabled:opacity-50 transition-colors duration-200
      placeholder:text-[#8e8ea0] scrollbar-thin scrollbar-thumb-gray-700"
            style={{ minHeight: "48px", maxHeight: "200px" }}
          />

          {/* MIC BUTTON — ALWAYS */}
          <button
            onClick={startListening}
            className="absolute right-14 bottom-3 w-10 h-10 rounded-full bg-[#3a3a3a]
      flex items-center justify-center hover:bg-[#4a4a4a] transition"
          >
            <IoMicOutline size={20} className="text-white" />
          </button>

          {/* SEND BUTTON — ALWAYS */}
          <button
            onClick={handleSend}
            disabled={disabled}
            className="absolute right-2 bottom-3 w-10 h-10 rounded-full bg-white
      flex items-center justify-center hover:bg-gray-200 transition disabled:opacity-40"
          >
            <MdArrowUpward size={22} className="text-black" />
          </button>

        </div>
      )
      }
    </div >
  );

};

export default ChatInput;
