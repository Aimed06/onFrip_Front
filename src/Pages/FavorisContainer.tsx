import { Container, Grid, Typography, Box, TextField, InputAdornment } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import Header from "../components/client/Favoris/Header";
import Footer from "../components/client/home/Footer";
import FavoriteCard from "../components/client/Favoris/ProductCard";
import { useState, useEffect } from "react";
import { User } from "../services/User/User";
import SearchIcon from "@mui/icons-material/Search";

const Favoris = () => {
  const favorites = useSelector((state: RootState) => state.user.favoris);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fecthFavoris = async () => {
    await User.getUserFavoris();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fecthFavoris();
  }, []);

  const filteredFavorites = favorites.filter((fav) =>
    fav.product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />

      <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh", pt: 5, pb: 10 }}>
        <Container maxWidth="lg">
          {/* Barre de recherche */}
          <Box mb={4} textAlign="center">
            <TextField
              placeholder="Rechercher dans vos favoris..."
              variant="outlined"
              size="small"
              sx={{ width: '60%', backgroundColor: "white", borderRadius: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          {/* Affichage selon contenu */}
          {filteredFavorites.length === 0 ? (
            <Box textAlign="center" mt={10}>
              <img
                src="/empty-heart.png"
                alt="Pas de favoris"
                style={{ width: 150, marginBottom: 20 }}
              />
              <Typography variant="h6" color="text.secondary">
                Vous n'avez ajouté aucun produit en favori.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4} justifyContent="center" mt={4}>
              
              {filteredFavorites.map((fav) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={fav.id}>
                  <FavoriteCard product={fav.product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default Favoris;
