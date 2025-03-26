import Navbar from "../components/client/home/Navbar"
import HeroSection from "../components/client/home/HeroSection"
import FeaturedProducts from "../components/client/home/FeaturedProducts"
import CategorySection from "../components/client/home/CategorySection"
import HowItWorks from "../components/client/home/HowItWorks"
import PartnersSection from "../components/client/home/PartnersSection"
import Footer from "../components/client/home/Footer"
import { Box, Button, Container, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const HomePage = (): JSX.Element => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh",pl:-7 }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroSection />
        <FeaturedProducts />
        <CategorySection />
        <HowItWorks />
        <PartnersSection />

        {/* Call to Action Section */}
        <Container sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
          Prêt à rejoindre notre communauté ?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: "700px", mx: "auto" }}>
          Commencez à acheter, vendre et faire la différence dès aujourd'hui. Rejoignez des milliers d'utilisateurs déjà engagés dans notre marketplace.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "center" }}>
            <Button component={Link} to="/signup" variant="contained" color="primary" size="large">
            Inscrivez-vous maintenant
            </Button>
            <Button component={Link} to="/about" variant="outlined" color="primary" size="large">
            En savoir plus
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default HomePage

