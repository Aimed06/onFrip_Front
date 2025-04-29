import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import NotificationCard from "../NotificationCard/NotificationCard";
import { useDispatch } from "react-redux";
import { setShowNotifications } from "../../../../Redux/NotificationSlice/NotificationSlice";
import { NotificationsTypes } from "../../../../services/Notification/Notification";
import { setNotificationSeen } from "../../../../services/Sockets/Sockets";
import { MdNotificationsNone } from "react-icons/md";
import { Box, Typography, Divider } from "@mui/material";

interface NotificationsContainerProps {
  notifications: NotificationsTypes[];
  handleSeenNotification: (id: number) => void;
}

const NotificationsContainer = ({ notifications, handleSeenNotification }: NotificationsContainerProps) => {
  const dispatch = useDispatch();
  const [numToShow, setNumToShow] = useState<number>(3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        event.target instanceof HTMLElement &&
        !event.target.id.includes("notifications-container")
      ) {
        dispatch(setShowNotifications(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "absolute",
        width: 507,
        top: 40,
        right: 8,
        backgroundColor: "white",
        zIndex: 40,
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
      }}
    >
      {notifications.length === 0 ? (
        <Box p={4} bgcolor="#FBFBFB" borderRadius={3} m={1} display="flex" alignItems="center" justifyContent="center">
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <MdNotificationsNone size={80} color="#CBCBCB" />
            <Typography variant="body1" color="textSecondary">
              Aucune notification
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Box p={2}>
            <Typography variant="h6" fontWeight="medium" color="textPrimary">
              Notifications
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              maxHeight: 367,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {notifications.slice(0, numToShow).map((notification, index) => (
              <NotificationCard
                key={index}
                handleSeenNotification={() => {
                  if (!notification.isSeen) {
                    handleSeenNotification(notification.id);
                    setNotificationSeen(notification.id);
                  }
                }}
                notificationData={notification}
              />
            ))}
            {numToShow < notifications.length && (
              <Box py={2} px={3} display="flex" justifyContent="center">
                <Typography
                  onClick={() => setNumToShow(numToShow + 5)}
                  sx={{ color: "primary.main", cursor: "pointer", fontSize: 14, fontWeight: 700 }}
                >
                  Voir plus
                </Typography>
              </Box>
            )}
          </Box>
        </>
      )}
    </motion.div>
  );
};

export default NotificationsContainer;
