import { useState, useEffect, useRef } from "react";
import { MdPerson, MdArrowDropDown, MdAccountCircle, MdNotifications } from "react-icons/md";
import Badge from "@mui/material/Badge";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowSignUp } from "../../../Redux/ModalSlice/ModalSlice";
import { RootState } from "../../../Redux/store";
import { showLoader } from "../../../Redux/LoaderSlice/LoaderSlice";
import OTP from "./Modals/OTP/Otp";
import SignUp from "./Modals/SignUp";
import EndSignUp from "./Modals/EndSignUp";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaListAlt } from "react-icons/fa";
import { decrementUnReadNotifs,setLoggedIn } from "../../../Redux/UserSlice/UserSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Authentification } from "../../../services/Authentification/Authentification";
import { Product } from "../../../services/Product/Products";

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
import { setShowNotifications } from "../../../Redux/NotificationSlice/NotificationSlice";
import NotificationsContainer from "../Common/Notifications/NotificationsContainer";
import SellProductModal from "../Modals/SellProduct/SellProduct";

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



const Navbar = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const { signUp, Otp, registration } = useSelector((state: RootState) => state.modal);
  const user = useSelector((state: RootState) => state.user);
  const notifications = useSelector((state: RootState) => state.user.notifications.notifications);
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const showNotifications = useSelector((state: RootState) => state.Notifications.showNotifications);
  const nbOfNotifNotSeen = useSelector((state: RootState) => state.user.notifications.unReadNotifications);
  
    const [openModal, setOpenModal] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

   const handleSellProduct = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };
  
    const handleProductSubmit = (newProduct: Product) => {
      setProducts((prev) => [newProduct, ...prev]);
      setOpenModal(false);
    };

  const dropDownRef = useRef<HTMLDivElement>(null);
  const toggleNavbar = (): void => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown = (): void => {
    setDropdownOpen(!dropdownOpen);
  };

  const fetchData = async () => {
    await Authentification.setSession();
    setTimeout(() => {
      dispatch(showLoader(false));
    }, 1000);
  };

  useEffect(() => {
    fetchData();
    const handleClickDropDown = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node) &&
        event.target instanceof HTMLElement &&
        !event.target.classList.contains("user-dropdown")
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickDropDown);
    return () => {
      document.removeEventListener("mousedown", handleClickDropDown);
    };
  }, []);
  
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] =  useState<boolean>(false);
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSeenNotification = (id: number) => {

    dispatch(decrementUnReadNotifs(1));
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
  const [openSignUp, setOpenSignUp] = useState(false);
 
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
            to="/#categories"
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary="Categories" />
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
              color: "#4f925b",
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
            onClick={handleSellProduct}
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
            to="/#categories"
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
        {isLoggedIn ? (
          <>
          <div className="h-11 w-[1.5px] bg-divider"></div>
                    <div className="relative">
                      <div
                        className="w-16 h-8 relative"
                        onClick={() => dispatch(setShowNotifications(!showNotifications))}
                      >
                        <Badge
                          sx={{
                            "& .MuiBadge-badge": {
                              backgroundColor: "#EA4545",
                              right: "4px",
                              top: 0,
                            },
                          }}
                          badgeContent={nbOfNotifNotSeen}
                        >
                          <MdNotifications className="w-full h-full text-text-primary hover:cursor-pointer" size={32} />
                        </Badge>
                      </div>
                      {showNotifications && (
                        <NotificationsContainer
                          notifications={notifications}
                          handleSeenNotification={handleSeenNotification}
                        />
                      )}
                    </div>
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
        {user.firstName +"  "+user.lastName}
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
          component={RouterLink}
          to="/"
          onClick={() => {
            localStorage.removeItem("token");
            dispatch(setLoggedIn(false));
          }}
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
              onClick={() => dispatch(setShowSignUp(true))}
              variant="outlined"
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
              onClick={() => dispatch(setShowSignUp(true))}
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
      <GoogleOAuthProvider clientId="914924490739-9442gj3hf1kgbsuothop40rsf803f3d9.apps.googleusercontent.com">
        {signUp.show && <SignUp />}
        {Otp.show && <OTP />}
        {registration && <EndSignUp />}
      </GoogleOAuthProvider>
      
        <SellProductModal
              open={openModal}
              onClose={handleModalClose}
              onSubmit={handleProductSubmit}
            />
    </AppBar>
  );
  
};

export default Navbar;
