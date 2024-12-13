import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Typography, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { tryCatchWrapper } from "../../../utils/asyncHelper";
import { getProductApi } from "../../../apis/product.api";

const EditProduct = () => {
    const { productId } = useParams(); // Lấy ID sản phẩm từ URL
    const [product, setProduct] = useState({
        name: "",
        price: "",
        salePrice: "",
        description: "",
        weight: "",
        inventory: "",
        images: [],
        tags: [],
    });

    useEffect(() => {
        // Lấy thông tin sản phẩm từ API
        const fetchProduct = async () => {
            const response = await tryCatchWrapper(getProductApi(productId));
            console.log(response);
        };

        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/products/${id}`, product);
            alert("Product updated successfully!");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <Paper style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Edit Product
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Product Name" name="name" value={product.name} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Price" name="price" type="number" value={product.price} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Sale Price" name="salePrice" type="number" value={product.salePrice} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Weight" name="weight" type="number" value={product.weight} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Inventory" name="inventory" type="number" value={product.inventory} onChange={handleChange} />
                    </Grid>
                    {/* Thêm trường cho hình ảnh và thẻ nếu cần */}
                </Grid>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
                    Update Product
                </Button>
            </form>
        </Paper>
    );
};

export default EditProduct;
