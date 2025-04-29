import React, { useState } from "react";
import {
  Typography,
  Divider,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Fade,
  Button,
  Dialog,
} from "@mui/material";
import { Product, Products } from "../../../../services/Product/Products";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "../../Common/Modals";
import Confirmation from "../Confirmation/Confirmation";
import {
  setShowDetail,
  setShowProducts,
} from "../../../../Redux/ModalSlice/ModalSlice";
import { setDeleteProduct, setShowUserProducts } from "../../../../Redux/UserSlice/UserSlice";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../../Redux/ProductSlice/ProductSlice";

interface ProductDetailModalProps {
  product: Product;
  onClose?: () => void;
  onDelete: (number:number) => Promise<void>;
}

const VoirDetail = ({ product, onClose, onDelete }: ProductDetailModalProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  console.log("Product reçu dans VoirDetail :", product);

  if (!product) return null; // <- Ajout pour éviter l'erreur

  const getImageUrl = (image?: string) => {
    if (!image) return "/default-image.jpg";
    if (image.startsWith("http")) return image;
    return `http://localhost:5000/uploads/${image}`;
  };

  const handleClose = () => {
    if (onClose) onClose();
    else dispatch(setShowDetail(false));
  };

 
  
  const  handleDelete = async () => {
   try{ 
    await onDelete(product.id);
    dispatch(setShowDetail(false));
    dispatch(setShowUserProducts(true));
    setOpenConfirm(false);

  }catch (error){
    console.error("Erreur lors de la suppression du produit :", error);
  }
     // Ferme la confirmation
  };
  
  
  
  

  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <>
    <Modal>
      
       
          <IconButton 
            onClick={handleClose}
            sx={{ position: "relative", ml:45, zIndex: 10, color:"#f10e0e" }}
          >
            <CloseIcon />
          </IconButton>

          <Box textAlign="center" mb={2}>
            <img
              src={getImageUrl(product.image)}
              alt={`Image de ${product.name}`}
              style={{
                height: "200px",
                width: "100%",
                maxWidth: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Box>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Prix :</strong> {product.price} Dinars
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Catégorie :</strong>{" "}
            {product.category.id ?? "Non spécifiée"}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Status :</strong>{" "}
            {product.status === "vendu" ? "Vendu" : "En ligne"}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Vendeur :</strong> {product.seller.firstName}{" "}
            {product.seller.lastName}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => setOpenConfirm(true)}
          >
            Supprimer ce produit
          </Button>
          
      </Modal>
    <Confirmation
      open={openConfirm}
      title="Confirmer la suppression"
      description="Êtes-vous sûr de vouloir supprimer ce produit ?"
      onCancel={() => setOpenConfirm(false)}
      onConfirm={handleDelete}
    />

    </>
  );
};
export default VoirDetail;
