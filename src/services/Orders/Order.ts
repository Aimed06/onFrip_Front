import axios from "axios"
import { store } from "../../Redux/store"
import { setSellerOrders, setUserOrders } from "../../Redux/UserSlice/UserSlice"

// Enum pour les statuts de commande
export enum orderStatus {
  WAITING = 0,
  CONFIRMED = 1,
  REFUSED = 2,
  CANCELED = 3,
}

// Interface pour les commandes
export interface OrderType {
  id: number
  status: orderStatus
  createdAt: string
  price: number
  isPaid: boolean
  user?: {
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
  }[]
}

export class Order {
  // Récupérer les commandes de l'utilisateur connecté
  public static async getUserOrders(): Promise<OrderType[]> {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })

      store.dispatch(setUserOrders(response.data))
      return response.data
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes:", error)
      throw error
    }
  }

  // Créer une nouvelle commande
  public static async createOrder(productIds: number[]): Promise<OrderType> {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        { productIds, isPaid: false },
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      )

      // Mettre à jour les commandes dans le store après création
      this.getUserOrders()
      return response.data
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error)
      throw error
    }
  }

  // Annuler une commande
  public static async cancelOrder(orderId: number): Promise<OrderType> {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
        { status: orderStatus.CANCELED },
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      )

      // Mettre à jour les commandes dans le store après annulation
      this.getUserOrders()
      return response.data
    } catch (error) {
      console.error("Erreur lors de l'annulation de la commande:", error)
      throw error
    }
  }
  // supprimer une commande
  public static async deleteOrder(orderId: number): Promise<OrderType> {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      )

      // Mettre à jour les commandes dans le store après suppression
      this.getUserOrders()
      return response.data
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande:", error)
      throw error
    }
  }

  // Récupérer les commandes pour le vendeur
  public static async getSellerOrders(): Promise<OrderType[]> {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/seller`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })

      store.dispatch(setSellerOrders(response.data))
      return response.data
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes vendeur:", error)
      throw error
    }
  }

   // Mettre à jour le statut d'une commande
  public static async updateOrderStatus(orderId: number, status: orderStatus, reason?: string): Promise<OrderType> {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}/status`,
        { status, reason },
         {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
      )

      // Mettre à jour les commandes dans le store après modification
      this.getSellerOrders()
      return response.data
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut de la commande:", error)
      throw error
    }
  }
}
