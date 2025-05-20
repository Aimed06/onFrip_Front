// pages/SearchPage.tsx
import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import Navbar from "../components/client/home/Navbar";
import Header from "../components/client/search/Header";
import SearchFilter from "../components/client/search/Filtre";
import ProductsSearch from "../components/client/home/SearchCard";
import Footer from "../components/client/home/Footer";

interface Filters {
  searchTerm: string;
  category: string | number;
  priceRange: [number, number];
}

const SearchPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    category: "Tous",
    priceRange: [0, 500],
  });

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

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
          <Grid item xs={12} md={3} ml={13} >
            <SearchFilter onFilterChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} md={8}>
            <ProductsSearch filters={filters} />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default SearchPage;