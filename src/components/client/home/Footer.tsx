import { Link as RouterLink } from "react-router-dom"
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import RecyclingIcon from "@mui/icons-material/Recycling"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import SendIcon from "@mui/icons-material/Send"

const Footer = (): JSX.Element => {
  return (
    <Box component="footer" sx={{ bgcolor: "grey.100", pt: 6, pb: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <RecyclingIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: "none", color: "inherit" }}>
                OnFrip
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Sustainable shopping for a better tomorrow. Buy, sell, and donate pre-loved items.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="Facebook" component={Link} href="#" color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" component={Link} href="#" color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="Instagram" component={Link} href="#" color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="YouTube" component={Link} href="#" color="inherit">
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" gutterBottom>
              Shop
            </Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/shop" color="text.secondary" underline="hover">
                All Clothing
              </Link>
              <Link component={RouterLink} to="/category/tops" color="text.secondary" underline="hover">
                Tops & Blouses
              </Link>
              <Link component={RouterLink} to="/category/pants" color="text.secondary" underline="hover">
                Pants & Jeans
              </Link>
              <Link component={RouterLink} to="/category/dresses" color="text.secondary" underline="hover">
                Dresses & Skirts
              </Link>
              <Link component={RouterLink} to="/category/outerwear" color="text.secondary" underline="hover">
                Outerwear
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" gutterBottom>
              Sell
            </Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/sell" color="text.secondary" underline="hover">
                Start Selling
              </Link>
              <Link component={RouterLink} to="/seller-guidelines" color="text.secondary" underline="hover">
                Seller Guidelines
              </Link>
              <Link component={RouterLink} to="/seller-dashboard" color="text.secondary" underline="hover">
                Seller Dashboard
              </Link>
              <Link component={RouterLink} to="/shipping" color="text.secondary" underline="hover">
                Shipping Options
              </Link>
              <Link component={RouterLink} to="/fees" color="text.secondary" underline="hover">
                Fees & Payments
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" gutterBottom>
              Stay Updated
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Subscribe to our newsletter for the latest products and community initiatives.
            </Typography>
            <TextField
              size="small"
              placeholder="Your email"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" color="primary">
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Typography variant="subtitle1" gutterBottom>
              Help & Support
            </Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/contact" color="text.secondary" underline="hover">
                Contact Us
              </Link>
              <Link component={RouterLink} to="/faq" color="text.secondary" underline="hover">
                FAQ
              </Link>
              <Link component={RouterLink} to="/returns" color="text.secondary" underline="hover">
                Returns Policy
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 6, mb: 3 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "center" },
            gap: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            &copy; {new Date().getFullYear()} OnFrip. All rights reserved.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <Link component={RouterLink} to="/terms" color="text.secondary" underline="hover" variant="caption">
              Terms of Service
            </Link>
            <Link component={RouterLink} to="/privacy" color="text.secondary" underline="hover" variant="caption">
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="/accessibility" color="text.secondary" underline="hover" variant="caption">
              Accessibility
            </Link>
            <Link component={RouterLink} to="/cookies" color="text.secondary" underline="hover" variant="caption">
              Cookie Policy
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer

