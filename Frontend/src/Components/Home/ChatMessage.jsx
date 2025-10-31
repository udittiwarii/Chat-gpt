import React from "react";

const ChatMessage = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}>
      <div
        className={`max-w-[80%] px-4 py-2 rounded-2xl ${
          isUser
            ? "bg-emerald-600 text-white rounded-br-none"
            : "bg-[#444654] text-gray-100 rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
