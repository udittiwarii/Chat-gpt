import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import SidebarHeader from "./SidebarComponents/SidebarHeader";
import NewChatButton from "./SidebarComponents/NewChatButton";
import SectionTabs from "./SidebarComponents/SectionTabs";
import ChatList from "./SidebarComponents/ChatList";

const Sidebar = ({ setActiveChat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [showHoverIcon, setShowHoverIcon] = useState(false);
  const [activeSection, setActiveSection] = useState("chats");

  const [chats, setChats] = useState([
    { id: 1, title: "Understanding React Hooks", isArchived: false },
    { id: 2, title: "API Integration Best Practices", isArchived: false },
    { id: 3, title: "CSS Grid Layout Tutorial", isArchived: true },
  ]);

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

  const createNewChat = () => {
    if (!isExpanded) setIsExpanded(true); // expand first if collapsed
    const newChat = { id: Date.now(), title: "New Chat", isArchived: false };
    setChats([newChat, ...chats]);
    setActiveChat(newChat);
  };

  const archiveChat = (chatId) => {
    setChats(chats.map(chat => chat.id === chatId ? { ...chat, isArchived: true } : chat));
  };

  const deleteChat = (chatId) => {
    setChats(chats.filter(chat => chat.id !== chatId));
  };


  const filteredChats = chats.filter(chat =>
    activeSection === "chats" ? !chat.isArchived : chat.isArchived
  );

  const renameChat = (chatId, newTitle) => {
    setChats(chats.map(chat =>
      chat.id === chatId ? { ...chat, title: newTitle } : chat
    ));
  };

  return (
    <>
      {/* 🟢 Mobile Floating Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-2 left-4 z-50 p-2 rounded-md  hover:bg-[#2a2b32] transition-colors"
      >
        {isOpen ? <FiX className="text-white w-5 h-5" /> : <FiMenu className="text-white w-5 h-5" />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed md:static top-0 left-0 h-full transition-all duration-300 
          bg-[#202123] border-r border-[#343541] text-gray-200 
          ${isExpanded ? "md:w-64" : "md:w-16"} 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-40`}
        onClick={() => {
          if (!isExpanded && window.innerWidth >= 768) setIsExpanded(true);
        }}
      >
        <SidebarHeader
          isExpanded={isExpanded}
          hovered={hovered}
          showHoverIcon={showHoverIcon}
          setHovered={setHovered}
          toggleExpand={toggleExpand}
        />

        <NewChatButton createNewChat={createNewChat} isExpanded={isExpanded} />

        {isExpanded && (
          <SectionTabs activeSection={activeSection} setActiveSection={setActiveSection} />
        )}

        <ChatList
          chats={filteredChats}
          isExpanded={isExpanded}
          activeSection={activeSection}
          setActiveChat={setActiveChat}
          archiveChat={archiveChat}
          deleteChat={deleteChat}
          renameChat={renameChat}
          setIsOpen={setIsOpen}
        />
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30" onClick={toggleSidebar} />
      )}
    </>
  );
};

export default Sidebar;
