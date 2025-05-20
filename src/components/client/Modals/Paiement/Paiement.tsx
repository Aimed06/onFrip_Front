"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  CircularProgress,
  Paper,
  useTheme,
  alpha,
} from "@mui/material"
import { Close as CloseIcon, InsertEmoticon, Payment as PaymentIcon } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../../Redux/store"
import { User } from "../../../../services/User/User"
import { Order } from "../../../../services/Orders/Order"
import MasterCard from "../../../../assets/Modals/masterCard.svg"
import VisaCard from "../../../../assets/Modals/visaCard.svg"
import Paypal from "../../../../assets/Modals/paypal.svg"
import BaridiMob from "../../../../assets/Modals/baridiMob.svg"

// Images pour les méthodes de paiement
const PAYMENT_METHODS = [
  {
    id: "visa",
    name: "Carte Visa",
    image: VisaCard
  },
  {
    id: "mastercard",
    name: "MasterCard",
    image: MasterCard
  },
  {
    id: "paypal",
    name: "PayPal",
    image: Paypal
  },
  {
    id: "Baridimob",
    name: "BaridiMob",
    image: BaridiMob
  }
]

interface PaymentModalProps {
  open: boolean
  onClose: () => void
  totalAmount: number
}

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose, totalAmount }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [paymentMethod, setPaymentMethod] = useState("visa")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const cart = useSelector((state: RootState) => state.user.cart || [])

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value)
  }

  const handleConfirmPayment = async () => {
    try {
      setIsLoading(true)

      // Récupérer les IDs des produits dans le panier
      const productIds = cart.map((item) => item.productId)

      // Créer la commande avec les articles du panier
      const order = await Order.createOrder(productIds)
      await User.markAsPaid(order.id)

      // Vider le panier après commande réussie
      await User.clearCart()

      // Afficher le message de succès
      setShowSuccess(true)

      // Fermer le modal après 2 secondes
      setTimeout(() => {
        onClose()
        setShowSuccess(false)
      }, 2000)
    } catch (error) {
      console.error("Erreur lors du paiement:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={!isLoading ? onClose : undefined}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          pb: 1,
        }}
      >
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Choisissez votre méthode
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            Méthodes de paiement
          </Typography>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          disabled={isLoading}
          aria-label="close"
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.2),
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {showSuccess ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 4,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: alpha(theme.palette.success.main, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <PaymentIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />
            </Box>
            <Typography variant="h6" align="center" gutterBottom>
              Paiement réussi !
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
              Votre commande a été confirmée et sera traitée prochainement.
            </Typography>
          </Box>
        ) : (
          <RadioGroup
            aria-label="payment-method"
            name="payment-method"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {PAYMENT_METHODS.map((method) => (
                <Paper
                  key={method.id}
                  elevation={0}
                  sx={{
                    border: `1px solid ${
                      paymentMethod === method.id ? theme.palette.primary.main : alpha(theme.palette.divider, 0.8)
                    }`,
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                      bgcolor: alpha(theme.palette.primary.main, 0.02),
                    },
                  }}
                >
                  <FormControlLabel
                    value={method.id}
                    control={<Radio color="primary" />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 0.5 }}>
                        <Box
                          component="img"
                          src={method.image}
                          alt={method.name}
                          sx={{ width: 48, height: 48, objectFit: "contain" }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 500,
                            color: paymentMethod === method.id ? theme.palette.primary.main : "text.secondary",
                          }}
                        >
                          {method.name}
                        </Typography>
                      </Box>
                    }
                    sx={{
                      mx: 0,
                      width: "100%",
                      "& .MuiFormControlLabel-label": { width: "100%" },
                    }}
                  />
                </Paper>
              ))}
            </Box>
          </RadioGroup>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Montant total
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="primary.main">
              {totalAmount} Dinars
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={isLoading || showSuccess}
            onClick={handleConfirmPayment}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "bold",
              boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Confirmer le paiement"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default PaymentModal
