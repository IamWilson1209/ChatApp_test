import { useEffect } from "react";
import {useSocketContext} from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sound/notification.mp3";

// 即時在其他用戶介面show出訊息
const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);
		});

        return () => {
            socket?.off("newMessage");
        }
        // cleanup function to prevent memory leaks
    }, [socket, messages, setMessages]);
}
export default useListenMessages;