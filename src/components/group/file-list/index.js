import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, MenuItem, Box, Button } from "@mui/material";
import { files } from "../../../data"
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../alert-dialog";
import File from "../file";

const FileList = () => {
  console.log("fileList");

  const { setAlert, setOnAgree } = useAlert();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setOnAgree(onDelete);
  }, []);

  const handleMenu = (event, file) => {
    fileRef.current = file;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = () => {
    console.log("Downloaded");
    handleClose();
  };

  const onDelete = () => {
    console.log("delete");
  };

  const handleDelete = () => {
    handleClose();
    setAlert(true, "Delete File", "Are you sure you want to delete this file?");
  };

  const renderFile = useCallback((file) => {
    return (
      <File
        file={file}
        key={file.id}
        handleMenu={(event) => handleMenu(event, file)}
      />
    );
  }, []);

  return (
    <>
      <Box sx={{ m: 1 }}>
        <input
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
        />
        <label htmlFor="raised-button-file">
          <Button
            variant="contained"
            component="span"
            sx={{
              backgroundColor: "#2c3e50",
            }}
          >
            Upload
          </Button>
        </label>
      </Box>
      {files.map(renderFile)}
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleDownload}>Download</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default FileList;
