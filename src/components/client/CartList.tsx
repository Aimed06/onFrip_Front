"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Divider,
  Stack,
  alpha,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material"
import { MdDelete, MdShoppingCart } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { User } from "../../services/User/User"
import type { RootState } from "../../Redux/store"
import PaymentModal from "../../components/client/Modals/Paiement/Paiement"

const CartList: React.FC = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)

  const cartItems = useSelector((state: RootState) => state.user.cart || [])

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true)
        await User.getUserCart()
        setError(null)
      } catch (err) {
        setError("Impossible de charger votre panier. Veuillez réessayer.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [dispatch])


  const handleRemoveItem = async (productId: number) => {
    try {
      await User.removeProductFromCart(productId)
    } catch (err) {
      console.error("Erreur lors de la suppression du produit:", err)
    }
  }

  const handleClearCart = async () => {
    try {
      await User.clearCart()
    } catch (err) {
      console.error("Erreur lors de la suppression du panier:", err)
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      total += Number.parseInt(item.product.price)
      return total
    }, 0)
  }

  const getImageUrl = (image: string) => {
    if (image.startsWith("http")) return image
    return `${import.meta.env.VITE_API_URL}/uploads/${image}`
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )
  }

  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          textAlign: "center",
        }}
      >
        <MdShoppingCart size={60} color={theme.palette.primary.main} />
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
          Votre panier est vide
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ajoutez des produits à votre panier pour les retrouver ici.
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Mon Panier ({cartItems.length} {cartItems.length > 1 ? "articles" : "article"})
        </Typography>
        <Button variant="outlined" color="error" size="small" startIcon={<MdDelete />} onClick={handleClearCart}>
          Vider le panier
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Card
              key={item.productId}
              sx={{
                mb: 2,
                display: "flex",
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 140, height: 180, objectFit: "cover" }}
                image={getImageUrl(item.product.image)}
                alt={item.product.name}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  border: "1px solid rgba(63, 163, 81, 0.1)",
                  borderRadius: 3,
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.05)",
                  p: 2.5,
                  bgcolor: "#fff",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 20px rgba(63, 163, 81, 0.15)",
                    borderColor: "rgba(63, 163, 81, 0.3)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background: "linear-gradient(90deg, #3fa351, #2cb63c)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  },
                  "&:hover::before": {
                    opacity: 1,
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    p: 0,
                    position: "relative",
                    "&:last-child": {
                      paddingBottom: 0,
                    },
                  }}
                >
                  {/* IconButton stylisé */}
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveItem(item.productId)}
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8, // Déplacé à droite pour un meilleur équilibre visuel
                      m: 1,
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "rgba(244, 67, 54, 0.1)",
                        transform: "scale(1.1)",
                      },
                      zIndex: 2,
                    }}
                  >
                    <MdDelete />
                  </IconButton>

                  {/* Contenu du produit avec meilleur espacement */}
                  <Box sx={{ mt: 1, mb: 1 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                      sx={{
                        fontSize: "1.1rem",
                        color: "#333",
                        lineHeight: 1.3,
                        mb: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.product.name}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        pb: 2,
                        borderBottom: "1px dashed rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Box
                        sx={{
                          display: "inline-block",
                          px: 1.5,
                          py: 0.5,
                          bgcolor: "rgba(63, 163, 81, 0.1)",
                          borderRadius: 10,
                          fontSize: "0.75rem",
                          color: "#3fa351",
                          fontWeight: 500,
                        }}
                      >
                        {item.product.category?.id || "Non catégorisé"}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="bold"
                        sx={{
                          fontSize: "1.25rem",
                          display: "flex",
                          alignItems: "center",
                          "& .currency": {
                            fontSize: "0.8rem",
                            opacity: 0.8,
                            ml: 0.5,
                          },
                        }}
                      >
                        {item.product.price} <span className="currency">Dinars</span>
                      </Typography>

                      {/* Ajout d'un badge de quantité */}
                    </Box>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Résumé de la commande
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Stack spacing={2}>
              {cartItems.map((item) => (
                <Box key={item.productId} sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">{item.product.name}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {item.product.price} Dinars
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                {calculateTotal()} Dinars
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => setPaymentModalOpen(true)}
              sx={{
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 2,
                boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
              }}
            >
              Passer la commande
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* Modal de paiement */}
      <PaymentModal open={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} totalAmount={calculateTotal()} />
    </Box>
  )
}

export default CartList
