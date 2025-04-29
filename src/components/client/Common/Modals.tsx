import React from "react";
import { Box, Modal as MUIModal, Fade, Backdrop } from "@mui/material";
import { motion } from "framer-motion";

interface ModalProps {
  children?: React.ReactNode;
  
}

const MotionBox = motion(Box);

const Modal = ({ children }: ModalProps) => {
  const open = true;
  const onClose = () => {};

  return (
    <MUIModal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      <Fade in={open}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          px={2}
        >
          <MotionBox
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            sx={{
              Position: "Relative",
              zIndex:99999,
              width: "100%",
              maxWidth: 460,
              bgcolor: "background.paper",
              border: "1px solid #e5e7eb",
              borderRadius: 4,
              boxShadow: 10,
              p: { xs: 3, md: 4 },
              mx: "auto",
            }}
          >
            {children}
          </MotionBox>
        </Box>
      </Fade>
    </MUIModal>
  );
};

export default Modal;
