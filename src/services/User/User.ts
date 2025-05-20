import {
    setUser,
    setUserOrders,
    setUserFavoris,
   
    setVerificationStatus,
  } from "../../Redux/UserSlice/UserSlice";
  import { store } from "../../Redux/store";
  import axios, { AxiosResponse } from "axios";
  import { Product } from "../Product/Products";
import { toast } from "react-toastify";
import { toastParams } from "../../utils/toastParams";
// Ajoutez ces imports si nécessaire
import { setUserCart } from "../../Redux/UserSlice/UserSlice";
import { is } from "date-fns/locale";

// Ajoutez cette interface
export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  product: Product;
}

// Ajoutez ces méthodes à votre classe User

 
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
    
   

    static async getUserCart(): Promise<CartItem[]> {
  try {
    const response: AxiosResponse<CartItem[]> = await axios.get(
      `${import.meta.env.VITE_API_URL}/Products/basket`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    store.dispatch(setUserCart(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Erreur lors de la récupération du panier", {
      ...toastParams,
      position: "bottom-right",
    });
    throw error;
  }
}

static async addProductToCart(productId: number,  quantity: number = 1): Promise<void> {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${productId}/basket`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    
    if (response.status === 200 || response.status === 201) {
      // Récupérer le panier mis à jour
      await this.getUserCart();
      toast.success("Produit ajouté au panier", {
        ...toastParams,
        position: "bottom-right",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error("Erreur lors de l'ajout au panier", {
      ...toastParams,
      position: "bottom-right",
    });
    throw error;
  }
}

static async removeProductFromCart(productId: number): Promise<void> {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/products/basket/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    
    if (response.status === 200) {
      // Récupérer le panier mis à jour
      await this.getUserCart();
      toast.success("Produit retiré du panier", {
        ...toastParams,
        position: "bottom-right",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error("Erreur lors de la suppression du produit du panier", {
      ...toastParams,
      position: "bottom-right",
    });
    throw error;
  }
}

static async findOne(userId : number): Promise<User> {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
   {
      store.dispatch(setUser(response.data));
      return response.data;
    }
  } catch (error) {
    console.log(error);
    toast.error("Erreur lors de la récupération de l'utilisateur", {
      ...toastParams,
      position: "bottom-right",
    });
    throw error;
  }
}



static async clearCart(): Promise<void> {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/products/basket`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    
    if (response.status === 200) {
      // Mettre à jour le panier dans Redux
      store.dispatch(setUserCart([]));
      toast.success("Panier vidé avec succès", {
        ...toastParams,
        position: "bottom-right",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error("Erreur lors de la suppression du panier", {
      ...toastParams,
      position: "bottom-right",
    });
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
    static async markAsPaid (orderId:number): Promise<void> {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/markAsPaid/${orderId}`,
        
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.status);
  
        if (response.status === 200) {
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
  