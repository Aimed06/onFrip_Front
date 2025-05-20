// services/Category/Category.ts
import axios from "axios";

export interface Category {
  id: number | string;
  name: string;
}

export class CategoryService {
  public static async getAllCategories(): Promise<Category[]> {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
      throw error;
    }
  }

  public static async getCategoryById(id: number | string): Promise<Category> {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la catégorie ${id}:`, error);
      throw error;
    }
  }
}