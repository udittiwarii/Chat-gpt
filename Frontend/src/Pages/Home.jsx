import React, { useState, useEffect } from "react";
import ChatScreen from "../Components/Home/ChatScreen";
import Sidebar from "../Components/Home/Sidebar";

const Home = () => {
  const [user, setUser] = useState(null); // set this from JWT/auth later
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [tempMode, setTempMode] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [chats, setChats] = useState([]);


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
        chats={chats}
        setChats={setChats}
        setTempMode={setTempMode}
      />

      <main className="flex-1 relative flex flex-col h-full">
        <ChatScreen
          setActiveChat={setActiveChat}
          activeChat={activeChat}
          messages={messages}
          setMessages={setMessages}
          input={input}
          setInput={setInput}
          tempMode={tempMode}
          setMessageCount={setMessageCount}
          setTempMode={setTempMode}
          setChats={setChats}
        />
      </main>
    </div>
  );
};

export default Home;
