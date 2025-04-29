import {
    setEmail,
    setShowSignUp,
    setShowOTP,
    setToken,
    setShowRegistration,
    setFirstName,
    setLastName,
  } from "../../Redux/ModalSlice/ModalSlice";
  import { setLoggedIn, setUser } from "../../Redux/UserSlice/UserSlice";
  import axios from "axios";
  import { setSocketSession } from "../Sockets/Sockets";
  import { Notification } from "../Notification/Notification";
  import { store } from "../../Redux/store";
  import { Bounce, toast } from "react-toastify";
  interface responseMessage {
    message: string;
  }
  
  const notify = () => toast.success("Ton compte a été enregistré avec succès!", {
    toastId: "register",
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  },);
  export class Authentification {
  
    static async setSession(): Promise<void> {
      const authToken = localStorage.getItem("token");
      if (authToken) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/me`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
  
          if (response.data.user) {
            store.dispatch(setUser(response.data.user));
            store.dispatch(setLoggedIn(true));
            setSocketSession(authToken);
            await Notification.getUserNotifications();
          }
        } catch (error) {
          console.log(error);
        }
      }
      return;
    }
  
    static async sendSecretCode(email: string, dispatch: Function): Promise<void> {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/sendSecretCode`, {
          email,
        });
        dispatch(setEmail(email));
        dispatch(setShowSignUp(false));
        dispatch(setShowOTP(true));
      } catch (error) {
        console.log(error);
      }
    }
  
    static async googleAuth(access_token: string, dispatch: Function): Promise<void> {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google`, {
          access_token,
        });
  
        if (!response.data.isRegistred) {
          dispatch(setEmail(response.data.userDetails.email));
          dispatch(setFirstName(response.data.userDetails.firstName));
          dispatch(setLastName(response.data.userDetails.lastName));
          dispatch(setToken(response.data.token));
          dispatch(setShowSignUp(false));
          dispatch(setShowRegistration(true));
        } else {
          localStorage.setItem("token", response.data.token);
          dispatch(setShowSignUp(false));
          dispatch(setLoggedIn(true))
          dispatch(setUser(response.data.user));
          setSocketSession(response.data.token);
          Notification.getUserNotifications();
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    static async verifySecretCode(
      email: string,
      otpCode: number,
      dispatch: Function,
    ): Promise<responseMessage | undefined> {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/verifySecretCode`,
          {
            email: email,
            code: otpCode,
          }
        );
        if (!response.data.isRegistred) {
          dispatch(setToken(response.data.token));
          dispatch(setShowOTP(false));
          dispatch(setShowRegistration(true));
        } else {
          localStorage.setItem("token", response.data.token);
          dispatch(setShowOTP(false));
          dispatch(setLoggedIn(true))
          dispatch(setUser(response.data.user));
          setSocketSession(response.data.token);
          Notification.getUserNotifications();
        }
      } catch (error: any) {
        if (error) {
  
          return {
            message: error.response.data.message,
          };
        }
      }
    }
    static async registerUser(
      {
        nom,
        prenom,
        telephone,
      }: { nom: string; prenom: string; telephone: string; email: string },
      regToken: string,
    ): Promise<void> {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/register`,
          {
            lastName: nom,
            firstName: prenom,
            phone: telephone,
            registrationToken: regToken,
          }
        );
        if (response.status === 200) {
          store.dispatch(setShowRegistration(false));
          notify();
        }
        localStorage.setItem("token", response.data.authToken);
        store.dispatch(setUser(response.data.user));
        store.dispatch(setLoggedIn(true))
        setSocketSession(response.data.authToken);
        Notification.getUserNotifications();
  
      } catch (error) {
        console.log(error);
        toast.error("Une erreur s'est produite lors de l'enregistrement de votre compte", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  }
  