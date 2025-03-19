import { Box, Button, Container, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"

const Header = (): JSX.Element => {
  return (
    <Box sx={{ position: "relative", bgcolor: "#f5f5f5", pt: 4, pb: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          <Grid container item xs={12} md={8}>
           
                <SearchIcon sx={{mt:0.5}} />
                <Typography component="h5" variant="h5" fontWeight={"bold"} color="text.primary" sx={{ml:1 ,mb:1}} >
                   Recherche de produits
                </Typography>
                </Grid>
                </Grid>

                <Typography  color="text.secondary" paragraph>
                  Trouvez votre produit idéal grace au filtre de recherche.
                </Typography>

            
          
      </Container>
    </Box>
  );
};
export default Header;
