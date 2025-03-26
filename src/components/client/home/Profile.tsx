import UserBar from "../profilee/userBar";
import Footer from "../home/Footer";
import { Container, Grid, Paper, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import { MdPerson, MdSettings, MdShoppingCart, MdStore } from "react-icons/md";
import { useState } from "react";
import Navbar from "./Navbar";
import ProductList from "../profilee/ProductList"; // 📥 Assure-toi du bon chemin

const Profile = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Navbar />

      <Box sx={{ position: "relative", bgcolor: "#f5f5f5", pt: 6, pb: 8, overflow: "hidden" }}>
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8} display="flex" alignItems="center">
              <MdPerson size={32} color="#1976d2" />
              <Typography component="h5" variant="h5" fontWeight="bold" sx={{ ml: 1 }}>
                Mon Profil
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} display="flex" justifyContent="flex-end">
              <Button variant="outlined" startIcon={<MdSettings />} sx={{ height: 50, fontSize: 12, fontWeight: "bold" }}>
                Paramètres
              </Button>
            </Grid>
          </Grid>

          <Typography color="text.secondary" paragraph sx={{ mt: 2 }}>
            Gérez vos informations personnelles, vos ventes et vos achats.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item xs={12} md={3} my={3}>
            <Paper elevation={3} sx={{ borderRadius: 3, p: 2, transition: "transform 0.3s ease", "&:hover": { transform: "translateY(-5px)", boxShadow: 6 } }}>
              <UserBar />
            </Paper>
          </Grid>

          {/* Contenu principal */}
          <Grid item xs={12} md={9} my={3}>
            <Paper elevation={3} sx={{ borderRadius: 3, p: 3, transition: "transform 0.3s ease", "&:hover": { transform: "translateY(-5px)", boxShadow: 6 } }}>
              <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
                <Tab icon={<MdShoppingCart />} label="Mes Achats" />
                <Tab icon={<MdStore />} label="Mes Ventes" />
              </Tabs>

              <Box sx={{ mt: 2 }}>
                {tab === 0 && <Typography>Affichage des commandes passées...</Typography>}
                {tab === 1 && <ProductList />} {/* 📌 Ajout de la liste des produits en vente */}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default Profile;
