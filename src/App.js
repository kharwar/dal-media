import { Navbar } from "./components";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import AlertDialog, { AlertProvider } from "./components/alert-dialog";

function App() {
  console.log("app");

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AlertProvider>
          <CssBaseline />
          <Navbar />
          <AppRoutes />
          <AlertDialog />
        </AlertProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
