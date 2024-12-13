import React from "react";
import "../../../assets/styles/main.css";
import { Button, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";

export default function Error404() {
    return (
        <body className="error-body">
            <div className="error-page">
                <div className="falcon-logo">
                    <img src="assets/images/logo.png" alt="falcon logo" />
                </div>
                <div className="error-contentt">
                    <h1 className="error-h">404</h1>
                    <p className="error-message">Không tìm thấy trang bạn đang tìm kiếm.</p>
                    <hr></hr>
                    <p className="error-details">
                        Make sure the address is correct and that the page hasn't moved. If you think this is a mistake,{" "}
                        <a href="mailto:support@example.com">hãy liên hệ với chúng tôi</a>.
                    </p>
                    <Button className="error-button" variant="contained" startIcon={<HomeIcon />}>
                        Trở về trang chủ
                    </Button>
                </div>
            </div>
        </body>
    );
}
