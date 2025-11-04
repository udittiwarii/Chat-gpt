import React, { useState, useEffect, useRef } from "react";
import {  FiMoreHorizontal } from "react-icons/fi";

const ChatItem = ({
  chat,
  isExpanded,
  setActiveChat,
  archiveChat,
  deleteChat,
  renameChat,
  setIsOpen,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRename = () => {
    const newTitle = prompt("Rename chat:", chat.title);
    if (newTitle && newTitle.trim() !== "") renameChat(chat.id, newTitle.trim());
    setMenuOpen(false);
  };

  return (
    <div
      className={`group relative flex items-center justify-between p-3 rounded-lg cursor-pointer 
        hover:bg-[#2a2b32] transition-colors duration-200 ${
          !isExpanded ? "justify-center" : ""
        }`}
      onClick={() => {
        setActiveChat(chat);
        setIsOpen(false);
      }}
    >
      {/* 🧠 Chat Icon + Title */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {isExpanded && <span className="truncate text-[#ececf1]">{chat.title}</span>}
      </div>

      {/* ... Menu Button */}
      {isExpanded && (
        <div className="relative flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[#343541] transition-colors duration-200"
          >
            <FiMoreHorizontal className="text-[#8e8ea0] hover:text-[#acacbe]" />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div
              ref={menuRef}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-8 bg-[#2a2b32] border border-[#3a3b41] rounded-md shadow-lg z-20 w-40 py-1"
            >
              <button
                onClick={handleRename}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-[#343541] text-[#ececf1]"
              >
                Rename
              </button>
              <button
                onClick={() => {
                  archiveChat(chat.id);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-[#343541] text-[#ececf1]"
              >
                {chat.isArchived ? "Unarchive" : "Archive"}
              </button>
              <button
                onClick={() => {
                  deleteChat(chat.id);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-[#343541] text-red-400"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatItem;
