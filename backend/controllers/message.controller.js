import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    // 先找看看有沒有對話紀錄
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // 如果沒有就建立新的對話紀錄
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // 然後在對話紀錄中建立新的訊息
    const newMessage = await Message({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage);
    }

    // await conversation.save();
    // await newMessage.save();
    // 同時執行 Promise.all 來同時儲存 conversation 和 newMessage
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const userToChatId = req.params.id;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
