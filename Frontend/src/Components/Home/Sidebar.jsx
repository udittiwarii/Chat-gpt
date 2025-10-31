import React, { useState, useEffect } from "react";
import { SiOpenai } from "react-icons/si";
import { TbLayoutSidebar } from "react-icons/tb";
import { FiMenu, FiX, FiMessageSquare, FiPlus } from "react-icons/fi";

const Sidebar = ({ setActiveChat }) => {
  const [isOpen, setIsOpen] = useState(false); // mobile sidebar toggle
  const [isExpanded, setIsExpanded] = useState(true); // desktop expand toggle
  const [hovered, setHovered] = useState(false);
  const [showHoverIcon, setShowHoverIcon] = useState(false);

  const chats = [
    "New Chat",
    "Project Discussion",
    "AI Interview Help",
    "Code Debugging",
  ];

  // smooth hover delay like ChatGPT
  useEffect(() => {
    let timer;
    if (hovered && !isExpanded) {
      timer = setTimeout(() => setShowHoverIcon(true), 150);
    } else {
      timer = setTimeout(() => setShowHoverIcon(false), 150);
    }
    return () => clearTimeout(timer);
  }, [hovered, isExpanded]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center p-4 bg-[#202123] text-gray-200 border-b border-[#343541]">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <SiOpenai className="text-white text-xl" />
          ChatGPT
        </div>
        <button onClick={toggleSidebar}>
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full transition-all duration-300 
        bg-[#202123] border-r border-[#343541] text-gray-200 
        ${isExpanded ? "md:w-64" : "md:w-16"} 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-50`}
      >
        {/* Header Section */}
        <div className="relative flex items-center justify-center md:justify-between h-16 border-b border-[#343541] px-3">
          <div
            className="relative cursor-pointer flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* OpenAI Icon */}
            <SiOpenai
              className={`text-xl text-white transition-opacity duration-200 ${
                showHoverIcon && !isExpanded ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Hover Icon (only visible when collapsed) */}
            {!isExpanded && (
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                  showHoverIcon ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={toggleExpand}
              >
                <div className="p-2 rounded-full bg-[#343541] hover:bg-[#40414f] border border-gray-700">
                  <TbLayoutSidebar className="text-gray-200 text-xl" />
                </div>
              </div>
            )}
          </div>

          {isExpanded && (
            <button
              className="hidden md:block text-gray-400 hover:text-white"
              onClick={toggleExpand}
            >
              <TbLayoutSidebar className="text-xl" />
            </button>
          )}
        </div>

        {/* Chat History */}
        {isExpanded && (
          <div className="p-4 text-sm uppercase font-semibold text-gray-400 tracking-wide">
            Chat History
          </div>
        )}

        {/* Chat List */}
        {isExpanded && (
          <div className="flex-1 overflow-y-auto pb-8 scrollbar-thin scrollbar-thumb-[#343541] scrollbar-track-[#202123]">
            {chats.map((chat, i) => (
              <div
                key={i}
                onClick={() => {
                  setActiveChat(chat);
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 p-3 mx-2 mb-1 rounded-lg cursor-pointer hover:bg-[#343541] transition-colors duration-200"
              >
                <FiMessageSquare className="text-gray-300" />
                <span>{chat}</span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Button */}
        {isExpanded && (
          <div className="border-t border-[#343541] p-4 flex items-center gap-3 hover:bg-[#343541] cursor-pointer transition-colors">
            <FiPlus />
            <span>New Chat</span>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
