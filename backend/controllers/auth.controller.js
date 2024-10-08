import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password must be same as confirm password" });
    }

    // hash password
    // 123456 => bcrypt e.g. ghioehgoqhgeoqhgioqhgioehqgoho
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfileImg = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfileImg = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // 新增 User
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profileImg: gender === "male" ? boyProfileImg : girlProfileImg,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res); // 產生 token 並設置 cookie
      await newUser.save(); // Save User to MongoDB
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        gender: newUser.gender,
        profileImg: newUser.profileImg,
      });
    } else {
      return res.status(400).json({ message: "Invalid user!!" });
    }
  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordMatch = await bcrypt.compare( // 記得 decode password
      password,
      user?.password || "" // Password如果不存在記得丟"" 因為 bcrypt decode password 會回傳 undefined"
    );

    if (!user || !isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res); // 產生 token 並設置 cookie
    res.status(200).json({
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      gender: user.gender,
      profileImg: user.profileImg,
    });
  } catch (error) {
    console.log("Error in login controller: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    // 清除 cookies
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
