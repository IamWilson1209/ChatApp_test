import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  // 創建 JWT token，傳userId給jwt.sign()，透過process.env.JWT_SECRET進行TOKEN生成
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // 資安設定：防止 XSS attack
    sameSite: "strict", // 資安設定：防止 CSRF attack
    secure: process.env.NODE_ENV !== "development", // Only set cookie over HTTPS in production
  });
};
