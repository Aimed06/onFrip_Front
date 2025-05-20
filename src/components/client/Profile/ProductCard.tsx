import React, { useState } from "react";
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
import { MdEdit, MdDelete } from "react-icons/md";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Product, ProductStatus } from "../../../services/Product/Products"; // Assurez-vous que le chemin est correct
import VoirDetail from "../Modals/VoirDetails/VoirDetail";
import money from "../../../assets/money.png"
import live_help from "../../../assets/live_help.png"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { setShowDetail, setShowSignUp } from "../../../Redux/ModalSlice/ModalSlice";
const ProductCard = ({ product, onOpenDetail }: { product: Product; onOpenDetail: (product: Product) => void }) => {
  const [openModal, setOpenModal] = useState(false);

  const getImageUrl = (image: string) => {
    if (image.startsWith("http")) return image;
    return `http://localhost:5000/uploads/${image}`; // Adaptez l'URL à votre backend
  };

 interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onProductSold: (productId: number) => void;
}


{console.log("Product status:", product.status)}
  return (
    <>
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
            image={getImageUrl(product.image)}
            alt={product.name}
          />
          <IconButton
            aria-label="ajouter aux favoris"
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
            label={product.status === ProductStatus.SOLD ? "Vendu" : "En ligne"}
            color={product.status === ProductStatus.SOLD ? "error" : "success"}
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
          <img src={live_help} alt="" />
            <Typography variant="body2" color="green" sx={{ fontWeight: "bold", ml: 1 }}>
              {product.category?.id ?? "Catégorie inconnue"}
            </Typography>
          </Grid>
          <Grid container alignItems="center">
          <img src={money} alt="" />
            <Typography variant="body2" fontWeight="bold" sx={{ ml: 1 }}>
              {product.price} Dinars
            </Typography>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            fullWidth
            sx={{ height: 50, fontSize: 12, fontWeight: "bold" }}
            onClick={() => onOpenDetail(product)}
          >
            Voir Détail
          </Button>
        </CardActions>
      </Card>

      {/* Modal de Détail du Produit */}

      
    </>
  );
};

export default ProductCard;



