import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        imageUrl: { type: String },
        message: { type: String, required: true },
        url: { type: String },
        isRead: { type: Boolean, default: false },
        type: { type: String, enum: ["order", "favorite", "gift", "calendar", "check", "notification"], default: "notification" },
    },
    { timestamps: true }
);

const NotificationModel = mongoose.model("Notification", NotificationSchema);
export default NotificationModel;
