import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./Pages/Home"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import '@fontsource/poppins';
import SearchPage from "./Pages/Search";


// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", // Green color for sustainability theme
    },
    secondary: {
      main: "#ff9800", // Orange as accent color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
})

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add more routes as needed */}
          <Route path="/search" element={<SearchPage/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

