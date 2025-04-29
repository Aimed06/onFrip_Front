import UserBar from "../components/client/Profile/userBar";
import Footer from "../components/client/home/Footer";
import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { MdShoppingCart, MdStore } from "react-icons/md";
import { useState } from "react";
import ProductList from "../components/client/Profile/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import Header from "../components/client/Profile/Header";
import Identite from "../components/client/Modals/VerificationStatus/VerificationStatus";
import VoirDetail from "../components/client/Modals/VoirDetails/VoirDetail";
import { Product } from "../services/Product/Products";
import { setShowDetail } from "../Redux/ModalSlice/ModalSlice";

const Profile = () => {
  const [tab, setTab] = useState(0);
  const [productSelected, setProductSelected] = useState<Product | null>(null);

  const showIdentite = useSelector(
    (state: RootState) => state.modal.identite
  );
  const showDetail = useSelector((state: RootState) => state.modal.detail);

  const dispatch = useDispatch();

  const handleOpenDetail = (product: Product) => {
    setProductSelected(product);
    dispatch(setShowDetail(true)); // ✅ Affiche la modale
  };

  

  return (
    <>
      <Header />
      

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item xs={12} md={3} my={3}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                p: 2,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <UserBar />
            </Paper>
          </Grid>

          {/* Contenu principal */}
          <Grid item xs={12} md={9} my={3}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                p: 3,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <Tabs
                value={tab}
                onChange={(e, newValue) => setTab(newValue)}
                centered
              >
                <Tab icon={<MdShoppingCart />} label="Mes Achats" />
                <Tab icon={<MdStore />} label="Mes Ventes" />
              </Tabs>

              <Box sx={{ mt: 2 }}>
                {tab === 0 && (
                  <Typography>Affichage des commandes passées...</Typography>
                )}
                {tab === 1 && (
                  <ProductList  selectedProduct={productSelected} onOpenDetail={handleOpenDetail} />
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {showIdentite && <Identite />}
      
      <Footer />
    </>
  );
};

export default Profile;
