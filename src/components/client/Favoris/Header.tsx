import Navbar from "../home/Navbar";
import PageTitle from "../home/PageTitle";
import { MdPerson, MdSettings, MdStore } from "react-icons/md";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { setShowParametres } from "../../../Redux/ModalSlice/ModalSlice";
import { RootState } from "../../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import Parametres from "../Modals/Parametres/Parametres";

const Header = () => {
  const showParametres = useSelector(
    (state: RootState) => state.modal.parametres
  );
  const dispatch = useDispatch();
  return (
    <>
      <Navbar />

      <Box
        sx={{
          position: "relative",
          bgcolor: "#f5f5f5",
          pt: 6,
          pb: 8,
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8} display="flex" alignItems="center">
              <MdStore size={32} color="#31aa41" />
              <Typography
                component="h5"
                variant="h5"
                fontWeight="bold"
                sx={{ ml: 1 }}
              >
                Mes Favoris
              </Typography>
            </Grid>
            
          </Grid>

          <Typography color="text.secondary" paragraph sx={{ mt: 2 }}>
            Gérez vos Favoris.
          </Typography>
        </Container>
      </Box>

    </>
  );
};

export default Header;
