import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import socket from "../../Utils/socket";
import axios from "axios";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const ChatScreen = ({ activeChat, setActiveChat, messages, setMessages, input, setInput, tempMode, setTempMode, setChats }) => {
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [aiLoading, setAiLoading] = useState(false);


  const { user } = useUser();
  // Auto-scroll to bottom when new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🔹 Handle AI responses coming through socket
  useEffect(() => {
    const handleAIresponse = (data) => {
      if (data.chat === activeChat?._id) {
        setAiLoading(false);
        return setMessages((prev) => {
          const newArr = prev.filter(m => !m.loading);
          return [...newArr, { role: "assistant", content: data.content }];
        });
      } else if (tempMode === true) {
        setAiLoading(false);
        return setMessages((prev) => {
          const newArr = prev.filter(m => !m.loading);
          return [...newArr, { role: "assistant", content: data.content }];
        });
      } else if (!user || user.isGuest) {
        setAiLoading(false);
        return setMessages((prev) => {
          const newArr = prev.filter(m => !m.loading);
          return [...newArr, { role: "assistant", content: data.content }];
        });
      }
    };

    socket.on("ai-response", handleAIresponse);

    return () => {
      socket.off("ai-response", handleAIresponse);
    };
  }, [activeChat?._id, tempMode, setMessages]);

  socket.on("chat-title-updated", ({ chatId, title }) => {
    console.log("Chat title updated:", title);
    // optional UI update for title if you display it
  });


  // 🔹 Fetch chat messages when chat change

  useEffect(() => {
    if (!activeChat?._id) return;

    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/chat/message/${activeChat._id}`, {
          withCredentials: true,
        });
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchChatMessages();
  }, [activeChat?._id, tempMode]);

  return (
    <div className="flex flex-col w-full h-screen bg-[#1E1F23] text-[#ECECF1]">

      {/* ---------------------- */}
      {/*   ✅ GUEST MODE FIRST   */}
      {/* ---------------------- */}
      {!user ? (
        <>
          <nav
            className="
    w-full flex items-center justify-between
    px-4 py-3
    border-b border-[#3A3B3F]
    bg-[#2C2D31]
    fixed top-0 left-0 right-0 z-20

    sm:px-5 sm:py-3 sm:bg-transparent sm:border-none sm:static
  "
          >
            {/* LEFT — LOGO */}
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-lg sm:text-xl">
                ChatGPT
              </h1>
            </div>

            {/* RIGHT — LOGIN BUTTON */}
            <div className="flex">
              <button
                onClick={() => navigate("/login")}
                className="
        bg-gray-600 text-white 
        px-4 py-2 
        rounded-lg 
        text-sm 
        font-medium

        sm:px-6 sm:py-3 sm:text-lg sm:rounded-xl
        hover:bg-gray-700
        hover:shadow-md
        transition-all duration-200
      "
              >
                Login
              </button>
            </div>
          </nav>
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3A3B3F] pt-14 sm:pt-0">
            {messages?.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-semibold mb-2 text-[#ECECF1]">
                  Start to messsge With Chatgpt
                </h2>
                <p className="text-[#9C9CA3] mb-6">
                  This is only a guest chat. You can send only 3-4 messages. Otherwise, please login.
                </p>
                <div className="w-full max-w-2xl transition-opacity duration-500">
                  <ChatInput
                    input={input}
                    setInput={setInput}
                    setMessages={setMessages}
                    disabled={false}
                    activeChat={activeChat}
                    tempMode={false}
                    setActiveChat={setActiveChat}
                    setChats={setChats}
                    setAiLoading={setAiLoading}
                  />
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto w-full py-4 px-2 sm:px-4 transition-opacity duration-500">
                {messages?.map((msg, i) => (
                  <ChatMessage
                    key={i}
                    message={msg}
                    activeChat={activeChat}
                    setMessages={setMessages}
                    aiLoading={aiLoading}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          {/* ----------------------------- */}
          {/*     🟢 INPUT BOX NORMAL       */}
          {/* ----------------------------- */}
          {messages?.length > 0 && (
            <div className=" border-[#3A3B3F] bg-[#2C2D31] sm:bg-transparent">
              <div className="max-w-5xl rounded-3xl mx-auto w-full px-9">
                <ChatInput
                  input={input}
                  setInput={setInput}
                  setMessages={setMessages}
                  disabled={false}
                  activeChat={activeChat}
                  tempMode={false}
                  setActiveChat={setActiveChat}
                  setChats={setChats}
                  messages={messages}
                  setAiLoading={setAiLoading}
                />
              </div>
            </div>
          )}

        </>

      ) : (
        <>
          {/* ---------------------- */}
          {/*   🟢 NAVBAR (NORMAL)   */}
          {/* ---------------------- */}
          <nav
            className="
            w-full flex items-center justify-between 
            px-5 py-3 
            border-b border-[#3A3B3F]
            sm:border-none sm:bg-transparent
            bg-[#2C2D31] sm:bg-transparent
            fixed sm:static top-0 left-0 right-0 z-20
          "
          >
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-lg md:text-xl ml-10 sm:ml-0">
                ChatGPT
              </h1>
            </div>

            <div className="hidden sm:flex gap-6 text-sm pr-4">
              {messages?.length === 0 ? (
                <span className="text-[#9C9CA3]"
                  onClick={() => {
                    setTempMode(true);
                  }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-gray-300 "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
                  </svg>
                </span>
              ) : (
                <button className="font-semibold text-lg md:text-xl">Share</button>
              )}
            </div>
          </nav>

          {/* ----------------------------- */}
          {/*     🟢 CHAT AREA NORMAL       */}
          {/* ----------------------------- */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3A3B3F] pt-14 sm:pt-0">
            {!activeChat ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-semibold mb-4 text-[#ECECF1]">ChatGPT</h1>
                <p className="text-[#9C9CA3] text-lg max-w-md">
                  Start a new chat to begin your conversation with AI
                </p>
              </div>
            ) : messages?.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-semibold mb-2 text-[#ECECF1]">
                  {activeChat.title}
                </h2>
                <p className="text-[#9C9CA3] mb-6">
                  Send a message to start the conversation
                </p>

                <div className="w-full max-w-2xl transition-opacity duration-500">
                  <ChatInput
                    input={input}
                    setInput={setInput}
                    setMessages={setMessages}
                    disabled={!activeChat}
                    activeChat={activeChat}
                    tempMode={tempMode}
                    setActiveChat={setActiveChat}
                    setChats={setChats}
                    setAiLoading={setAiLoading}
                  />
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto w-full py-4 px-2 sm:px-4 transition-opacity duration-500">
                {messages?.map((msg, i) => (
                  <ChatMessage
                    key={i}
                    message={msg}
                    activeChat={activeChat}
                    setMessages={setMessages}
                    aiLoading={aiLoading}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* ----------------------------- */}
          {/*     🟢 INPUT BOX NORMAL       */}
          {/* ----------------------------- */}
          {messages?.length > 0 && (
            <div className="border-[#3A3B3F] bg-[#2C2D31] sm:bg-transparent">
              <div className="max-w-3xl mx-auto w-full px-4 py-4">
                <ChatInput
                  input={input}
                  setInput={setInput}
                  setMessages={setMessages}
                  disabled={!activeChat}
                  activeChat={activeChat}
                  tempMode={tempMode}
                  setActiveChat={setActiveChat}
                  setChats={setChats}
                  messages={messages}
                  setAiLoading={setAiLoading}
                />
              </div>
            </div>
          )}
        </>
      )
      }

    </div >
  );
};

export default ChatScreen;