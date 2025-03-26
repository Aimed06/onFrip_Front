import React, { useState } from "react";
import { Box, TextField, MenuItem, Button, Slider, Typography, FormControlLabel, Checkbox } from "@mui/material";

interface FilterProps {
  onFilterChange: (filters: Filters) => void;
}

interface Filters {
  searchTerm: string;
  categories: string[];
  priceRange: [number, number];
}

const categories = ["T-shirts", "Hauts et chemisiers", "Pantalons & Jeans", "Vêtements extérieurs", "Lunettes"];

const SearchFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    categories: [],
    priceRange: [0, 500],
  });

  const handleChange = (key: keyof Filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <Box sx={{ width: 280, p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      
      {/* Champ de recherche */}
      <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Rechercher</Typography>
        <TextField
          label="Rechercher un produit"
          variant="outlined"
          size="small"
          fullWidth
          value={filters.searchTerm}
          onChange={(e) => handleChange("searchTerm", e.target.value)}
        />
      </Box>
      <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Prix</Typography>
        <Typography variant="body2">De {filters.priceRange[0]}€ à {filters.priceRange[1]}€</Typography>
        <Slider
          value={filters.priceRange}
          onChange={(_, value) => handleChange("priceRange", value)}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
      </Box>

      {/* Filtre par catégorie */}
      <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Catégories</Typography>
        {categories.map((cat) => (
          <FormControlLabel
            key={cat}
            control={
              <Checkbox
                checked={filters.categories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
            }
            label={cat}
          />
        ))}
      </Box>

      {/* Filtre par prix */}

      {/* Bouton Appliquer */}
      <Button variant="contained" color="primary" onClick={handleApplyFilters}>
        Appliquer les filtres
      </Button>

    </Box>
  );
};

export default SearchFilter;
