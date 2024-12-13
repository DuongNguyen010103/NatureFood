import React from "react";
import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const useSnackNotify = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    return (variant) => (message) => {
        enqueueSnackbar(message, {
            variant,
            action: (key) => (
                <IconButton
                    aria-label="close"
                    color="inherit"
                    onClick={() => closeSnackbar(key)}
                >
                    <CloseIcon />
                </IconButton>
            ),
        });
    };
};

export default useSnackNotify;
