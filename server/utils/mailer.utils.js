import nodeMailer from "nodemailer";
import { mailConfig } from "../config/mail.config.js";

export const sendMail = (to, subject, template) => {
    const transport = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: mailConfig.USERNAME,
            pass: mailConfig.PASSWORD,
        },
    });

    const options = {
        from: mailConfig.FROM_ADDRESS,
        to: to,
        subject: subject,
        html: template,
    };
    return new Promise((resolve, reject) => {
        transport.sendMail(options, (error, info) => {
            if (error) {
                console.log("Lỗi khi gửi email:", error);
                reject({ success: false, error: error.message });
            } else {
                console.log("Gửi email thành công:", info.response);
                resolve({ success: true, response: info.response });
            }
        });
    });
};
