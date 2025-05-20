"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Button,
  Collapse,
  alpha,
  useTheme,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material"
import {
  MdExpandMore,
  MdExpandLess,
  MdShoppingBag,
  MdCalendarToday,
  MdAttachMoney,
  MdCheck,
  MdClose,
  MdInfo,
} from "react-icons/md"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Order, orderStatus, type OrderType } from "../../../services/Orders/Order"

// Type pour les commandes
interface OrderItem {
  id: number
  status: orderStatus
  createdAt: string
  price: number
  isPaid: boolean
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
    phone?: string
    address?: string
  }
  products: {
    id: number
    name: string
    price: number
    image: string
    quantity: number
  }[]
}

// Type pour les produits dans OrderType
interface ProductType {
  id: number
  name: string
  price: number
  image: string
  quantity?: number
}

const OrderStatusChip = ({ status }: { status: orderStatus }) => {
  const theme = useTheme()

  let color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" = "default"
  let label = "Inconnu"

  switch (status) {
    case orderStatus.WAITING:
      color = "warning"
      label = "En attente"
      break
    case orderStatus.CONFIRMED:
      color = "success"
      label = "Confirmée"
      break
    case orderStatus.REFUSED:
      color = "error"
      label = "Refusée"
      break
    case orderStatus.CANCELED:
      color = "default"
      label = "Annulée"
      break
  }

  return <Chip size="small" color={color} label={label} />
}

const SellerOrderList: React.FC = () => {
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null)
  const [refuseDialogOpen, setRefuseDialogOpen] = useState(false)
  const [refuseReason, setRefuseReason] = useState("")
  const [currentOrderId, setCurrentOrderId] = useState<number | null>(null)

  // Récupérer les commandes pour le vendeur
  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        setLoading(true)
        const response = await Order.getSellerOrders()

        // Transformer les données pour s'assurer qu'elles correspondent au type OrderItem
        const formattedOrders: OrderItem[] = response.map((order: OrderType) => ({
          ...order,
          user: order.user || {
            id: 0,
            firstName: "Client inconnu",
            lastName: "Inconnu",
            email: "email@exemple.com",
          },
          products: order.products.map((product: ProductType) => ({
            ...product,
            quantity: product.quantity || 1,
          })),
        }))

        setOrders(formattedOrders)
        setError(null)
      } catch (err) {
        console.error("Erreur lors du chargement des commandes:", err)
        setError("Impossible de charger les commandes. Veuillez réessayer.")
      } finally {
        setLoading(false)
      }
    }

    fetchSellerOrders()
  }, [])

  const handleExpandOrder = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const handleAcceptOrder = async (orderId: number) => {
    try {
      await Order.updateOrderStatus(orderId, orderStatus.CONFIRMED)
      // Mettre à jour l'état local
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: orderStatus.CONFIRMED } : order)))
    } catch (err) {
      console.error("Erreur lors de l'acceptation de la commande:", err)
      setError("Impossible d'accepter la commande. Veuillez réessayer.")
    }
  }

  const openRefuseDialog = (orderId: number) => {
    setCurrentOrderId(orderId)
    setRefuseDialogOpen(true)
  }

  const handleRefuseOrder = async () => {
    if (currentOrderId === null) return

    try {
      await Order.updateOrderStatus(currentOrderId, orderStatus.REFUSED, refuseReason)
      // Mettre à jour l'état local
      setOrders(
        orders.map((order) => (order.id === currentOrderId ? { ...order, status: orderStatus.REFUSED } : order)),
      )
      setRefuseDialogOpen(false)
      setRefuseReason("")
      setCurrentOrderId(null)
    } catch (err) {
      console.error("Erreur lors du refus de la commande:", err)
      setError("Impossible de refuser la commande. Veuillez réessayer.")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "dd MMMM yyyy à HH:mm", { locale: fr })
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

  if (orders.length === 0) {
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
        <MdShoppingBag size={60} color={theme.palette.primary.main} />
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
          Vous n'avez pas encore de commandes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Les commandes de vos clients apparaîtront ici.
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Commandes à traiter
      </Typography>

      {orders.map((order) => (
        <Card
          key={order.id}
          sx={{
            mb: 3,
            borderRadius: 2,
            overflow: "hidden",
            transition: "all 0.3s ease",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            "&:hover": {
              boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
            },
          }}
        >
          <CardContent sx={{ p: 0 }}>
            {/* En-tête de la commande */}
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Commande #{order.id}
                </Typography>
                <OrderStatusChip status={order.status} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <MdCalendarToday size={16} />
                  {formatDate(order.createdAt)}
                </Typography>
                <IconButton size="small" onClick={() => handleExpandOrder(order.id)}>
                  {expandedOrder === order.id ? <MdExpandLess /> : <MdExpandMore />}
                </IconButton>
              </Box>
            </Box>

            {/* Résumé de la commande */}
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Client: {order.user.firstName} {order.user.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.products.length} {order.products.length > 1 ? "articles" : "article"}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", justifyContent: { xs: "flex-start", sm: "flex-end" } }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <MdAttachMoney size={16} />
                      Total: <span style={{ fontWeight: "bold" }}>{order.price} Dinars</span>
                    </Typography>
                    <Chip
                      size="small"
                      color={order.isPaid ? "success" : "warning"}
                      label={order.isPaid ? "Payée" : "Non payée"}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Détails de la commande (collapsible) */}
            <Collapse in={expandedOrder === order.id}>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Détails de la commande
                </Typography>

                {/* Informations client */}
                <Box
                  sx={{
                    mb: 2,
                    p: 2,
                    bgcolor: alpha(theme.palette.info.main, 0.05),
                    borderRadius: 1,
                    border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <MdInfo size={20} color={theme.palette.info.main} />
                    <Typography variant="subtitle2">Informations client</Typography>
                  </Box>
                  <Typography variant="body2">Nom: {order.user.firstName}  {order.user.lastName}</Typography>
                  <Typography variant="body2">Email: {order.user.email}</Typography>
                  {order.user.phone && <Typography variant="body2">Téléphone: {order.user.phone}</Typography>}
                  {order.user.address && <Typography variant="body2">Adresse: {order.user.address}</Typography>}
                </Box>

                {/* Liste des produits */}
                {order.products.map((product) => (
                  <Box
                    key={product.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      py: 1,
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                    }}
                  >
                    <Box
                      component="img"
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      sx={{ width: 50, height: 50, objectFit: "cover", borderRadius: 1 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {product.name}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" color="text.secondary">
                          {product.price} Dinars x {product.quantity}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {product.price * product.quantity} Dinars
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}

                {/* Actions pour la commande */}
                {order.status === orderStatus.WAITING && (
                  <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<MdClose />}
                      onClick={() => openRefuseDialog(order.id)}
                    >
                      Refuser
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<MdCheck />}
                      onClick={() => handleAcceptOrder(order.id)}
                    >
                      Accepter
                    </Button>
                  </Box>
                )}
              </Box>
            </Collapse>
          </CardContent>
        </Card>
      ))}

      {/* Dialog pour refuser une commande */}
      <Dialog open={refuseDialogOpen} onClose={() => setRefuseDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Refuser la commande</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Veuillez indiquer la raison du refus de cette commande.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Raison du refus"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={refuseReason}
            onChange={(e) => setRefuseReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRefuseDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleRefuseOrder} color="error" variant="contained">
            Refuser la commande
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SellerOrderList
