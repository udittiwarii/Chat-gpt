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
  activeChat,
  renameChat
}) => (
  <div
    className="flex-1 px-2 pb-4 overflow-y-auto 
               scrollbar-thin scrollbar-thumb-gray-700 hover:scrollbar-thumb-gray-600 
               scrollbar-track-transparent scroll-smooth"
  >
    {chats.length > 0 ? (
      chats.map((chat) => (
        <ChatItem
          key={chat._id}
          chat={chat}
          isExpanded={isExpanded}
          activeSection={activeSection}
          setActiveChat={setActiveChat}
          archiveChat={archiveChat}
          deleteChat={deleteChat}
          setIsOpen={setIsOpen}
          renameChat={renameChat}
          isActive={activeChat && activeChat._id === chat._id}
        />
      ))
    ) : (
      <p className="text-gray-400 text-center mt-4 text-sm">
        No chats available
      </p>
    )}
  </div>
);

export default ChatList;
