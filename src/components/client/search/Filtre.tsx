import React, { useState, useEffect } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Slider, 
  Typography, 
  FormControlLabel, 
  Checkbox,
  CircularProgress,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Divider
} from "@mui/material";
import { CategoryService } from "../../../services/Category/Category";

interface FilterProps {
  onFilterChange: (filters: Filters) => void;
}

interface Filters {
  searchTerm: string;
  category: string | number;
  priceRange: [number, number];
}

interface Category {
  id: number | string;
  name: string;
}

const SearchFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    category: "Tous",
    priceRange: [0, 5000],
  });
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyButtonActive, setApplyButtonActive] = useState(false);

  // Charger les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await CategoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Erreur lors du chargement des catégories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Mettre à jour les filtres localement
  const handleChange = (key: keyof Filters, value: any) => {
    if (key === "priceRange") {
      // S'assurer que priceRange est bien un tuple [number, number]
      const priceRangeValue = Array.isArray(value) && value.length >= 2 
        ? [value[0], value[1]] as [number, number]
        : [0, 5000] as [number, number];
      
      setFilters(prev => ({ ...prev, [key]: priceRangeValue }));
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
    setApplyButtonActive(true);
  };

  // Appliquer les filtres
  const handleApplyFilters = () => {
    onFilterChange(filters);
    setApplyButtonActive(false);
  };

  // Réinitialiser les filtres
  const handleResetFilters = () => {
    const resetFilters: Filters = {
      searchTerm: "",
      category: "Tous",
      priceRange: [0, 500],
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
    setApplyButtonActive(false);
  };

  return (
    <Box sx={{ 
      width: "100%", 
      p: 3, 
      bgcolor: "white", 
      borderRadius: 2, 
      boxShadow: 2, 
      display: "flex", 
      flexDirection: "column", 
      gap: 2 
    }}>
      
      {/* Titre du filtre */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
        Filtres
      </Typography>
      
      <Divider />
      
      {/* Champ de recherche */}
      <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Rechercher</Typography>
        <TextField
          label="Nom du produit"
          variant="outlined"
          size="small"
          fullWidth
          value={filters.searchTerm}
          onChange={(e) => handleChange("searchTerm", e.target.value)}
        />
      </Box>

      {/* Filtre par prix */}
      <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Prix</Typography>
        <Typography variant="body2">
          De {filters.priceRange[0]} Dinars à {filters.priceRange[1]} Dinars
        </Typography>
        <Slider
          value={filters.priceRange}
          onChange={(_, value) => {
            // Assurer que value est bien un tuple [number, number]
            const priceRangeValue = Array.isArray(value) 
              ? [value[0], value[1]] as [number, number]
              : [0, 500] as [number, number];
            
            handleChange("priceRange", priceRangeValue);
          }}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
          step={10}
        />
      </Box>

      {/* Filtre par catégorie */}
      <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Catégories</Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <FormControl fullWidth size="small">
            <Select
              value={filters.category}
              onChange={(e) => handleChange("category", e.target.value)}
              displayEmpty
              MenuProps={
                {
                  PaperProps: {
                    sx: {
                      zIndex: 9999,
                     maxHeight: 500
                     
                    },
                  },
                }
              }
            >
              <MenuItem value="Tous">Toutes les catégories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      {/* Boutons d'action */}
      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={handleResetFilters}
        >
          Réinitialiser
        </Button>
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={handleApplyFilters}
          disabled={!applyButtonActive}
        >
          Appliquer
        </Button>
      </Box>
    </Box>
  );
};

export default SearchFilter;