
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
  } from "@mui/material"
  import live_help from "../../../assets/live_help.png"
  import FavoriteIcon from "@mui/icons-material/Favorite"
  import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
  import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
  import jean from "../../../assets/jean.jpg"
  import ronaldo from "../../../assets/ronaldo.jpg"
  import money from "../../../assets/money.png"
  import description from "../../../assets/description.png"

  interface Product {
    id: number
    name: string
    price: number
    category: string
    image: string
    isFeatured: boolean
    isNew: boolean
  }
  
  // Sample data - in a real app, this would come from an API
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Vintage Jean",
      price: 500,
      category: "Pantalon",
      image: jean, // Replace with actual image path
      isFeatured: true,
      isNew: false,
    },
    {
      id: 2,
      name: "Sweat de Ronaldo",
      price: 2000,
      category: "T-shirt",
      image: jean, // Replace with actual image path
      isFeatured: true,
      isNew: true,
    },
    {
      id: 3,
      name: "tricot",
      price: 200,
      category: "t-shirt",
      image: ronaldo, // Replace with actual image path
      isFeatured: true,
      isNew: false,
    },
    {
      id: 4,
      name: "chaussette",
      price: 300,
      category: "chaussette",
      image: ronaldo, // Replace with actual image path
      isFeatured: true,
      isNew: false,
    },
  ]
          
  interface ProductsProps {
    itemsPerRow: number; // Définir dynamiquement le nombre d'éléments par ligne
  }
  
  const Products: React.FC<ProductsProps> = ({ itemsPerRow }) => {
    return (
      <Grid container spacing={4}>
        {featuredProducts.map((product) => (

          <Grid item key={product.id} xs={12} sm={6} md={itemsPerRow}>
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

                <CardMedia component="img" height="200" image={product.image} alt={product.name} />
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
                {product.isNew && (
                  <Chip
                    label="New"
                    color="primary"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                    }}
                  />
                )}
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "inline", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                 
                    <Typography gutterBottom variant="h6" component="h5" sx={{fontFamily:"monospace", fontWeight:"bold",fontSize:17, mr:2}}>
                      {product.name}
                    </Typography>
                    
                    <Grid container item xs={12} md={8}>
                    <img src={live_help} alt="" />
                    <Typography  variant="body2" color="green" sx={{fontWeight:"bold" ,ml:1}}>
                      {product.category}
                    </Typography>
                    </Grid>
                  </Box>
                  <Grid container item xs={12} md={12}>
                   <img src={money} alt="" />
                  <Typography variant="body2" fontWeight="bold" sx={{ml:1}}>
                    {product.price.toFixed(2)} Dinars
                  </Typography>
                  </Grid>
                </Box>
              </CardContent>
              <CardActions>
                <Button  variant="contained" fullWidth startIcon={<ShoppingCartIcon sx={{ml:-0.4}} />} sx={{height:50, fontSize:12,fontWeight:"bold"}}>
                  Ajouter au panier
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
    );
  };
  
  

export default Products