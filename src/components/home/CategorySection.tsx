import { Link } from "react-router-dom"
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material"
import TshirtIcon from "@mui/icons-material/Checkroom"
import ShirtIcon from "@mui/icons-material/DryCleaningOutlined"
import PantsIcon from "@mui/icons-material/StraightenOutlined"
import JacketIcon from "@mui/icons-material/WbSunnyOutlined"
import GlassesIcon from "@mui/icons-material/RemoveRedEyeOutlined"
import WatchIcon from "@mui/icons-material/WatchOutlined"
import type { SvgIconComponent } from "@mui/icons-material"

// Define category interface
interface Category {
  name: string
  icon: SvgIconComponent
  description: string
  href: string
  color: string
}

const categories: Category[] = [
  {
    name: "T-shirts",
    icon: TshirtIcon,
    description: "Casual and graphic tees",
    href: "/category/tshirts",
    color: "#bbdefb", // light blue
  },
  {
    name: "Hauts et chemisiers",
    icon: ShirtIcon,
    description: "Formal and casual tops",
    href: "/category/tops",
    color: "#ffecb3", // light amber
  },
  {
    name: "Pantalons & Jeans",
    icon: PantsIcon,
    description: "Bottoms for all occasions",
    href: "/category/pants",
    color: "#c8e6c9", // light green
  },
  {
    name: "Vetement extérieurs",
    icon: JacketIcon,
    description: "Jackets, coats and more",
    href: "/category/outerwear",
    color: "#e1bee7", // light purple
  },
  {
    name: "lunettes",
    icon: GlassesIcon,
    description: "Vintage and modern glasses",
    href: "/category/eyewear",
    color: "#f8bbd0", // light pink
  },
  {
    name: "Accessoires",
    icon: WatchIcon,
    description: "Complete your outfit",
    href: "/category/accessories",
    color: "#ffe0b2", // light orange
  },
]

const CategorySection = (): JSX.Element => {
  return (
    <Box sx={{ bgcolor: "grey.100", py: 8 }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography component="h2" variant="h4" gutterBottom>
            Parcourir par categorie
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Trouver exactement ce que vous recherchez
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item key={category.name} xs={6} md={4} lg={2}>
              <Card
                component={Link}
                to={category.href}
                sx={{
                  height: "100%",
                  textDecoration: "none",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 2,
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      p: 1.5,
                      borderRadius: "50%",
                      bgcolor: category.color,
                      color: "text.primary",
                      mb: 2,
                    }}
                  >
                    <category.icon fontSize="large" />
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default CategorySection

