import { useState, useEffect } from "react";
import { MaterialSnackbar } from "./components";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import AlertDialog, { AlertProvider } from "./components/alert-dialog";
import { snackbarRef } from "./components/material-snackbar";
import { AuthContext } from "./context";
import { ServiceManager, apiRoutes } from "./services";
import { getLoggedInUser } from "./local-storage";

ServiceManager.initialize(apiRoutes.baseURL);

function App() {
  // const [isLogin, setLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authentication, setAuthentication] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const user = await getLoggedInUser();
        if (user) {
          setLoggedInUser(user);
        }
      } catch (error) {}
      setAuthentication(true);
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {authentication ? (
        <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
          <BrowserRouter>
            <AlertProvider>
              <CssBaseline />
              <AppRoutes />
              <AlertDialog />
              <MaterialSnackbar ref={snackbarRef} />
            </AlertProvider>
          </BrowserRouter>
        </AuthContext.Provider>
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
}

export default App;
