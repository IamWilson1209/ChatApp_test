import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
    try {
        // 如果有登入，可以從cookie取得token
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        // 如果是錯的token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Token is invalid, authorization denied' });
        }
        // 如果使用者存在，從 MongoDB 找到他
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: 'User not found, authorization denied' });
        }
        // 將使用者資料存到 req.user
        req.user = user;
        next(); // 用於middleware處理流程，告訴系統繼續到下一個middleware或路由處理程序
    }  catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        return res.status(500).json({ message: 'Internal Server error' });
    }
} 
