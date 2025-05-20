// components/client/home/SearchCard.tsx
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
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
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { User } from "../../../services/User/User";

interface ProductsProps {
  selectedProduct?: any;
  filters?: {
    searchTerm: string;
    category: string | number;
    priceRange: [number, number];
  };
}

const ProductsSearch: React.FC<ProductsProps> = ({ selectedProduct, filters }) => {
  const getImageUrl = (image: string) => {
    if (image.startsWith("http")) return image;
    return `${import.meta.env.VITE_API_URL}/uploads/${image}`; // Adaptez l'URL à votre backend
  };
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await Products.getHomeProducts();
      setProducts(res);
      setFilteredProducts(res);
    } catch (error) {
      console.error("Erreur lors du chargement des produits :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Appliquer les filtres lorsqu'ils changent
  useEffect(() => {
    if (!filters) {
      setFilteredProducts(products);
      return;
    }

    const { searchTerm, category, priceRange } = filters;
    
    const filtered = products.filter((product) => {
      // Filtre par nom (recherche textuelle)
      const nameMatch = searchTerm 
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      
      // Filtre par catégorie
      const categoryMatch = 
        !category || 
        category === "Tous" || 
        category === "all" || 
        (product.category && 
          (String(product.category.id) === String(category) || 
           product.category.name === category));
      
      // Filtre par plage de prix
      const price = Number(product.price);
      const priceMatch = !priceRange || (price >= priceRange[0] && price <= priceRange[1]);
      
      // Le produit doit correspondre à tous les filtres actifs
      return nameMatch && categoryMatch && priceMatch;
    });
    
    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleAddToCart = async (product: Product) => {
    try {
      await User.addProductToCart(product.id, 1);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
    }
  };

  const handleFavoriss = async (productId: number) => {
    try {
      await User.addProductToFav(productId);
    } catch (error) {
      console.log("Erreur lors de l'ajout aux favoris:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: "center", p: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Aucun produit ne correspond à vos critères de recherche.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Essayez de modifier vos filtres pour voir plus de résultats.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
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
                    onClick={() => handleFavoriss(product.id)}
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
                        <img src={live_help || "/placeholder.svg"} alt="" />
                        <Typography
                          variant="body2"
                          color="green"
                          sx={{ fontWeight: "bold", ml: 1 }}
                        >
                          {product.category?.name || product.category?.id || "Non catégorisé"}
                        </Typography>
                      </Grid>
                    </Box>
                    <Grid container item xs={12} md={12}>
                      <img src={money || "/placeholder.svg"} alt="" />
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
      )}
    </>
  );
};

export default ProductsSearch;