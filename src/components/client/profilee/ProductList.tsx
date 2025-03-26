import { useState } from "react";
import { Container, Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  category:string;
  imageUrl: string;
  status: "vendu" | "en ligne";
}

const mockProducts: Product[] = [
  { id: 1, name: "T-shirt Vintage", price: 1500,category: "Pantalon", imageUrl: "https://via.placeholder.com/150", status: "en ligne" },
  { id: 2, name: "Jean Levi’s", price: 2500, category: "Pantalon",imageUrl: "https://via.placeholder.com/150", status: "vendu" },
  { id: 3, name: "Veste Cuir", price: 5000,category: "Pantalon", imageUrl: "https://via.placeholder.com/150", status: "en ligne" },
  { id: 4, name: "Sneakers Adidas", price: 4000,category: "Pantalon", imageUrl: "https://via.placeholder.com/150", status: "vendu" },
];

const ProductList = () => {
  const [filter, setFilter] = useState("all");

  const filteredProducts = mockProducts.filter(
    (product) => filter === "all" || product.status === filter
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Filtrer</InputLabel>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="all">Tous</MenuItem>
          <MenuItem value="en ligne">Produits en ligne</MenuItem>
          <MenuItem value="vendu">Produits vendus</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
