import React, { useState } from "react";
import ChatScreen from "../Components/Home/ChatScreen";
import Sidebar from "../Components/Home/Sidebar";

const Home = () => {
  const [chats, setChats] = useState([]); // all messages
  const [input, setInput] = useState(""); // current input
  const [activeChat, setActiveChat] = useState("New Chat"); // current chat

  return (
    <div className="flex h-screen w-screen bg-[#343541] text-gray-100 overflow-hidden">
      {/* Sidebar (responsive inside Sidebar component) */}
      <Sidebar setActiveChat={setActiveChat} />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        <ChatScreen
          chats={chats}
          setChats={setChats}
          input={input}
          setInput={setInput}
        />
      </div>
    </div>
  );
};

export default Home;
