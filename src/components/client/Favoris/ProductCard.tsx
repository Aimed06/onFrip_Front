import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Box,
    Grid,
    Button,
    CardActions,
  } from "@mui/material";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
  import { Product } from "../../../services/Product/Products";
  import { useDispatch } from "react-redux";
  import { User } from "../../../services/User/User";
  import { setUserFavoris } from "../../../Redux/UserSlice/UserSlice";
  import live_help from "../../../assets/live_help.png";
  import money from "../../../assets/money.png";
  
  interface FavoriteCardProps {
    product: Product;
  }
  
  const FavoriteCard: React.FC<FavoriteCardProps> = ({ product }) => {
    const dispatch = useDispatch();
    const getImageUrl = (image: string) => {
      if (image.startsWith("http")) return image;
      return `http://localhost:5000/uploads/${image}`;
    };
  
    const handleRemove = async () => {
      try {
        await User.removeProductFromFav(product.id);
        const res = await User.getUserFavoris();
        dispatch(setUserFavoris(res));
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    };
  
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
            image={getImageUrl(product.image)}
            alt={product.name}
          />
          <IconButton
            onClick={handleRemove}
            aria-label="remove from favorites"
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
            <FavoriteIcon color="error" />
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
                  color="green"
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
            sx={{ height: 50, fontSize: 12, fontWeight: "bold" }}
          >
            Ajouter au panier
          </Button>
        </CardActions>
      </Card>
    );
  };
  
  export default FavoriteCard;
  