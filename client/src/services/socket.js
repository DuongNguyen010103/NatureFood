import { io } from "socket.io-client";
const socket = io(import.meta.env.VITE_APP_DOMAIN);

export const sendNotification = (userId, message, url) => {
    socket.emit("createNotification", {
        userId,
        message,
        url,
    });
    console.log("đã gửi yêu cầu createNotification");
};
