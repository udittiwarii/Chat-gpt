import TypingLoader from "./../TypingLoader";

const ChatMessage = ({ message, aiLoading }) => {
  const isUser = message.role === "user";

  // Loader only for upcoming AI message
  const isLoader = message.loading === true && aiLoading === true;

  return (
    <div
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"} px-4 py-3`}
    >
      <div
        className={`flex items-start max-w-[75%] gap-3 ${isUser ? "flex-row-reverse" : ""}`}
      >
        {/* If LOADER → show only dot (no bubble) */}
        {isLoader ? (
          <TypingLoader />
        ) : (
          <div
            className={`px-4 py-2 rounded-xl text-sm md:text-base whitespace-pre-wrap leading-relaxed
              ${isUser && "bg-[#444654] text-[#ececf1] rounded-bl-none"}
              ${!isUser && "bg-[#2f3035] text-[#ececf1]"}
            `}
          >
            {message.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
