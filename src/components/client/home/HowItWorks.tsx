import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import UploadIcon from "@mui/icons-material/Upload"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import FavoriteIcon from "@mui/icons-material/Favorite"
import type { ReactElement } from "react"

// Define step interface
interface Step {
  title: string
  description: string
  icon: ReactElement
  color: string
}

const steps: Step[] = [
  {
    title: "Achetez",
    description: "Parcourez des milliers de vêtements de seconde main de qualité à des prix abordable.",
    icon: <ShoppingBagIcon fontSize="large" />,
    color: "#bbdefb", // light blue
  },
  {
    title: "Vendez",
    description: "Mettez en ligne vos vêtements facilement et atteignez des milliers d'acheteurs potentiels.",
    icon: <UploadIcon fontSize="large" />,
    color: "#c8e6c9", // light green
  },
  {
    title: "Gagnez",
    description: "Recevez votre paiement rapidement et en toute sécurité pour vos vêtements vendus.",
    icon: <AttachMoneyIcon fontSize="large" />,
    color: "#ffecb3", // light amber
  },
  {
    title: "Donnez",
    description: "Soutenez les dons de vêtements aux personnes dans le besoin à chaque transaction.",
    icon: <FavoriteIcon fontSize="large" />,
    color: "#ffcdd2", // light red
  },
]

const HowItWorks = (): JSX.Element => {
  return (
    <Container sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography component="h2" variant="h4" gutterBottom>
          Comment ça marche
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: "auto" }}>
        OnFrip rend l'achat et la vente d'articles de seconde main simples, durables et gratifiants.        </Typography>
      </Box>

      <Grid container spacing={4}>
        {steps.map((step, index) => (
          <Grid item key={step.title} xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%", boxShadow: 1 }}>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    p: 1.5,
                    borderRadius: "50%",
                    bgcolor: step.color,
                    color: "text.primary",
                    mb: 2,
                  }}
                >
                  {step.icon}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor: "grey.200",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    {index + 1}
                  </Typography>
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default HowItWorks

