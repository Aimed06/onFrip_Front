import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import live_help from "../../../assets/live_help.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Products } from "../../../services/Product/Products";
import { Product } from "../../../services/Product/Products";
import money from "../../../assets/money.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { User } from "../../../services/User/User";





// Sample data - in a real app, this would come from an API
interface ProductsProps {
  // Définir dynamiquement le nombre d'éléments par ligne
  selectedProduct:any;
}

const ProductsDisplay: React.FC<ProductsProps> = () => {
  const [error, setError] = useState<string | null>(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)
  const getImageUrl = (image: string) => {
    if (image.startsWith("http")) return image;
    return `http://localhost:5000/uploads/${image}`; // Adaptez l'URL à votre backend
  };
   const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    
  const handleAddToCart = async (product:Product) => {
   try {
         await User.addProductToCart(product.id, 1) // 1 est la quantité par défaut
         // Pas besoin de dispatch ici car la méthode addProductToCart met déjà à jour le state Redux
       } catch (error: any) {
   
         // Déterminer le message d'erreur approprié
         let errorMessage = "Erreur lors de l'ajout au panier"
   
         // Si l'erreur est une réponse HTTP avec un message
         if (error.response && error.response.data && error.response.data.message) {
           errorMessage = error.response.data.message
         } else if (error.message) {
           // Si l'erreur a un message simple
           errorMessage = error.message
         }
   
         // Si l'erreur indique que le produit est déjà possédé
         if (errorMessage.includes("already own") || errorMessage.includes("déjà possédé")) {
           errorMessage = "Vous possédez déjà ce produit"
         }
   
         setError(errorMessage)
         setOpenSnackbar(true)
       }
  };
    const dispatch = useDispatch();
    const fetchProducts = async () => {
      try {
        const res = await Products.getHomeProducts();
        setProducts(res);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);
    const handleFavoriss= async(productId:number)  =>{
      try {
        await User.addProductToFav(productId);

      }catch(error){
        console.log("hi")

      }

    }
    const featuredProducts = products.slice(0, 4);  // Only take the first 4 products
    return (
    <Grid container spacing={4}>
      {featuredProducts.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={3}>
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
                onClick={()=>handleFavoriss(product.id)}
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
                <FavoriteIcon  />
              </IconButton>
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  display: "inline",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h5"
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      fontSize: 17,
                      mr: 2,
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Grid container item xs={12} md={8}>
                    <img src={live_help} alt="" />
                    <Typography
                      variant="body2"
                      color="#3fa351"
                      sx={{ fontWeight: "bold", ml: 1 }}
                    >
                      {product.category.id}
                    </Typography>
                  </Grid>
                </Box>
                <Grid container item xs={12} md={12}>
                  <img src={money} alt="" />
                  <Typography variant="body2" fontWeight="bold" sx={{ ml: 1 }}>
                    {product.price} Dinars
                  </Typography>
                </Grid>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                fullWidth
                startIcon={<ShoppingCartIcon sx={{ ml: -0.4 }} />}
                onClick={() => handleAddToCart(product)}
                sx={{ height: 50, fontSize: 12, fontWeight: "bold" }}
              >
                Ajouter au panier
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsDisplay;

