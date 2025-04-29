import { Box, Typography, Avatar, Divider, IconButton, Badge } from "@mui/material";
import { MdClose, MdNotifications, MdRoomService } from "react-icons/md";
import { NotificationsTypes } from "../../../../services/Notification/Notification";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { setShowNotifications } from "../../../../Redux/NotificationSlice/NotificationSlice";
import { useDispatch } from "react-redux";

interface NotificationCardProps {
  notificationData: NotificationsTypes;
  handleSeenNotification: (id: number) => void;
}

const NotificationCard = ({
  notificationData,
  handleSeenNotification,
}: NotificationCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { type, isSeen, createdAt, data, id } = notificationData;
  const product = data?.product;
  const lastName = data.lastName;
  const firstName = data.firstName;
  const fullName = `${lastName?.charAt(0).toUpperCase()}${lastName?.slice(1)} ${firstName}`;

  const notificationTitle = () => {
    switch (type) {
      case "ORDER_ACCEPTED":
        return `Commande acceptée`;
      case "ORDER_REFUSED":
        return `Commande refusée`;
      case "IDENTITY_VERIFIED":
        return `Identité acceptée`;
      case "IDENTITY_REFUSED":
        return `Identité acceptée`;
      case "ORDER_PAID":
        return `Commande payée`;
      case "NEW_ORDER_REQUEST":
        return `Nouvelle demande`;
      case "CANCELED_ORDER":
        return `Commande annulée`;
      default:
        return "";
    }
  };

  const notificationText = () => {
    switch (type) {
      case "ORDER_ACCEPTED":
        return `L’hôtel ${product?.name} a accepté votre commande`;
      case "ORDER_REFUSED":
        return `L’hôtel ${product?.name} a refusé votre demande de réservation.`;
      case "IDENTITY_VERIFIED":
        return `Votre identité a été vérifiée avec succès.`;
      case "IDENTITY_REFUSED":
        return `Votre identité a été refusée.`;
      case "ORDER_PAID":
        return `Le client ${fullName} a payé avec succès une réservation dans votre produit.`;
      case "NEW_ORDER_REQUEST":
        return `Nouvelle demande de réservation de ${fullName}.`;
      case "CANCELED_ORDER":
        return `${fullName} a annulé sa réservation.`;
      default:
        return "";
    }
  };

  const notificationIcon = () => {
    switch (type) {
      case "ORDER_ACCEPTED":
      case "ORDER_REFUSED":
      case "IDENTITY_REFUSED":
      case "IDENTITY_VERIFIED":
      case "ORDER_PAID":
        return <MdNotifications size={24} color="#007BFF" />;
      case "NEW_ORDER_REQUEST":
        return <MdRoomService size={24} color="#007BFF" />;
      case "CANCELED_ORDER":
        return <MdClose size={24} color="#007BFF" />;
      default:
        return null;
    }
  };

  const navigateTo = () => {
    switch (type) {
      case "ORDER_ACCEPTED":
      case "ORDER_REFUSED":
      case "IDENTITY_VERIFIED":
      case "IDENTITY_REFUSED":
        return `/profile`;
      case "ORDER_PAID":
      case "CANCELED_ORDER":
        return `/agent/reservations`;
      case "NEW_ORDER_REQUEST":
        return `/agent/demandes`;
      default:
        return "";
    }
  };

  const onClick = () => {
    handleSeenNotification(id);
    dispatch(setShowNotifications(false));
    navigate(navigateTo());
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: "pointer",
        bgcolor: !isSeen ? "#E3F2FD" : "#fff",
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 2,
        py: 2,
        borderBottom: "1px solid #E0E0E0",
        transition: "all 0.2s ease",
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Avatar sx={{ bgcolor: "#E3F2FD", width: 56, height: 56 }}>
        {notificationIcon()}
      </Avatar>
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography fontWeight={600} color="text.primary">
            {notificationTitle()}
          </Typography>
          {!isSeen && <Box sx={{ width: 10, height: 10, bgcolor: "error.main", borderRadius: "50%" }} />}
        </Box>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {notificationText()}
        </Typography>
      </Box>
    </Box>
  );
};

export default NotificationCard;
