import React, { useState, useEffect } from "react";
import ChatScreen from "../Components/Home/ChatScreen";
import Sidebar from "../Components/Home/Sidebar";

const Home = () => {
  const [user, setUser] = useState(null); // set this from JWT/auth later
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [tempMode, setTempMode] = useState(!user); // guest mode if no user
  const [messageCount, setMessageCount] = useState(0);

  const handleChatChange = (chat) => {
    setActiveChat(chat);
    setMessages([]);
    setInput("");
  };

  return (
    <div className="flex h-screen w-screen bg-[#343541] overflow-hidden">
      <Sidebar
        setActiveChat={handleChatChange}
        activeChat={activeChat}
        tempMode={tempMode}
      />

      <main className="flex-1 relative flex flex-col h-full">
        <ChatScreen
          activeChat={activeChat}
          messages={messages}
          setMessages={setMessages}
          input={input}
          setInput={setInput}
          tempMode={tempMode}
          setMessageCount={setMessageCount}
          setTempMode={setTempMode}
        />
      </main>
    </div>
  );
};

export default Home;
