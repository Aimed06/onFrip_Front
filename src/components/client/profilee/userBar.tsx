import React from "react";
import { Button, Avatar, Typography, Box, Divider } from "@mui/material";
import { MdRememberMe } from "react-icons/md";

interface InfoRowProps {
  label: string;
  value: string;
  color?: string;
}

const InfoRow = ({ label, value, color = "text.secondary" }: InfoRowProps) => (
  <Box display="flex" justifyContent="space-between" my={1}>
    <Typography variant="body2" color="text.primary" fontWeight="500">
      {label}
    </Typography>
    <Typography variant="body2" color={color}>
      {value}
    </Typography>
  </Box>
);

const UserBar = () => {
  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        boxShadow: 2,
        backgroundColor: "background.paper",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Avatar sx={{  width: 64, height: 64, fontSize: 24 }}>N</Avatar>
        <Box textAlign="center">
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            Nom Prénom
          </Typography>
          <Typography variant="body2" color="text.secondary">
            email@example.com
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <InfoRow label="Téléphone" value="(+213) 0123456789" />
      <InfoRow label="Votre identité" value="En attente de vérification" color="warning.main" />
      <InfoRow label="Date d’inscription" value="01/01/2024" />

      <Divider sx={{ my: 2 }} />

      <Button
        variant="contained"
        fullWidth
        startIcon={<MdRememberMe size={20} />}
        sx={{
          mt: 2,
          py: 1.2,
          fontWeight: "bold",
          textTransform: "none",
          
          
        }}
      >
        Vérifier mon identité
      </Button>
    </Box>
  );
};

export default UserBar;