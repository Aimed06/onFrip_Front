import { JSX, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/client/home/Navbar";
import HeroSection from "../components/client/home/HeroSection";
import FeaturedProducts from "../components/client/home/FeaturedProducts";
import CategorySection from "../components/client/home/CategorySection";
import HowItWorks from "../components/client/home/HowItWorks";
import PartnersSection from "../components/client/home/PartnersSection";
import Footer from "../components/client/home/Footer";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = (): JSX.Element => {
  const categoriesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#categories") {
      categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    if (
      !(window as any).chatbase ||
      (window as any).chatbase("getState") !== "initialized"
    ) {
      const chatbaseFunc: any = (...args: any[]) => {
        if (!(window as any).chatbase.q) {
          (window as any).chatbase.q = [];
        }
        (window as any).chatbase.q.push(args);
      };

      (window as any).chatbase = new Proxy(chatbaseFunc, {
        get(target, prop) {
          if (prop === "q") return target.q;
          return (...args: any[]) => target(prop, ...args);
        },
      });

      const onLoad = () => {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "jdnyZrfbdyHhGN5mCobcw";
        (script as any).domain = "www.chatbase.co";
        document.body.appendChild(script);
      };

      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }

      return () => {
        window.removeEventListener("load", onLoad);
        if ((window as any).chatbase) {
          try {
            (window as any).chatbase("close");
          } catch {}
          delete (window as any).chatbase;
        }
        const script = document.getElementById("jdnyZrfbdyHhGN5mCobcw");
        if (script && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        pl: -7,
      }}
    >
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroSection />
        <FeaturedProducts />
        <div ref={categoriesRef}>
          <CategorySection />
        </div>
        <HowItWorks />
        <PartnersSection />

        <Container sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Prêt à rejoindre notre communauté ?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: "700px", mx: "auto" }}
          >
            Commencez à acheter, vendre et faire la différence dès aujourd'hui.
            Rejoignez des milliers d'utilisateurs déjà engagés dans notre
            marketplace.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              color="primary"
              size="large"
            >
              Inscrivez-vous maintenant
            </Button>
            <Button
              component={Link}
              to="/about"
              variant="outlined"
              color="primary"
              size="large"
            >
              En savoir plus
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
