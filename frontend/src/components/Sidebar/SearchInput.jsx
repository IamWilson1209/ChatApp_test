import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation(); // 目前選中的對話與訊息，要用全局狀態因為對話內容區也需要他的狀態
  const { conversations } = useGetConversations(); // 取得所有對話

  const handleSubmit = (e) => {
    e.preventDefault();
	if (!search) return;
	if (search.length < 3) {
		return toast.error("Search query must be at least 3 characters long.");
	}

	// 通過關鍵字搜尋指定的對話
	const conversation = conversations.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()))
  
	if (conversation) {
		setSelectedConversation(conversation);
		setSearch(""); // 記得沒有要重設回空字串
	} else {
		toast.error("No conversation found");
	}
};

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
