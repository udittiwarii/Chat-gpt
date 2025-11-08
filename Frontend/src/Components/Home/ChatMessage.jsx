import React, { useEffect } from "react";
import { SiOpenai } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const ChatMessage = ({ message }) => {
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

        {/* Message bubble */}
        <div
          className={`px-4 py-2 rounded-xl text-sm md:text-base whitespace-pre-wrap leading-relaxed ${isUser
            && "bg-[#444654] text-[#ececf1] rounded-bl-none"
            }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
