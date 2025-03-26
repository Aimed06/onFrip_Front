import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import images from "../../../assets/ass.png";
import { motion } from "framer-motion";

const HeroSection = (): JSX.Element => {
  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#f5f5f5", // Garde la couleur principale
        pt: 4,
        pb: 6,
        overflow: "hidden", // Évite les débordements
      }}
    >
      {/* Effet asymétrique avec un fond coloré sur le côté droit */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40%",
          height: "100%",
          bgcolor: "#e3e3e3", // Un gris légèrement plus foncé
          clipPath: "polygon(100% 0, 100% 100%, 50% 100%)",
          zIndex: 0,
        }}
      />

      {/* Effet de séparation en bas du header */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "60px",
          background: "linear-gradient(to right, #f5f5f5 50%, transparent 100%)",
          clipPath: "polygon(0% 100%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ maxWidth: "100%", textAlign: { xs: "center", md: "left" } }}>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  color="text.primary"
                  sx={{ textShadow: "2px 2px 10px rgba(0,0,0,0.15)", fontWeight:"bold" }} // Effet d'ombre sur le texte
                >
                  OnFrip vous offre la modernité et l'élégance
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                  Achetez, vendez et donnez des vêtements de seconde main.
                </Typography>
              </motion.div>

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <Button component={Link} to="/shop" variant="contained" color="primary" size="large">
                    Achètes un article
                  </Button>
                  <Button component={Link} to="/sell" variant="outlined" color="primary" size="large">
                    Vends tes articles
                  </Button>
                </motion.div>
              </Box>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Box
                  sx={{
                    mt: 4,
                    display: "flex",
                    gap: 3,
                    color: "text.secondary",
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      3K+
                    </Typography>
                    <Typography variant="body2">Clothing Items</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      3K+
                    </Typography>
                    <Typography variant="body2">Fashion Lovers</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      30+
                    </Typography>
                    <Typography variant="body2">Partner Organizations</Typography>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </Grid>

          <Box sx={{ mt: 4, ml: 8 }}>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img
                src={images}
                alt="Image de frip"
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  boxShadow: "4px 4px 10px rgba(0,0,0,0.2)",
                }}
              />
            </motion.div>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
