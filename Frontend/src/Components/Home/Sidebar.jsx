import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import SidebarHeader from "./SidebarComponents/SidebarHeader";
import NewChatButton from "./SidebarComponents/NewChatButton";
import SectionTabs from "./SidebarComponents/SectionTabs";
import ChatList from "./SidebarComponents/ChatList";
import axios from "axios";
import socket from "../../Utils/socket";
import serverApi from "../../Utils/serverapi";

const Sidebar = ({ setActiveChat, activeChat, tempMode, chats, setChats, setTempMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true)
  const [hovered, setHovered] = useState(false);
  const [showHoverIcon, setShowHoverIcon] = useState(false);
  const [activeSection, setActiveSection] = useState("chats");


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
    const tempChat = {
      _id: `temp-${Date.now()}`,
      title: "New Chat",
      messages: [],
      isArchived: false,
      isTemp: true,
    };

    // Don’t add to sidebar yet — only open it
    setActiveChat(tempChat);
    setTempMode(false)
  };

  useEffect(() => {
    socket.on("chat-title-updated", ({ chatId, title }) => {
      console.log("🔄 Chat title updated:", chatId, title);

      // Typing effect
      let i = 0;
      let displayed = "";

      const interval = setInterval(() => {
        displayed += title[i];
        i++;

        // Update the chat title progressively
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat._id === chatId ? { ...chat, title: displayed } : chat
          )
        );

        if (i >= title.length) clearInterval(interval);
      }, 70); // speed of typing (ms per character)
    });

    // Cleanup to prevent memory leaks
    return () => socket.off("chat-title-updated");
  }, [socket, setChats]);


  useEffect(() => {
    const fetchChats = async () => {
      try {

        // 🟢 Fetch from backend for logged-in users 
        const res = await serverApi.get("http://localhost:3000/api/chat", {
          withCredentials: true,
        });
        setChats(res.data.chats.reverse() || []);
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };

    fetchChats();
  }, [tempMode, setChats]);


  const archiveChat = (chatId) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat._id === chatId ? { ...chat, isArchived: true } : chat
      )
    );

    if (tempMode) {
      const updated = chats.map((chat) =>
        chat._id === chatId ? { ...chat, isArchived: true } : chat
      );
      localStorage.setItem("tempChats", JSON.stringify(updated));
    }
  };

  const deleteChat = async (chatId) => {
    await serverApi.delete(`/chat/${chatId}`);
    setChats((prev) => prev.filter((chat) => chat._id !== chatId));
    if (tempMode) {
      localStorage.setItem("tempChats", JSON.stringify(updated));
    }
  };


  const filteredChats = chats.filter(chat => !chat.isTemp && !chat.isArchived);


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
          activeChat={activeChat}
        />
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30" onClick={toggleSidebar} />
      )}
    </>
  );
};

export default Sidebar;