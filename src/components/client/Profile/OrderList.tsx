
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
} from "@mui/material"
import {
  MdExpandMore,
  MdExpandLess,
  MdShoppingBag,
  MdCalendarToday,
  MdAttachMoney,
  MdLocalShipping,
} from "react-icons/md"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useSelector } from "react-redux"
import type { RootState } from "../../../Redux/store"
import { Order, orderStatus } from "../../../services/Orders/Order"

// Type pour les commandes
interface OrderItem {
  id: number
  status: orderStatus
  createdAt: string
  price: number
  isPaid: boolean
  products: {
    id: number
    name: string
    price: number
    image: string
  }[]
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

const OrderList: React.FC = () => {
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null)

  // Récupérer les commandes de l'utilisateur
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const response = await Order.getUserOrders()
        setOrders(response)
        setError(null)
      } catch (err) {
        console.error("Erreur lors du chargement des commandes:", err)
        setError("Impossible de charger vos commandes. Veuillez réessayer.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleExpandOrder = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "dd MMMM yyyy à HH:mm", { locale: fr })
  }

  const handleCancelOrder = async (orderId: number) => {
    try {
        const response = await Order.cancelOrder(orderId)
        if (response) {
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId))
            setError(null)
        } else {
            setError("Erreur lors de l'annulation de la commande.")
        }
        } catch (err) {
        console.error("Erreur lors de l'annulation de la commande:", err)
        setError("Impossible d'annuler la commande. Veuillez réessayer.")
        }
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
          Vos commandes apparaîtront ici une fois que vous aurez effectué un achat.
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Historique de vos commandes
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
                <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
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
                    {order.products.length} {order.products.length > 1 ? "articles" : "article"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: { xs: "flex-start", sm: "flex-end" } }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
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
                      <Typography variant="body2" color="text.secondary">
                        {product.price} Dinars
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <MdLocalShipping size={20} color={theme.palette.text.secondary} />
                    <Typography variant="body2" color="text.secondary">
                      Statut de livraison: {order.status === orderStatus.CONFIRMED ? "En cours" : "En attente"}
                    </Typography>
                  </Box>
                  {order.status === orderStatus.WAITING && (
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Annuler la commande
                    </Button>
                  )}
                </Box>
              </Box>
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default OrderList
