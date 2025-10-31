import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const ChatScreen = ({ chats, setChats, input, setInput }) => {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[#343541]">
        {chats.length === 0 ? (
          <div className="text-center text-gray-400 mt-20 text-lg">
            Start a new chat to talk with your AI assistant 💬
          </div>
        ) : (
          chats.map((msg, i) => (
            <ChatMessage key={i} sender={msg.sender} text={msg.text} />
          ))
        )}
      </div>

      {/* Input Area */}
      <ChatInput input={input} setInput={setInput} setChats={setChats} />
    </div>
  );
};

export default ChatScreen;
