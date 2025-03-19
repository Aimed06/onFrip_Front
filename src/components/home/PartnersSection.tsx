import { Link } from "react-router-dom"
import { Box, Button, Card, CardContent, Container, Grid, Typography } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

// Define partner interface
interface Partner {
  id: number
  name: string
  logo: string
  description: string
}

// Sample data - in a real app, this would come from an API
const partners: Partner[] = [
  {
    id: 1,
    name: "",
    logo: "", // Replace with actual logo
    description: "",
  },
  {
    id: 2,
    name: "",
    logo: "", // Replace with actual logo
    description: "",
  },
  {
    id: 3,
    name: "",
    logo: "", // Replace with actual logo
    description: "",
  },
]

const PartnersSection = (): JSX.Element => {
  return (
    <Box sx={{ bgcolor: "grey.50", py: 8 }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: 6,
            gap: 2,
          }}
        >
          <Box>
            <Typography component="h2" variant="h4" gutterBottom>
            Nos associations partenaires
            </Typography>
            <Typography variant="body1" color="text.secondary">
            Nous collaborons avec ces organisations incroyables pour faire la différence.            </Typography>
          </Box>
          <Button component={Link} to="/partners" variant="outlined" endIcon={<ArrowForwardIcon />}>
          Voir tous les partenaires          </Button>
        </Box>

        <Grid container spacing={4}>
          {partners.map((partner) => (
            <Grid item key={partner.id} xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Box
                    component="img"
                    src={partner.logo}
                    alt={partner.name}
                    sx={{
                      height: 80,
                      maxWidth: 200,
                      objectFit: "contain",
                      mb: 3,
                    }}
                  />
                  <Typography variant="h5" component="h3" gutterBottom>
                    {partner.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {partner.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 6,
            p: 4,
            bgcolor: "primary.light",
            borderRadius: 2,
            color: "primary.contrastText",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "center", md: "center" },
              gap: 3,
            }}
          >
            <Box>
              <Typography variant="h5" component="h3" gutterBottom>
              Devenir partenaire              </Typography>
              <Typography variant="body1">
              Rejoignez notre réseau d'associations et aidez-nous à avoir un impact plus important dans les communautés.              </Typography>
            </Box>
            <Button component={Link} to="/become-partner" variant="contained" color="secondary" size="large">
            Postuler maintenant            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default PartnersSection

