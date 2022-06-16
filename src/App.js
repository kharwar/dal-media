import { useState } from "react";
import { Navbar, MaterialSnackbar } from "./components";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import AlertDialog, { AlertProvider } from "./components/alert-dialog";
import { SnackbarProvider } from "./context";

function App() {
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: "",
  });

  const showSnackbar = (show, message) => {
    setSnackbar({ show, message });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, show: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AlertProvider>
          <SnackbarProvider>
            <CssBaseline />
            <Navbar />
            <AppRoutes />
            <AlertDialog />
            <MaterialSnackbar />
          </SnackbarProvider>
        </AlertProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
