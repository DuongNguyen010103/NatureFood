import { Server } from "socket.io";

export let io;
export const userSockets = new Map();
export const setupSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: ["http://72.18.214.43:5173", "http://localhost:5173"], // Chỉ định chính xác origin được phép
            credentials: true, // Cho phép gửi thông tin xác thực
        },
    });
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        // Xác định userId khi người dùng kết nối (giả sử client gửi userId)
        socket.on("registerUser", (userId) => {
            userSockets.set(userId, socket.id);
            console.log(`User ${userId} connected with socket ID ${socket.id}`);
        });

        // Khi có thông báo mới, chỉ gửi tới userId cụ thể
        socket.on("createNotification", (data) => {
            console.log("Nhận được yêu cầu createNotification với data: ", data);

            const { userId, message, error } = data;
            const userSocketId = userSockets.get(userId);
            console.log("userSocketId", userSocketId);

            if (userSocketId) {
                io.to(userSocketId).emit("receiveNotification", { message });
                console.log(`Notification sent to User ${userId}: ${message}`);
            }
        });

        // Ví dụ lắng nghe và phát sự kiện
        socket.on("sendNotification", (data) => {
            io.emit("receiveNotification", data);
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id);
            userSockets.forEach((socketId, userId) => {
                if (socketId === socket.id) {
                    userSockets.delete(userId);
                }
            });
        });
    });
    return io;
};
