import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
    CategoryRoutes,
    ProductRoutes,
    UserRoutes,
    ReviewRoutes,
    CartRoutes,
    FavoriteRoutes,
    TagRoutes,
    StoreRoutes,
    BannerRoutes,
    StoreProductRoutes,
    OrderRoutes,
    RefundRoutes,
    StoreCartRoutes,
    BlogRoutes,
    NotificationRoutes,
    BillRoutes,
    PaymentRoutes,
} from "./routes/index.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import { BaseResponse } from "./config/BaseResponse.config.js";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "./config/socket.js";

const app = express();
const apiVersion = "/api/v1";
dotenv.config();
const server = http.createServer(app);
const io = setupSocket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://72.18.214.43:5173", "http://localhost:5173"], // Chỉ định chính xác origin được phép
        credentials: true, // Cho phép gửi thông tin xác thực
    })
);

// Mongoose
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("data connected");
});

//session
const store = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: "thisisasecret",
    },
});
store.on("error", function (e) {
    console.log("Session store error", e);
});

const sessionConfig = {
    store,
    name: "session",
    secret: "thisisasecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};

app.use(session(sessionConfig));

//routes
app.use(`${apiVersion}/category`, CategoryRoutes);
app.use(`${apiVersion}/product`, ProductRoutes);
app.use(`${apiVersion}/user`, UserRoutes);
app.use(`${apiVersion}/review`, ReviewRoutes);
app.use(`${apiVersion}/cart`, CartRoutes);
app.use(`${apiVersion}/favorite`, FavoriteRoutes);
app.use(`${apiVersion}/tag`, TagRoutes);
app.use(`${apiVersion}/store`, StoreRoutes);
app.use(`${apiVersion}/banner`, BannerRoutes);
app.use(`${apiVersion}/store-product`, StoreProductRoutes);
app.use(`${apiVersion}/order`, OrderRoutes);
app.use(`${apiVersion}/refund`, RefundRoutes);
app.use(`${apiVersion}/store-cart`, StoreCartRoutes);
app.use(`${apiVersion}/blog`, BlogRoutes);
app.use(`${apiVersion}/notification`, NotificationRoutes);
app.use(`${apiVersion}/bill`, BillRoutes);
app.use(`${apiVersion}/payment`, PaymentRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json(BaseResponse.error(err.name, err.stack));
});

server.listen(3000, () => {
    const PORT = process.env.PORT || 8888;
    console.log(`SERVER ON PORT: ${PORT}`);
});
