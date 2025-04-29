import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  signUp: {
    show: boolean;
    email: string;
    firstName: string;
    lastName: string;
  };
  Otp: {
    show: boolean;
    regToken: string;
  };
  
  registration: boolean;
  parametres: boolean;
  identite: boolean;
  products: boolean;
  detail: boolean;


}

const initialState: ModalState = {
  signUp: {
    show: false,
    email: "",
    firstName: "",
    lastName: "",
  },
  Otp: {
    show: false,
    regToken: "",
  },
  registration: false,
  parametres:false,
  identite:false,
  products: false,
  detail: false,
  
};

const modalsSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowSignUp(state, action: PayloadAction<boolean>) {
      state.signUp.show = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.signUp.email = action.payload;
    },
    setFirstName(state, action: PayloadAction<string>) {
      state.signUp.firstName = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.signUp.lastName = action.payload;
    },
    setShowOTP(state, action: PayloadAction<boolean>) {
      state.Otp.show = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.Otp.regToken = action.payload;
    },
    setShowRegistration(state, action: PayloadAction<boolean>) {
      state.registration = action.payload;
    },
    setShowProducts(state, action: PayloadAction<boolean>) {
      state.products = action.payload;
    },
    setShowParametres(state, action: PayloadAction<boolean>) {
      state.parametres = action.payload;
    },
    setIdentite(state, action: PayloadAction<boolean>) {
      state.identite = action.payload;
    },
    setShowDetail(state, action: PayloadAction<boolean>) {
      state.detail = action.payload;
    }
    
  
  },
});

export const {
  setShowSignUp,
  setEmail,
  setFirstName,
  setLastName,
  setShowOTP,
  setToken,
  setShowRegistration,
  setShowParametres,
  setIdentite,
  setShowProducts,
  setShowDetail,
  
} = modalsSlice.actions;

export default modalsSlice.reducer;
