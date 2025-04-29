import {
    setUser,
    setUserCanceledOrders,
    setUserConfirmedOrders,
    setUserFavoris,
    setUserRefusedOrders,
    setUserScheduledOrders,
    setUserWaitingOrders,
    setVerificationStatus,
  } from "../../Redux/UserSlice/UserSlice";
  import { store } from "../../Redux/store";
  import axios, { AxiosResponse } from "axios";
  import { Product } from "../Product/Products";
import { toast } from "react-toastify";
import { toastParams } from "../../utils/toastParams";
 
  export interface Order {
    id: number;
    status: number;
    createdAt: string;
    user_id: number;
    product_id: number;
    isPaid: boolean;
    totalPrice: number;
    paymentMethod: string;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    product: Product;
  }
  export interface User {
    firstName: string;
    lastName: string;
    phone: string;
  }
  export interface Favoris {
    id: number;
    userId: number;
    productId: number;
    product: Product;
  }
  export class User {
    static async getUserFavoris(): Promise<Favoris[]> {
      try {
        const response: AxiosResponse<Favoris[]> = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/favorites`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        store.dispatch(setUserFavoris(response.data));
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    static async addProductToFav(productId: number): Promise<void> {
      try {
         await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${productId}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
    static async removeProductFromFav(productId: number): Promise<void> {
      try {
         await axios.delete(
          `${import.meta.env.VITE_API_URL}/products/${productId}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
       
      } catch (error) {
        console.log(error);
      }
    }
    static async hotelIsFavorite(productId: number): Promise<Boolean> {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${productId}/isFavorite`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        return response.data.isFavorite;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    static async getUserScheduledOrders(): Promise<void> {
      try {
        const response: AxiosResponse<Order[]> = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders?type=SCHEDULED`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        store.dispatch(setUserScheduledOrders(response.data));
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    static async getUserConfirmedOrders(): Promise<void> {
      try {
        const response: AxiosResponse<Order[]> = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders?type=CONFIRMED`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        store.dispatch(setUserConfirmedOrders(response.data));
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    static async getUserRefusedOrders(): Promise<void> {
      try {
        const response: AxiosResponse<Order[]> = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders?type=REFUSED`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        store.dispatch(setUserRefusedOrders(response.data));
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    static async getUserWaitingOrders(): Promise<void> {
      try {
        const response: AxiosResponse<Order[]> = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders?type=WAITING`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        store.dispatch(setUserWaitingOrders(response.data));
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    static async getUserCanceledOrders(): Promise<void> {
      try {
        const response: AxiosResponse<Order[]> = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders?type=CANCELED`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        store.dispatch(setUserCanceledOrders(response.data));
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    public static async verifyUser(image: File): Promise<void> {
      try {
        const formData = new FormData();
        formData.append("file", image);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/verificationRequests`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.status);
  
        if (response.status === 200) {
          store.dispatch(setVerificationStatus());
          toast.success("Votre fichier a été envoyé avec succès", {
            ...toastParams,
            position: "bottom-right",
          });
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Une erreur s'est produite lors de l'envoie de votre fichier",
          {
            ...toastParams,
            position: "bottom-right",
          }
        );
      }
    }
  
    static async updateUser(userId: number, data: User): Promise<void> {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          store.dispatch(setUser(response.data));

        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  