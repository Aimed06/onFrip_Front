import { Favoris, Order } from "../../services/User/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {NotificationsTypes} from "../../services/Notification/Notification";
import { Product } from "../../services/Product/Products";
interface UserState {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  verificationStatus: number;
  loggedIn: boolean;
  createdAt: string;
  favoris: Favoris[];
  orders: {
    SCHEDULED: Order[];
    WAITING: Order[];
    CONFIRMED: Order[];
    REFUSED: Order[];
    CANCELED: Order[];
  };
  notifications: {
    notifications: NotificationsTypes[];
    unReadNotifications: number;
  };
  products: Product[];
  showUserProducts: boolean;
}

const initialState: UserState = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  verificationStatus: 2,
  loggedIn: false,
  createdAt: "",
  favoris: [],
  orders: {
    SCHEDULED: [],
    WAITING: [],
    CONFIRMED: [],
    REFUSED: [],
    CANCELED: [],
  },
  notifications: {
    notifications: [],
    unReadNotifications: 0,
  },
  products: [],
  showUserProducts: false,};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;   
      state.phone = action.payload.phone;
      state.verificationStatus = action.payload.verificationStatus;
      state.createdAt = action.payload.createdAt;
    },
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.loggedIn = action.payload;
    },
    setUserProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      if (
        state.products &&
        state.products.length > 0
      ) {
        state.products = state.products.map((product: Product) => {
            if (product.image && !product.image.startsWith("http")) {
              product.image = import.meta.env.VITE_API_URL + "/uploads/" + product.image;
            }
            return product;
          });
      }
    },
    setUserNotifications(state, action: PayloadAction<any>) {
      state.notifications = action.payload;
    },
    setSeenNotification(state, action: PayloadAction<number>) {
      state.notifications.notifications = state.notifications.notifications.map(
        (notification: NotificationsTypes) => {
          if (notification.id === action.payload) {
            return { ...notification, isSeen: true };
          }
          return notification;
        }
      );
    },
    decrementUnReadNotifs(state, action: PayloadAction<number>) {
      state.notifications.unReadNotifications =
        state.notifications.unReadNotifications - action.payload;
    },
    updateNotifications(state, action: PayloadAction<NotificationsTypes>) {
      state.notifications.notifications.unshift(action.payload);
    },
   
    setUserFavoris(state, action: PayloadAction<Favoris[]>) {
      state.favoris = action.payload;
    },
    setUserScheduledOrders(state, action: PayloadAction<Order[]>) {
      state.orders.SCHEDULED = action.payload;
      if (
        state.orders.SCHEDULED &&
        state.orders.SCHEDULED.length > 0
      ) {
        state.orders.SCHEDULED = state.orders.SCHEDULED.map((order: Order) => {
            if (order.product.image && !order.product.image.startsWith("http")) {
              order.product.image = import.meta.env.VITE_API_URL + "/uploads/" + order.product.image;
            }
            return order;
          });
          
      }
    },
    setUserConfirmedOrders(state, action: PayloadAction<Order[]>) {
      state.orders.CONFIRMED = action.payload;
      if (
        state.orders.CONFIRMED &&
        state.orders.CONFIRMED.length > 0
      ) {
        state.orders.CONFIRMED = state.orders.CONFIRMED.map(
          (order: Order) => {
            if (order.product.image && !order.product.image.startsWith("http")) {
                order.product.image = import.meta.env.VITE_API_URL + "/uploads/" + order.product.image;
              }
              return order;
          }
        );
      }
    },
    setUserCanceledOrders(state, action: PayloadAction<Order[]>) {
      state.orders.CANCELED = action.payload;
      if (
        state.orders.CANCELED &&
        state.orders.CANCELED.length > 0
      ) {
        state.orders.CANCELED = state.orders.CANCELED.map(
          (order: Order) => {
            if (order.product.image && !order.product.image.startsWith("http")) {
                order.product.image = import.meta.env.VITE_API_URL + "/uploads/" + order.product.image;
              }
              return order;
          }
        );
      }
    },
    setUserRefusedOrders(state, action: PayloadAction<Order[]>) {
      state.orders.REFUSED = action.payload;
      if (state.orders.REFUSED && state.orders.REFUSED.length > 0) {
        state.orders.REFUSED = state.orders.REFUSED.map(
          (order: Order) => {
            if (order.product.image && !order.product.image.startsWith("http")) {
                order.product.image = import.meta.env.VITE_API_URL + "/uploads/" + order.product.image;
              }
              return order;
          }
        );
      }
    },
    setUserWaitingOrders(state, action: PayloadAction<Order[]>) {
      state.orders.WAITING = action.payload;
      if (state.orders.WAITING && state.orders.WAITING.length > 0) {
        state.orders.WAITING = state.orders.WAITING.map(
          (order: Order) => {
            if (order.product.image && !order.product.image.startsWith("http")) {
                order.product.image = import.meta.env.VITE_API_URL + "/uploads/" + order.product.image;
              }
              return order;
          }
        );
      }
    },
    setVerificationStatus(state) {
      state.verificationStatus = 0;
    },
    updateScheduledOrderStatus(state, action: PayloadAction<number>) {
      const reservationIndex = state.orders.SCHEDULED.findIndex(
        (reservation: Order) => reservation.id === action.payload
      );

      if (reservationIndex !== -1) {
        // Retirer la réservation de la liste SCHEDULED
        const canceledOrder = state.orders.SCHEDULED.splice(
          reservationIndex,
          1
        )[0];

        // Mettre à jour le statut de la réservation à 3
        canceledOrder.status = 3;

        // Ajouter la réservation annulée à la liste CANCELED
        state.orders.CANCELED.push(canceledOrder);
      }
    },
    updateScheduledOrdersPayment(state, action: PayloadAction<number>) {
      const reservationIndex = state.orders.SCHEDULED.findIndex(
        (reservation: Order) => reservation.id === action.payload
      );

      if (reservationIndex !== -1) {
        const updatedOrder = {
          ...state.orders.SCHEDULED[reservationIndex],
        };
        updatedOrder.isPaid = true;
        const updatedScheduled = [...state.orders.SCHEDULED];
        updatedScheduled[reservationIndex] = updatedOrder;
        state.orders.SCHEDULED = updatedScheduled;
      }
    },
    setDeleteProduct(state, action: PayloadAction<number>) {
      const productIdToDelete = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productIdToDelete
      );
    },
    setShowUserProducts(state, action: PayloadAction<boolean>) {
      state.showUserProducts = action.payload;
    }
  },
  },
);

export const {
  setUser,
  setLoggedIn,
  
  setUserFavoris,
  updateScheduledOrderStatus,
  setUserScheduledOrders,
  setUserConfirmedOrders,
  setUserCanceledOrders,
  setUserRefusedOrders,
  setUserWaitingOrders,
  setVerificationStatus,
  updateScheduledOrdersPayment,
  setUserNotifications,
  setSeenNotification,
  decrementUnReadNotifs,
  updateNotifications,
  setUserProducts,
  setDeleteProduct,
  setShowUserProducts,
} = userSlice.actions;
export default userSlice.reducer;
