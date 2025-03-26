import { useState, useEffect } from "react";
import { MdPerson, MdArrowDropDown } from "react-icons/md";
import Badge from "@mui/material/Badge";
import { Link as RouterLink } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import RecyclingIcon from "@mui/icons-material/Recycling";
import type React from "react";
import { motion } from "framer-motion";

// Styled search component
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const isLogged = true;

const Navbar = (): JSX.Element => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const categories: string[] = [
    "Tops & Blouses",
    "Pants & Jeans",
    "Dresses & Skirts",
    "Outerwear",
    "Accessories",
    "Shoes",
  ];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
 
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <RecyclingIcon />
        OnFrip
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/shop"
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary="Shop" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/sell"
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary="Sell" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/categories"
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary="Categories" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/partners"
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary="Our Partners" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/about"
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary="About Us" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        width: "100vw",
        bgcolor: scrolled ? "#ffffff" : "#f5f5f5",
        height: "85px",
      }}
    >
      <Toolbar disableGutters sx={{ width: "100%", px: 2 }}>
        {/* Logo */}
        <RouterLink
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <RecyclingIcon
            sx={{
              color: "#3b5740",
              display: "flex",
              mr: 1,
              ml: 15,
              fontSize: "30px",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", sm: "flex" },
              fontWeight: 800,
              color: "inherit",
              textDecoration: "none",
              fontSize: "26px",
            }}
          >
            OnFrip
          </Typography>
        </RouterLink>

        {/* Desktop navigation */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Button
            component={RouterLink}
            to="/search"
            sx={{
              my: 2,
              color: "inherit",
              display: "block",
              fontSize: "16px",
              fontWeight: 630,
            }}
          >
            Acheter
          </Button>
          <Button
            component={RouterLink}
            to="/sell"
            sx={{
              my: 2,
              color: "inherit",
              display: "block",
              fontSize: "16px",
              fontWeight: 630,
            }}
          >
            Vendre
          </Button>
          <Button
            component={RouterLink}
            to="/categories"
            sx={{
              my: 2,
              color: "inherit",
              display: "block",
              fontSize: "16px",
              fontWeight: 630,
            }}
          >
            Categories
          </Button>
          <Button
            component={RouterLink}
            to="/partners"
            sx={{
              my: 2,
              color: "inherit",
              display: "block",
              fontSize: "16px",
              fontWeight: 630,
            }}
          >
            Nos partenaires
          </Button>
        </Box>

        {/* Search */}
        <Search
          sx={{
            backgroundColor: "#ffffff",
            "&:hover": { backgroundColor: "#ffffff" },
            borderRadius: "50px",
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        {isLogged ? (
          <>
            <Button
        onClick={handleClick}
        variant="outlined"
        sx={{
          mr:18,
          px: 2,
          py: 1,
          borderRadius: "50px",
          backgroundColor: "white",
          color: "text.secondary",
          borderColor: "divider",
          fontSize: "16px",
          fontWeight: "bold",
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          "&:hover": {
            cursor: "pointer",
            borderColor: "#4f7668ff",
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <Badge
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          color="success"
        >
          <Avatar
            sx={{
              bgcolor: "#527854",
              width: 30,
              height: 30,
              fontSize: 16,
              letterSpacing: 0.5,
            }}
          >
            <MdPerson size={20} />
          </Avatar>
        </Badge>
        Aimed Rabahi
        <MdArrowDropDown size={22} />
      </Button>

      {/* Menu déroulant */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ mt: 1 }}
        MenuListProps={{
          sx: {
            bgcolor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            minWidth: "200px",
            p: 1,
          },
        }}
      >
        <MenuItem component={RouterLink} to="/account" onClick={handleClose}>
          Mon compte
        </MenuItem>
        <MenuItem component={RouterLink} to="/favorites" onClick={handleClose}>
          Favoris
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleClose}
          sx={{
            color: "red",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#ffebeb" },
          }}
        >
          Déconnexion
        </MenuItem>
      </Menu>
          </>
        ) : (
          <>
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                borderRadius: "50px", // Rend le bouton rond
                backgroundColor: "#ffffff",
                fontWeight: "bold", // Rend le texte plus gras
                // Change la police
                fontSize: "16px", // Ajuste la taille du texte
                textTransform: "none",

                color: "green", // Texte en vert
                "&:hover": { backgroundColor: "#95d69e", color: "#ffffff" }, // Couleur de fond au survol
              }}
            >
              Se connecter
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              sx={{
                mr: 18,
                display: { xs: "none", md: "flex" },
                color: "#fffff",
                borderRadius: "50px",
                fontWeight: "bold", // Rend le texte plus gras
                // Change la police
                fontSize: "16px", // Ajuste la taille du texte
                textTransform: "none",
                "&:hover": { backgroundColor: "#ffffff", color: "green" },
              }}
            >
              S'inscrire
            </Button>
          </>
        )}

        {/* Login button (desktop only) */}
      </Toolbar>

    </AppBar>
  );
};

export default Navbar;
