import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import images from "../../assets/ass.png";
import { motion } from "motion/react";

const HeroSection = (): JSX.Element => {
  return (
    <Box sx={{ position: "relative", bgcolor: "#f5f5f5", pt: 4, pb: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box
              sx={{ maxWidth: "100%", textAlign: { xs: "center", md: "left" } }}
            >
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-5xl font-semibold tracking-tight "
              >
                <Typography component="h2" variant="h2" color="text.primary" >
                  OnFrip vous offre la modernité et l'élégance
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                  Achetez, vendez et donnez des vêtements de seconde main.
                </Typography>{" "}
              </motion.h1>
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
                  <Button
                    component={Link}
                    to="/shop"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Achètes un article
                  </Button>
                  <Button
                    component={Link}
                    to="/sell"
                    variant="outlined"
                    color="primary"
                    size="large"
                  >
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

          <Box
            sx={{
              mt: 4,
              ml: 8,
            }}
          >
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img src={images} />
            </motion.div>
          </Box>
          <Box></Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
