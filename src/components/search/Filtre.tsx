import React, { useState } from "react";
import { Box, TextField, MenuItem, Button, Slider, Typography } from "@mui/material";

interface FilterProps {
  onFilterChange: (filters: Filters) => void;
}

interface Filters {
  searchTerm: string;
  category: string;
  priceRange: [number,number];
}

const categories = ["Tous", "T-shirts", "Hauts et chemisiers", "Pantalons & Jeans", "Vetement extérieurs", "lunettes"];

const SearchFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    category: "Tous",
    priceRange: [0, 500],
  });

  const handleChange = (key: keyof Filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <Box
      sx={{
        width: 250,
        p: 3,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Champ de recherche */}
      <TextField
        label="Rechercher"
        variant="outlined"
        size="small"
        fullWidth
        value={filters.searchTerm}
        onChange={(e) => handleChange("searchTerm", e.target.value)}
      />

      {/* Filtre par catégorie */}
      <TextField
        select
        label="Catégorie"
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
        fullWidth
        size="small"
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      {/* Filtre par prix */}
      <Box>
        <Typography variant="body2">Prix : {filters.priceRange[0]}€ - {filters.priceRange[1]}€</Typography>
        <Slider
          value={filters.priceRange}
          onChange={(_, value) => handleChange("priceRange", value)}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
      </Box>

      {/* Bouton Appliquer */}
      <Button variant="contained" color="primary" onClick={handleApplyFilters}>
        Appliquer les filtres
      </Button>
    </Box>
  );
};

export default SearchFilter;
