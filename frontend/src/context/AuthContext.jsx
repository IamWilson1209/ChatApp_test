import { createContext, useContext, useState } from "react";

// AuthContext: 想像成儲物櫃，用來放要分享給其他人的資料
export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}


// AuthContextProvider 就是「分享按鈕」
// 用來包住 children，並且讓children裡面的東西都能使用儲物櫃裡的資料 => authUser 和 setAuthUser
export const AuthContextProvider = ({ children }) => {
  // useState 當作用來「記住」資料的小抽屜，記住 authUser，也就是登入使用者的資料
  // 先從 localStorage 裡找看看有沒有「使用者資料」，如果有就放進小抽屜裡；如果沒有就放「null」進去。
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
