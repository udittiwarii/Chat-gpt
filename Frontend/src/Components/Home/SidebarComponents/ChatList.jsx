import React from "react";
import ChatItem from "./ChatItem";

const ChatList = ({
  chats,
  isExpanded,
  activeSection,
  setActiveChat,
  archiveChat,
  deleteChat,
  setIsOpen,
  activeChat
}) => (
  <div className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-thin scrollbar-thumb-gray-700">
    {chats.map((chat) => (
      <ChatItem
        key={chat._id}
        chat={chat}
        isExpanded={isExpanded}
        activeSection={activeSection}
        setActiveChat={setActiveChat}
        archiveChat={archiveChat}
        deleteChat={deleteChat}
        setIsOpen={setIsOpen}
        isActive={activeChat && activeChat._id === chat._id}
      />
    ))}
  </div>
);

export default ChatList;
