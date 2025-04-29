import io from "socket.io-client";
import {
  updateNotifications,
  decrementUnReadNotifs,
} from "../../Redux/UserSlice/UserSlice";
import { store } from "../../Redux/store";
import sound from "./sounds/notification_sound.mp3";
import dayjs from "dayjs";

const socket = io(`${import.meta.env.VITE_SOCKETS_URL}`, {
  transports: ["websocket"],
  secure: true,
  rejectUnauthorized: false,
});

const audio = new Audio(sound);

function playNotificationSound() {
  audio
    .play()
    .then(() => {
      console.log("Audio played successfully");
    })
    .catch((error) => {
      console.error("Error playing audio:", error);
    });
}
socket.on("connect", () => {
  console.log("Connected to socket server ", socket.id);
});

export const setSocketSession = async (token: string) => {
  const data = { token };
  socket.emit("set-socket-id", data);
};



export const setNotificationSeen = async (notificationId: number) => {
  const data = { notificationId };
  socket.emit("notification:seen", data);
};

// socket.on("notification:new", (notificationData) => {
//   store.dispatch(updateNotifications(notificationData));
//   store.dispatch(decrementUnReadNotifs(-1));

//   if (Notification.permission !== "granted") {
//     Notification.requestPermission();
//   }
//   if (!Notification) {
//     console.log("Desktop notifications are not available in your browser.");
//   } else {
//     const { type, data } = notificationData;
//     const hotel = data?.hotel;
//     const checkInDate = data.reservationDate;

//     const notificationText = () => {
//       switch (type) {
//         case "RESERVATION_ACCEPTED":
//           return `L’hôtel ${hotel?.name
//             } a accepté votre demande de réservation pour le ${dayjs(
//               checkInDate
//             ).format("DD/MM/YYYY")}.`;
//         case "RESERVATION_REFUSED":
//           return `L’hotel ${hotel?.name
//             } a refusé votre demande de réservation pour le ${dayjs(
//               checkInDate
//             ).format("DD/MM/YYYY")}.`;
//         case "IDENTITY_VERIFIED":
//           return `Votre identité a été vérifiée avec succès.`;
//         case "IDENTITY_REFUSED":
//           return `Votre identité a été refusée.`;
//         default:
//           return "";
//       }
//     };

//     const options: NotificationOptions = {
//       body: notificationText(),
//       icon: "https://i.imgur.com/MZlKZ1I.jpg",
//       dir: "rtl" as NotificationDirection,
//     };
//     playNotificationSound();
//     const notification = new Notification("Notification", options);
//   }
// });

// socket.on("agent-notification:new", (notificationData) => {
//   console.log("NEW NOTIFICATION TO AGENT ", notificationData)
//   store.dispatch(updateAgentNotifications(notificationData));
//   store.dispatch(decrementAgentUnReadNotifs(-1));

//   if (Notification.permission !== "granted") {
//     Notification.requestPermission();
//   }

//   if (!Notification) {
//     console.log("Desktop notifications are not available in your browser.");
//   } else {
//     const { type, data } = notificationData;
//     const checkInDate = data.reservationDate;
//     const lastName = data.lastName;
//     const firstName = data.firstName;
//     const fullName = `${lastName.charAt(0).toUpperCase()}${lastName.slice(1)} ${firstName}`;

//     const notificationText = () => {
//       switch (type) {
//         case "NEW_RESERVATION_REQUEST":
//           return `Nouvelle demande de réservation de ${fullName} pour le ${dayjs(
//             checkInDate
//           ).format("DD/MM/YYYY")}.`;
//         default:
//           return "";
//       }
//     };

//     const options: NotificationOptions = {
//       body: notificationText(),
//       icon: "https://i.imgur.com/MZlKZ1I.jpg",
//       dir: "rtl" as NotificationDirection,
//     };

//     playNotificationSound();
//     const notification = new Notification("Notification", options);
//   }
// });

socket.on("connect_error", (err) => {
  console.log("connect_error due to ", err);
});

socket.on("reconnect_failed", () => {
  console.log("Reconnection failed");
});
