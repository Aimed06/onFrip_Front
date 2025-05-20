"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container, Grid, Paper, Box, Tabs, Tab, ThemeProvider, createTheme, alpha, useMediaQuery } from "@mui/material"
import { MdShoppingCart, MdStore, MdHistory, MdShoppingBasket, MdLocalShipping } from "react-icons/md"

import UserBar from "../components/client/Profile/userBar"
import Footer from "../components/client/home/Footer"
import ProductList from "../components/client/Profile/ProductList"
import Header from "../components/client/Profile/Header"
import Identite from "../components/client/Modals/VerificationStatus/VerificationStatus"
import type { Product } from "../services/Product/Products"
import type { RootState } from "../Redux/store"
import { setShowDetail } from "../Redux/ModalSlice/ModalSlice"
import CartList from "../components/client/CartList"
import OrderList from "../components/client/Profile/OrderList"
import SellerOrderList from "../components/client/Profile/SellerOrderList"

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3fa351", // Indigo as primary color
      light: "#2cb63c",
      dark: "#002984",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057", // Pink as secondary color
      light: "#ff4081",
      dark: "#c51162",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 64,
          fontWeight: 500,
          "&.Mui-selected": {
            color: "#36cb5b",
          },
        },
      },
    },
  },
})

const Profile = () => {
  const [tab, setTab] = useState(0) // 0: Mon Panier, 1: Historique
  const [subTab, setSubTab] = useState(0) // 0: Achats, 1: Ventes, 2: Commandes à traiter
  const [productSelected, setProductSelected] = useState<Product | null>(null)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const showIdentite = useSelector((state: RootState) => state.modal.identite)
  const showDetail = useSelector((state: RootState) => state.modal.detail)

  const dispatch = useDispatch()

  const handleOpenDetail = (product: Product) => {
    setProductSelected(product)
    dispatch(setShowDetail(true))
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />

        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Grid container spacing={4}>
            {/* Sidebar */}
            <Grid item xs={12} md={3}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  p: 3,
                  transition: "all 0.3s ease",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.15)}`,
                  },
                  position: "sticky",
                  top: 20,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 2,
                  }}
                ></Box>
                <UserBar />
              </Paper>
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} md={9}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  "&:hover": {
                    boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.15)}`,
                  },
                }}
              >
                {/* Main Tabs */}
                <Tabs
                  value={tab}
                  onChange={(e, newValue) => setTab(newValue)}
                  variant={isMobile ? "fullWidth" : "standard"}
                  centered
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    "& .MuiTabs-indicator": {
                      height: 3,
                      borderRadius: "3px 3px 0 0",
                    },
                  }}
                >
                  <Tab
                    icon={<MdShoppingBasket size={24} />}
                    label="Mon Panier"
                    sx={{
                      py: 2,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                      "& .MuiTab-iconWrapper": {
                        marginBottom: "0 !important",
                        marginRight: 1,
                      },
                    }}
                  />
                  <Tab
                    icon={<MdHistory size={24} />}
                    label="Historique"
                    sx={{
                      py: 2,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                      "& .MuiTab-iconWrapper": {
                        marginBottom: "0 !important",
                        marginRight: 1,
                      },
                    }}
                  />
                </Tabs>

                <Box sx={{ p: { xs: 2, md: 4 } }}>
                  {/* Mon Panier */}
                  {tab === 0 && (
                    <Box>
                      <CartList />
                    </Box>
                  )}

                  {/* Historique avec sous-tabs */}
                  {tab === 1 && (
                    <>
                      <Tabs
                        value={subTab}
                        onChange={(e, newValue) => setSubTab(newValue)}
                        variant={isMobile ? "scrollable" : "standard"}
                        scrollButtons={isMobile ? "auto" : false}
                        centered={!isMobile}
                        sx={{
                          mb: 3,
                          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                          "& .MuiTabs-indicator": {
                            height: 2,
                          },
                        }}
                      >
                        <Tab
                          icon={<MdShoppingCart size={20} />}
                          label="Mes Achats"
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1,
                            "& .MuiTab-iconWrapper": {
                              marginBottom: "0 !important",
                              marginRight: 1,
                            },
                          }}
                        />
                        <Tab
                          icon={<MdStore size={20} />}
                          label="Mes Ventes"
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1,
                            "& .MuiTab-iconWrapper": {
                              marginBottom: "0 !important",
                              marginRight: 1,
                            },
                          }}
                        />
                        <Tab
                          icon={<MdLocalShipping size={20} />}
                          label="Commandes à traiter"
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1,
                            "& .MuiTab-iconWrapper": {
                              marginBottom: "0 !important",
                              marginRight: 1,
                            },
                          }}
                        />
                      </Tabs>

                      {subTab === 0 && (
                        <Box>
                          <OrderList />
                        </Box>
                      )}

                      {subTab === 1 && (
                        <Box
                          sx={{
                            bgcolor: "background.paper",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <ProductList selectedProduct={productSelected} onOpenDetail={handleOpenDetail} />
                        </Box>
                      )}

                      {subTab === 2 && (
                        <Box>
                          <SellerOrderList />
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {showIdentite && <Identite />}

        <Box sx={{ mt: "auto" }}>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Profile
