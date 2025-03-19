"use client"

import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
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
} from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import RecyclingIcon from "@mui/icons-material/Recycling"
import type React from "react"

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
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

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
}))

const Navbar = (): JSX.Element => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const categories: string[] = [
    "Tops & Blouses",
    "Pants & Jeans",
    "Dresses & Skirts",
    "Outerwear",
    "Accessories",
    "Shoes",
  ]

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
        <RecyclingIcon />
        OnFrip
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/shop" sx={{ textAlign: "center" }}>
            <ListItemText primary="Shop" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/sell" sx={{ textAlign: "center" }}>
            <ListItemText primary="Sell" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/categories" sx={{ textAlign: "center" }}>
            <ListItemText primary="Categories" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/partners" sx={{ textAlign: "center" }}>
            <ListItemText primary="Our Partners" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/about" sx={{ textAlign: "center" }}>
            <ListItemText primary="About Us" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ width: "100vw",bgcolor: "#f5f5f5" }}>
  <Toolbar disableGutters sx={{ width: "100%", px: 2 }}>

          {/* Mobile menu icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <RouterLink
            to="/"
            style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}
          >
            <RecyclingIcon sx={{ display: "flex", mr: 1, ml:15 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", sm: "flex" },
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              OnFrip
            </Typography>
          </RouterLink>

          {/* Desktop navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button component={RouterLink} to="/shop" sx={{ my: 2, color: "inherit", display: "block" }}>
              Acheter
            </Button>
            <Button component={RouterLink} to="/sell" sx={{ my: 2, color: "inherit", display: "block" }}>
              Vendre
            </Button>
            <Button component={RouterLink} to="/categories" sx={{ my: 2, color: "inherit", display: "block" }}>
              Categories
            </Button>
            <Button component={RouterLink} to="/partners" sx={{ my: 2, color: "inherit", display: "block" }}>
              Nos partenaires
            </Button>
          </Box>

          {/* Search */}
          <Search
          sx={{backgroundColor:"#ffffff"  ,"&:hover": {backgroundColor:"#ffffff"} ,borderRadius:"50px"}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search>


          {/* Login button (desktop only) */}
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
              "&:hover": { backgroundColor: "#244829",color: "#ffffff" } // Couleur de fond au survol
            }}
          >
            Se connecter
          </Button>
          <Button
            
            component={RouterLink}
            to="/login"
            variant="contained"
          
            sx={{ mr: 18, display: { xs: "none", md: "flex" },color :"#fffff", borderRadius: "50px",
            fontWeight: "bold", // Rend le texte plus gras
            // Change la police
            fontSize: "16px", // Ajuste la taille du texte
            textTransform: "none",
             "&:hover": { backgroundColor:"#ffffff",color: "green"  }  }}
          >
            S'inscrire
          </Button>
        </Toolbar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  )
}

export default Navbar

