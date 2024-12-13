import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/styles/base.css";
import "./assets/styles/swiper.css";
import "swiper/css";

import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import { Provider } from "react-redux";
import { store } from "./hooks/Redux/store.js";
import { SnackbarProvider } from "notistack";
import router from "./routes/routes.jsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
            <RouterProvider router={router} />
        </SnackbarProvider>
    </Provider>
);
