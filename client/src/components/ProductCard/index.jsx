import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Box, Button, Rating, Stack, TextField } from "@mui/material";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditGroup from "../EditGroup";
import { useNavigate } from "react-router-dom";

const bgColors = [
    "red",
    "green",
    "purple",
    "black",
    "blue",
    "yellow",
    "orange",
];

const ProductCard = ({ product, role }) => {
    const navigate = useNavigate();
    const handleEditProduct = () => {
        console.log(product._id, "edit");
    };

    const handleDeleteProduct = () => {
        console.log(product._id, "delete");
    };

    const handleCardClick = () => {
        navigate(`/product/detail/${product._id}`);
    };
    return (
        <Card
            sx={{
                backgroundColor: bgColors[Math.floor(Math.random() * 6)],
                borderRadius: "14px 14px 8px 8px",
                ":hover": {
                    backgroundColor: "white",
                },
            }}
        >
            <Box className="rounded-t-[30px] overflow-hidden mt-4 bg-white relative hover:rounded-none hover:mt-0 hover:pt-4 transform transition-all duration-500 ease-in-out">
                <FavoriteBorderIcon
                    className="absolute right-4 top-2 text-red-500 hidden"
                    fontSize="medium"
                />
                <FavoriteIcon
                    className="absolute right-4 top-2 text-red-500"
                    fontSize="medium"
                />
                <Box className="px-4 pt-1" onClick={handleCardClick}>
                    <Typography
                        component="p"
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: "24px",
                            px: "24px",
                        }}
                        noWrap
                    >
                        {product.name}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitLineClamp: 2,
                            lineClamp: 2,
                            textAlign: "center",
                            lineHeight: 1.2,
                            height: "2.4em",
                        }}
                    >
                        {product.description}
                    </Typography>
                </Box>
                <CardMedia
                    component="img"
                    style={{ height: 120, objectFit: "contain" }}
                    image={product.images?.[0].url}
                    alt="Paella dish"
                />
                <CardContent sx={{ py: 1 }} onClick={handleCardClick}>
                    <Box className="flex justify-between">
                        <Typography
                            noWrap
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                display: "grid",
                                placeItems: "center",
                                color: "red",
                            }}
                        >
                            {`₫${product.price.toLocaleString("vi-VN")}`}
                        </Typography>
                        <Stack spacing={1}>
                            <Rating
                                name="size-small"
                                value={3}
                                readOnly
                                size="small"
                            />
                            <Typography
                                variant="body2"
                                sx={{ textAlign: "center" }}
                            >
                                Đã bán: 123
                            </Typography>
                        </Stack>
                    </Box>
                    <Stack>
                        <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold", fontStyle: "italic" }}
                        >
                            Thương hiệu
                        </Typography>
                        <Typography variant="body2">Lê Quang Foods</Typography>
                    </Stack>
                </CardContent>
                <Box className="bg-green-500 p-2">
                    {role === "host" ? (
                        <EditGroup
                            onEditClick={handleEditProduct}
                            onDeleteClick={handleDeleteProduct}
                        />
                    ) : (
                        <Button
                            sx={{
                                textAlign: "center",
                                width: "100%",
                                fontSize: "16px",
                                color: "black",
                            }}
                            variant="text"
                            size="small"
                        >
                            Mua ngay
                        </Button>
                    )}
                </Box>
            </Box>
        </Card>
    );
};

export default ProductCard;
