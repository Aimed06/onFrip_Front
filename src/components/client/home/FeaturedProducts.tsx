import { Link } from "react-router-dom"
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
import Products from "./Card"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

// Define product interface


const FeaturedProducts = (): JSX.Element => {
  return (
    <Container sx={{ py: 8 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography component="h2" variant="h4" gutterBottom>
            Produits les plus récents
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Découvrez les articles tendances pour un style unique
          </Typography>
        </Box>
        <Button component={Link} to="/search" variant="outlined" endIcon={<ArrowForwardIcon />}>
          Parcourir tout les articles
        </Button>
      </Box>

      <Products itemsPerRow={3}/>
    </Container>
  )
}

export default FeaturedProducts

