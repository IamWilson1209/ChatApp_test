import { create } from 'zustand'; // 全局狀態管理庫，Hook一般用在Component級別進行狀態管理


// 因為一個Conversation要同時管理Message, MessageInput, Conversation的狀態，所以需要統一管理
const useConversation = create((set) => ({ // create: 建立狀態管理的 store
    selectedConversation: null, // 目前選中的對話 
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }), // 更新目前選中的對話
    messages: [], // 選中對話中的訊息
    setMessages: (messages) => set({ messages }), // 更新對話中的訊息
}));

export default useConversation;