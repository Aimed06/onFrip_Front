import Navbar from "../components/client/home/Navbar";
import Header from "../components/client/search/Header";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import SearchFilter from "../components/client/search/Filtre";
import FeaturedProducts from "../components/client/home/FeaturedProducts";
import React, { useState } from "react";
import Products from "../components/client/home/SearchCard";
import Footer from "../components/client/home/Footer";

interface Filters {
  searchTerm: string;
  category: string;
  priceRange: [number, number]; // Tuple avec deux nombres
}

const SearchPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    category: "Tous",
    priceRange: [0, 500],
  });

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
        <Header />
        <Grid container spacing={1} sx={{ p: 2.5 }}>
          <Grid item xs={12} md={3} ml={13} mr={-2}  >
            <SearchFilter onFilterChange={setFilters}  />
          </Grid>
          <Grid item xs={12} md={8}>
            
            <Products itemsPerRow={3}/>
          </Grid>
        </Grid>
      </Box>
      <Footer/>
    </Box>
  );
};
export default SearchPage;
