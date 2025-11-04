import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Menu } from "lucide-react";
import socket from "../../Utils/socket";

const ChatScreen = ({ activeChat, messages, setMessages, input, setInput }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleAIresponse = (data) => {
      if (!activeChat?._id) return;
      if (data.chat === activeChat._id) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content },
        ]);
      }
      if (process.env.NODE_ENV === "development") {
        console.log("AI response received:", data);
      }
    };

    socket.on("ai-response", handleAIresponse);
    return () => socket.off("ai-response", handleAIresponse);
  }, [activeChat, setMessages]);

  return (
    <div className="flex flex-col w-full h-full bg-[#1E1F23] text-[#ECECF1]">
      {/* ✅ Navbar */}
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
          {/* 👇 Shift title right only on mobile */}
          <h1 className="font-semibold text-lg md:text-xl ml-10 sm:ml-0">
            ChatGPT
          </h1>
        </div>
        <div className="hidden sm:flex gap-6 text-sm pr-4">
          <button className="font-semibold text-lg md:text-xl">Share</button>
        </div>
      </nav>

      {/* ✅ Chat messages area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3A3B3F] pt-14 sm:pt-0">
        {!activeChat ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl font-semibold mb-4 text-[#ECECF1]">ChatGPT</h1>
            <p className="text-[#9C9CA3] text-lg max-w-md">
              Start a new chat to begin your conversation with AI
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-2xl font-semibold mb-2 text-[#ECECF1]">
              {activeChat.title}
            </h2>
            <p className="text-[#9C9CA3]">
              Send a message to start the conversation
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto w-full py-4 px-2 sm:px-4">
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} activeChat={activeChat} setMessages={setMessages} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* ✅ Input Area */}
      <div className="border-t border-[#3A3B3F] bg-[#2C2D31] sm:bg-transparent">
        <div className="max-w-3xl mx-auto w-full px-4 py-4">
          <ChatInput
            input={input}
            setInput={setInput}
            setMessages={setMessages}
            disabled={!activeChat}
            activeChat={activeChat}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
