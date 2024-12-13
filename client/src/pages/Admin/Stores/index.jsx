import { useDispatch, useSelector } from "react-redux";
import useSnackNotify from "../../../components/SnackNotify";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ChipStyled } from "../../../components";

const Index = () => {
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    return (
        <Box>
            <Grid container>
                <Grid item md={4}>
                    <Card className="relative">
                        <CardMedia
                            sx={{ height: 140 }}
                            image="https://d2j6dbq0eux0bg.cloudfront.net/images/66610504/2636936259.jpg"
                            title="green iguana"
                        />
                        <div className="p-4">
                            <p className="font-semibold text-truncate text-lg leading-5">
                                Lizards are a widespread group of squamate
                                reptiles, with over
                            </p>
                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary", my: 1 }}
                                className="text-truncate-3"
                            >
                                Lizards are a widespread group of squamate
                                reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica ranging
                                across all continents except Antarctica
                            </Typography>
                            <div className="flex justify-between items-center">
                                <div className="flex">
                                    <div className="text-2xl text-[#d26426] font-bold">
                                        110
                                    </div>
                                    <div className="flex items-end ml-3 font-medium text-gray-500">
                                        mặt hàng
                                    </div>
                                </div>
                                <div>
                                    <ChipStyled
                                        label="Đang hoạt động"
                                        color="success"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <LocationOnIcon
                                    fontSize="small"
                                    className="mb-2"
                                />
                                <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary", my: 1 }}
                                >
                                    Lizards are a widespread group of squamate
                                </Typography>
                            </div>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Index;
