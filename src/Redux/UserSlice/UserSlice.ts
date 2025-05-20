import { Favoris, Order } from "../../services/User/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {NotificationsTypes} from "../../services/Notification/Notification";
import { Product } from "../../services/Product/Products";
import { OrderType } from "../../services/Orders/Order";
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
  cart: any[];
  orders: OrderType[];
  sellerOrders: OrderType[];

  
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
  cart: [],
 orders: [],
  sellerOrders: [],
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
    setUserCart: (state, action: PayloadAction<any[]>) => {
      state.cart = action.payload;
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
      setUserOrders: (state, action: PayloadAction<OrderType[]>) => {
      state.orders = action.payload
    },
     setSellerOrders: (state, action: PayloadAction<OrderType[]>) => {
      state.sellerOrders = action.payload
    },
    setVerificationStatus(state) {
      state.verificationStatus = 0;
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
  setSellerOrders,
  setUserFavoris,
  setUserOrders,
  setVerificationStatus,
  setUserNotifications,
  setSeenNotification,
  decrementUnReadNotifs,
  updateNotifications,
  setUserProducts,
  setDeleteProduct,
  setShowUserProducts,
  setUserCart
} = userSlice.actions;
export default userSlice.reducer;
