import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);

export default function useChat(userId: string) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket.on(`receiveMessage-${userId}`, (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off(`receiveMessage-${userId}`);
    };
  }, [userId]);

  const sendMessage = (receiverId: string, jobId: string, message: string) => {
    const newMessage = { senderId: userId, receiverId, jobId, message };
    socket.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);
  };

  return { messages, sendMessage };
}
