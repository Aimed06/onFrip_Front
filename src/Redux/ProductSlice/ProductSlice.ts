import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, Product } from "../../services/Product/Products";

interface ProductState {
  choosedProduct:Product
}

const initialState: ProductState = {
 choosedProduct:{ id: 0,
  name: "",
  price: 0,
  image: "",
  category: {
    id: "",
    name: ""
  },
  status:"En Ligne",
  seller: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",  
  }}
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductState>) => {
      const product = action.payload;
      
      // Préfixer l'image si besoin
      state.choosedProduct.image = product.choosedProduct.image.startsWith("http")
      ? product.choosedProduct.image
      : `${import.meta.env.VITE_API_URL}/uploads/${product.choosedProduct.image}`;
      
      state.choosedProduct.id = product.choosedProduct.id;
      state.choosedProduct.name = product.choosedProduct.name;
      state.choosedProduct.price = product.choosedProduct.price;
      state.choosedProduct.category = product.choosedProduct.category;
      state.choosedProduct.seller = product.choosedProduct.seller;
      state.choosedProduct.status = product.choosedProduct.status;

    },
    resetProduct: (state) => {
      state.choosedProduct.id = 0;
      state.choosedProduct.name = "";
      state.choosedProduct.price = 0;
      state.choosedProduct.image = "";
      state.choosedProduct.category = {
        id: "",
        name: "",
      };
      state.choosedProduct.seller = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      };
      state.choosedProduct.status = "En Ligne";
    },

    setChoosedHotel:(state, action: PayloadAction<Product>) => {
      state.choosedProduct = action.payload;
      if (state.choosedProduct.image && !state.choosedProduct.image.startsWith("http")) {
        state.choosedProduct.image = import.meta.env.VITE_API_URL + "/uploads/" + state.choosedProduct.image;
      }
    },
   
    
  },
});

export const { setProduct, resetProduct } = productSlice.actions;
export default productSlice.reducer;
