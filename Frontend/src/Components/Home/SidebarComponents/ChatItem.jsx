import React, { useState, useEffect, useRef } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

const ChatItem = ({
  chat,
  isExpanded,
  setActiveChat,
  archiveChat,
  deleteChat,
  renameChat,
  setIsOpen,
  isActive,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(chat.title);
  const inputRef = useRef(null);

  // Auto focus when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Inline rename submit function
  const handleRenameSubmit = () => {
    if (newTitle.trim() !== "" && newTitle !== chat.title) {
      renameChat(chat._id, newTitle.trim());
      console.log("ChatItem Rendered", chat.title);

    }
    setIsEditing(false);
  };

  const handleRename = () => {
    setMenuOpen(false);
    setIsEditing(true);
  };

  return (
    <div
      className={`group relative flex items-center justify-between p-3 rounded-lg cursor-pointer 
        transition-colors duration-200
        ${isActive ? "bg-[#343541]" : "hover:bg-[#2a2b32]"}
        ${!isExpanded ? "justify-center" : ""}
      `}
      onClick={(e) => {
        if (isEditing) {
          e.stopPropagation(); // STOP parent click
          return;
        }
        setActiveChat(chat);
        setIsOpen(false);
      }}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3 flex-1 min-w-0">

        {isExpanded && (
          <>
            {!isEditing ? (
              <span
                className={`truncate text-[#ececf1] ${isActive ? "font-semibold text-white" : ""
                  }`}
              >
                {chat.title}
              </span>
            ) : (
              <input
                ref={inputRef}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onClick={(e) => e.stopPropagation()} // ⬅️ IMPORTANT FIX
                onBlur={handleRenameSubmit}
                onKeyDown={(e) => {
                  e.stopPropagation(); // ⬅️ Prevent parent click
                  if (e.key === "Enter") handleRenameSubmit();
                }}
                className="w-full bg-transparent border border-[#52525f] px-2 py-1 rounded text-[#ececf1] outline-none"
              />

            )}
          </>
        )}
      </div>

      {/* RIGHT MENU BUTTON */}
      {isExpanded && !isEditing && (
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

          {/* DROPDOWN */}
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
                  archiveChat(chat._id);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-[#343541] text-[#ececf1]"
              >
                {chat.isArchived ? "Unarchive" : "Archive"}
              </button>

              <button
                onClick={() => {
                  deleteChat(chat._id);
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
