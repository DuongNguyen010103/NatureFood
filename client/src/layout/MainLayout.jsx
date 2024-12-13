import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components/common";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteStoreProductsAction } from "../hooks/Redux/Favorite/favoriteAction";

const Index = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);

    const handleGetData = async () => {
        await dispatch(getFavoriteStoreProductsAction());
    };
    useEffect(() => {
        handleGetData();
    }, [token]);
    return (
        <div className="relative">
            <Header />
            <div className="bg-primary">
                <Container className="py-6" maxWidth="xl">
                    <Outlet />
                </Container>
            </div>

            <Footer />
        </div>
    );
};

export default Index;
