import { useSnackbar } from "../../context";
import Snackbar from "@mui/material/Snackbar";

const MaterialSnackbar = () => {
  const { open, message, showSnackbar } = useSnackbar();

  const closeSnackbar = () => showSnackbar(false);

  console.log({ open, message });
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      message={message}
    />
  );
};

export default MaterialSnackbar;
