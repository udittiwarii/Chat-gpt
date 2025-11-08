import React, { useState } from "react";
import ChatScreen from "../Components/Home/ChatScreen";
import Sidebar from "../Components/Home/Sidebar";

const Home = () => {
  const [user, setUser] = useState(null); // get from auth context or JWT
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [tempMode, setTempMode] = useState(false); // temporary chat toggle
  const [messageCount, setMessageCount] = useState(0); // for guest limit

  // When a new chat is selected, clear the messages
  const handleChatChange = (chat) => {
    setActiveChat(chat);
    setMessages([]); // In a real app, you'd load messages for this chat
    setInput("");
  };

  return (
    <div className="flex h-screen w-screen bg-[#343541] overflow-hidden">
      {/* Sidebar */}
      <Sidebar setActiveChat={handleChatChange} activeChat={activeChat} />

      {/* Chat Area */}
      <main className="flex-1 relative flex flex-col h-full">
        <ChatScreen
          activeChat={activeChat}
          messages={messages}
          setMessages={setMessages}
          input={input}
          setInput={setInput}
        />
      </main>
    </div>
  );
};

export default Home;
