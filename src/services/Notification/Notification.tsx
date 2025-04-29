import axios from "axios";
import  {setUserNotifications}  from "../../Redux/UserSlice/UserSlice";
import { store } from "../../Redux/store";

interface Data {
  orderId?: number,
  orderData?: string,
  product?: {
    id: number,
    name: string
  },
  firstName?: string,
  lastName?: string
}
export interface NotificationsTypes {
  id: number;
  userId: number;
  type: "ORDER_ACCEPTED" | "ORDER_REFUSED" | "IDENTITY_VERIFIED" | "IDENTITY_REFUSED" | "ORDER_PAID" | "NEW_ORDER_REQUEST" | "CANCELED_ORDER";
  data: Data;
  isSeen: boolean;
  createdAt: Date;
  seenAt: Date;
}
export class Notification {
  static async getUserNotifications(): Promise<any> {
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/notifs`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        store.dispatch(setUserNotifications(response.data));
        return response.data.notifications;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }

}
