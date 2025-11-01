import React from "react";
import { PiNotePencilLight } from "react-icons/pi";

const NewChatButton = ({ createNewChat, isExpanded }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      createNewChat();
    }}
    className={`w-full mt-3 px-3 py-3 flex items-center ${
      isExpanded ? "gap-3 justify-start" : "justify-center"
    } rounded-lg transition-colors duration-200 hover:bg-[#2a2b32] border-[#565869] text-[#ececf1]`}
  >
    <PiNotePencilLight className="text-lg" />
    {isExpanded && <span>New chat</span>}
  </button>
);

export default NewChatButton;
