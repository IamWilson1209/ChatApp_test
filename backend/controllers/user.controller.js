import User from "../models/user.model.js";

export const getUserForSideBar = async (req, res) => {
  try {
    const loginUserId = req.user._id;
    
    // 不要選到自己
    const filteredUsers = await User.find({ _id: { $ne: loginUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in send getUserForSideBar controller: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
