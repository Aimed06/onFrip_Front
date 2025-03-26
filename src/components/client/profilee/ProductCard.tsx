import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  CardActions,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import { MdEdit, MdDelete } from "react-icons/md"; // Correction de l'import des icônes
import FavoriteIcon from "@mui/icons-material/Favorite"; // Import de l'icône Favorite
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Import de l'icône ShoppingCart
import live_help from "../../../assets/live_help.png"; // Remplacez par le chemin correct
import money from "../../../assets/money.png"; // Remplacez par le chemin correct

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  status: "vendu" | "en ligne"; // Utilisation d'un type pour éviter les erreurs
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrl}
          alt={product.name}
        />
        <IconButton
          aria-label="add to favorites"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "background.paper",
            "&:hover": {
              bgcolor: "background.paper",
            },
          }}
        >
          <FavoriteIcon />
        </IconButton>
        <Chip
          label={product.status === "vendu" ? "Vendu" : "En ligne"}
          color={product.status === "vendu" ? "error" : "success"}
          size="small"
          sx={{ position: "absolute", top: 8, left: 8 }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h5"
          sx={{ fontWeight: "bold", fontSize: 17 }}
        >
          {product.name}
        </Typography>
        <Grid container alignItems="center" sx={{ mb: 1 }}>
          <img src={live_help} alt="Category icon" style={{ width: 20, height: 20 }} />
          <Typography variant="body2" color="green" sx={{ fontWeight: "bold", ml: 1 }}>
            {product.category}
          </Typography>
        </Grid>
        <Grid container alignItems="center">
          <img src={money} alt="Price icon" style={{ width: 20, height: 20 }} />
          <Typography variant="body2" fontWeight="bold" sx={{ ml: 1 }}>
            {product.price.toFixed(2)} Dinars
          </Typography>
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth sx={{ height: 50, fontSize: 12, fontWeight: "bold" }}>
          Voir Détail
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;