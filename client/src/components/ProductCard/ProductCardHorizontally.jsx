import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function ProductCardHorizontally({ product }) {
    return (
        <Box className="flex p-4 h-[200px] w-full bg-gray-300">
            <Box className="w-1/3 bg-white rounded-md">
                <img
                    src={product?.images?.[0]?.url}
                    alt="newest product"
                    style={{ objectFit: "contain" }}
                />
            </Box>

            <Box className="w-2/3 ml-4">
                <Typography
                    component="p"
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        textAlign: "left",
                        color: "black",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        lineClamp: 2,
                        height: "2.8em",
                        lineHeight: 1.4,
                        mt: 2,
                    }}
                >
                    {product.name}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        textAlign: "left",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        lineClamp: 2,
                        height: "3em",
                        mt: 1,
                    }}
                >
                    {product.description}
                </Typography>
                <Box className="flex justify-between mt-2">
                    <Button
                        startIcon={<AddShoppingCartIcon color="warning" />}
                        variant="contained"
                        color="success"
                        size="middle"
                        sx={{ textTransform: "none" }}
                    >
                        Thêm vào giỏ
                    </Button>
                    <Typography
                        component="span"
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            color: "black",
                            ml: 2,
                        }}
                    >
                        ₫348.430
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
