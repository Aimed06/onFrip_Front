"use client"

import { Button, Avatar, Typography, Box, Divider } from "@mui/material"
import { MdRememberMe } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../Redux/store"
import dayjs from "dayjs"
import { setIdentite } from "../../../Redux/ModalSlice/ModalSlice"

interface InfoRowProps {
  label: string
  value: string
  color?: string
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
)

const UserBar = () => {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  // Add a check to handle initial state before redux-persist rehydrates
  if (!user || !user.firstName) {
    return <Box>Chargement...</Box>
  }

  const formattedDate = user.createdAt ? dayjs(user.createdAt).format("YYYY-MM-DD") : ""

  const verificationStatus = user.verificationStatus
  const verificationMessage =
    verificationStatus === 0 ? "En attente de vérification" : verificationStatus === 1 ? "Vérifié" : "Non vérifié"
  const verificationColor =
    verificationStatus === 0 ? "warning.main" : verificationStatus === 1 ? "success.main" : "error.main"

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Avatar sx={{ width: 64, height: 64, fontSize: 24 }}>{user.firstName?.[0].toUpperCase()}</Avatar>

        <Box textAlign="center">
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            {user.firstName + "  " + user.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mt: 2 }} />

      <InfoRow label="Téléphone :" value={user.phone || ""} />
      <InfoRow label="Votre identité:" value={verificationMessage} color={verificationColor} />
      <InfoRow label="Date d'inscription" value={formattedDate} />

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
        onClick={() => dispatch(setIdentite(true))}
      >
        Vérifier mon identité
      </Button>
    </>
  )
}

export default UserBar
