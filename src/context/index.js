import { createContext, useContext, useState } from "react";

export const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showSnackbar = (open, message) => {
    setOpen(open);
    message && setMessage(message);
  };

  return (
    <SnackbarContext.Provider value={{ open, message, showSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};
