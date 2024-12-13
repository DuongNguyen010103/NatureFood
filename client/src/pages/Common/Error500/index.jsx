import React from "react";
import "../../../assets/styles/main.css";
import { Button, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Error500() {
    return (
        <body className="error-body">
            <div className="error-page">
                <div className="falcon-logo">
                    <img src="assets/images/logo.png" alt="falcon logo" />
                </div>
                <div className="error-content">
                    <h1 className="error-h">500</h1>
                    <p className="error-message">Ồ, có gì đó không ổn rồi!</p>
                    <hr></hr>
                    <p className="error-details">
                        Hãy thử làm mới trang hoặc quay lại và thử hành động một lần nữa. Nếu vấn đề này vẫn tiếp diễn,{" "}
                        <a href="mailto:support@example.com">liên hệ với chúng tôi</a>.
                    </p>
                    {/* <Button variant="contained" startIcon={<DeleteIcon />}>
                    Delete
                </Button> */}
                </div>
            </div>
        </body>
    );
}
