import { Box, Container, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Header = (): JSX.Element => {
  return (
    <Box sx={{ position: "relative", bgcolor: "#f5f5f5", pt: 6, pb: 8, overflow: "hidden" }}>
      {/* Fond avec clipPath */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          bgcolor: "#e0e0e0",
          clipPath: "polygon(100% 0, 100% 100%, 60% 80%)", // Ajustement de la coupe
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8} display="flex" alignItems="center">
            <SearchIcon sx={{ fontSize: 32, color: "primary.main" }} />
            <Typography component="h5" variant="h5" fontWeight="bold" sx={{ ml: 1 }}>
              Recherche de produits
            </Typography>
          </Grid>
        </Grid>

        <Typography color="text.secondary" paragraph sx={{ mt: 2 }}>
          Trouvez votre produit idéal grâce au filtre de recherche.
        </Typography>
      </Container>
    </Box>
  );
};

export default Header;
