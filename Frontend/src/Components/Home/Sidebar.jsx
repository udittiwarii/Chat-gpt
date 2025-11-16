import { useState, useEffect, useMemo } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import SidebarHeader from "./SidebarComponents/SidebarHeader";
import NewChatButton from "./SidebarComponents/NewChatButton";
import SectionTabs from "./SidebarComponents/SectionTabs";
import ChatList from "./SidebarComponents/ChatList";
import axios from "axios";
import socket from "../../Utils/socket";
import serverApi from "../../Utils/serverapi";
import SidebarFooter from "./SidebarComponents/Sidebarfotter";
import { useUser } from "../../Context/UserContext"
import { useNavigate } from "react-router-dom";
const Sidebar = ({ setActiveChat, activeChat, tempMode, chats, setChats, setTempMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true)
  const [hovered, setHovered] = useState(false);
  const [showHoverIcon, setShowHoverIcon] = useState(false);
  const [activeSection, setActiveSection] = useState("chats");
  const { user } = useUser();
  const isGuest = !user; // if no user → guest mode
  const navigate = useNavigate();
  const [fetchloader, setfetchloader] = useState(true)

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


  const renameChat = async (chatId, newTitle) => {
    await axios.put(`https://chatgpt-qpm4.onrender.com/api/chat/title/${chatId}`, {
      title: newTitle
    }, {
      withCredentials: true
    })
    setChats(chats.map(chat =>
      chat.id === chatId ? { ...chat, title: newTitle } : chat
    ));
  };

  const archiveChat = async (chatId) => {
    const res = await axios.put(`https://chatgpt-qpm4.onrender.com/api/chat/archive/${chatId}`, {
      withCredentials: true
    })
    console.log(res)
  };


  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get("https://chatgpt-qpm4.onrender.com/api/chat", { withCredentials: true });
        // Sort descending by lastactivity (most recent first)
        const sortedChats = res.data.chats?.sort((a, b) => new Date(b.userlastactivity) - new Date(a.userlastactivity));
        setChats(sortedChats || []);
      } catch (err) {
        console.error("Error fetching chats:", err);
      } finally {
        setfetchloader(false);
      }
    };
    fetchChats();
  }, [tempMode, setChats, activeSection]);

  const displayedChats = useMemo(() => {
    return chats.filter(chat => {
      if (activeSection === "chats") return !chat.isArchived;
      if (activeSection === "archive") return chat.isArchived;
      return false;
    });
  }, [chats, activeSection]);

  const deleteChat = async (chatId) => {
    await axios.delete(`https://chatgpt-qpm4.onrender.com/api/chat/${chatId}`, {
      withCredentials: true,
    }).catch((err) => {
      console.error("❌ Error deleting chat:", err);
    });
    setChats((prev) => prev.filter((chat) => chat._id !== chatId));
  };

  return (
    <>
      {/* If Guest → show only login button, NO SIDEBAR */}
      {isGuest ? (
        <div className="hidden md:flex md:w-64 h-full flex-col">

          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm px-4 text-center">
            Start chatting as guest.
            <br />
            Login to save your chats.
          </div>

          <div className="w-full px-6 pb-6">
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-gray-600 text-white py-3 rounded-xl font-medium text-lg shadow-md hover:bg-gray-700"
            >
              Login / Sign Up
            </button>
          </div>

        </div>

      ) : (
        <>
          {/* Mobile Hamburger */}
          <button
            onClick={toggleSidebar}
            className="md:hidden fixed top-2 left-4 z-50 p-2 rounded-md hover:bg-[#2a2b32] transition-colors"
          >
            {isOpen ? (
              <FiX className="text-white w-5 h-5" />
            ) : (
              <FiMenu className="text-white w-5 h-5" />
            )}
          </button>

          {/* SIDEBAR */}
          <div
            className={`overflow-hidden fixed md:static top-0 left-0 h-screen transition-all duration-300 
                        bg-[#202123] border-r border-[#343541] text-gray-200 
          ${isExpanded ? "md:w-64" : "md:w-16"} 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 z-40`}
            onClick={() => {
              if (!isExpanded && window.innerWidth >= 768) setIsExpanded(true);
            }}
          >
            {/* Header */}
            <SidebarHeader
              isExpanded={isExpanded}
              hovered={hovered}
              showHoverIcon={showHoverIcon}
              setHovered={setHovered}
              toggleExpand={toggleExpand}
            />

            {/* New Chat */}
            <NewChatButton createNewChat={createNewChat} isExpanded={isExpanded} />

            {/* Main Body */}
            <div className="flex flex-col h-full">
              {/* Tabs */}
              {isExpanded && (
                <SectionTabs
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
              )}

              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 
      hover:scrollbar-thumb-gray-600 scrollbar-track-transparent scroll-smooth px-2 pb-4" >
                {/* Chat List */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 hover:scrollbar-thumb-gray-600 scrollbar-track-transparent scroll-smooth px-2 pb-4"
                  style={{
                    maxHeight: "calc(80vh - 120px)", // keep scroll area fixed inside viewport
                  }}
                >
                  {fetchloader ? (
                    <div className="w-full h-full flex items-center justify-center mt-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
                    </div>
                  ) :

                    <ChatList
                      chats={displayedChats}
                      isExpanded={isExpanded}
                      activeSection={activeSection}
                      setActiveChat={setActiveChat}
                      archiveChat={archiveChat}
                      deleteChat={deleteChat}
                      renameChat={renameChat}
                      setIsOpen={setIsOpen}
                      activeChat={activeChat}
                    />}
                </div>

                {/* Footer */}
                <div className="flex-none overflow-y-auto">
                  <SidebarFooter />
                </div>
              </div>
            </div>
          </div>

          {/* DARK overlay mobile */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
              onClick={toggleSidebar}
            />
          )}
        </>
      )}
    </>
  );

};

export default Sidebar;