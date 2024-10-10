import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import {getRandomEmoji} from "../../utils/emojis";

const Conversations = () => {
  // 取得所有聊天室
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {console.log(conversations)}
      {conversations?.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1} // Last conversation留白
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default Conversations;
