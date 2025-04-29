import axios, { AxiosResponse } from "axios";
import { Order } from "../User/User";
import { setDeleteProduct } from "../../Redux/UserSlice/UserSlice";
import { useDispatch } from "react-redux";
import { store} from "../../Redux/store";

export interface Category{
    id: string;
    name: string;
}



export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: Category;
  status: "En Ligne" | "vendu";
  seller: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export class Products {
  static async getHomeProducts(): Promise<Product[]> {
    try {
      const response: AxiosResponse<Product[]> = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

 

  static async getUserProducts(): Promise<Product[]> {
    try {
      const response: AxiosResponse<Product[]> = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async addProduct (productData: FormData) : Promise<Product> {
    try {
      const response: AxiosResponse<Product> = await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteUserProduct(id:number): Promise<void> {
    try {
      const response: AxiosResponse<void> = await axios.delete(
        `${import.meta.env.VITE_API_URL}/products/${id}/user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status==200) {
        store.dispatch(setDeleteProduct(id)); // Dispatch the action to update the Redux store
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getSpecificProduct(id: number): Promise<Product> {
    try {
      const response: AxiosResponse<Product> = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
