import React, { useEffect } from "react";
import { SiOpenai } from "react-icons/si";
import { FaUser } from "react-icons/fa";

const ChatMessage = ({ message, activeChat, setMessages }) => {
  const isUser = message.role === "user";


  return (
    <div
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"
        } px-4 py-3 transition-all`}
    >
      <div
        className={`flex items-start max-w-[75%] gap-3 ${isUser ? "flex-row-reverse" : ""
          }`}
      >
        {/* Avatar */}
        <div
          className={`${isUser
            ? "bg-[#10a37f] rounded-full"
            : "bg-[#40414f] rounded-sm"
            } w-8 h-8 flex items-center justify-center shrink-0`}
        >
          {isUser ? (
            <FaUser className="text-[#ececf1] text-sm" />
          ) : (
            <SiOpenai className="text-[#10a37f]" />
          )}
        </div>

        {/* Message bubble */}
        <div
          className={`px-4 py-2 rounded-xl text-sm md:text-base whitespace-pre-wrap leading-relaxed ${isUser
            ? "bg-[#10a37f] text-white rounded-br-none"
            : "bg-[#444654] text-[#ececf1] rounded-bl-none"
            }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
