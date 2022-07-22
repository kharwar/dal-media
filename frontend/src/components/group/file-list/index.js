import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, MenuItem, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../alert-dialog";
import File from "../file";
import { snackbar } from "../../../components";
import { uploadFile } from "../../../utils";
import { apiRoutes, ServiceManager } from "../../../services";

const createFileToGroup = async (file, url, groupId, setFiles) => {
  const params = {
    name: file.name,
    url,
    groupId,
  };

  try {
    const res = await ServiceManager.getInstance().request(
      apiRoutes.files,
      params,
      "post"
    );
    getAllFiles(groupId, setFiles);
  } catch (error) {}
};

const getAllFiles = (groupId, setFiles) => {
  ServiceManager.getInstance()
    .request(`${apiRoutes.files}/${groupId}`)
    .then((res) => {
      setFiles(res.data);
    })
    .catch((error) => {});
};

const deleteFile = (fileId, groupId, setFiles) => {
  ServiceManager.getInstance()
    .request(`${apiRoutes.files}/${fileId}`, null, "delete")
    .then((res) => {
      snackbar.current.showSnackbar(true, "File Deleted");
      getAllFiles(groupId, setFiles);
    })
    .catch((error) => {});
};

const FileList = (props) => {
  const [files, setFiles] = useState([]);

  const { setAlert, setOnAgree } = useAlert();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getAllFiles(props.groupId, setFiles);
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
    window.open(fileRef.current.url, "_blank", "noopener,noreferrer");
    handleClose();
  };

  const onDelete = () => {
    deleteFile(fileRef.current._id, props.groupId, setFiles);
  };

  const handleDelete = () => {
    handleClose();
    setAlert(true, "Delete File", "Are you sure you want to delete this file?");
  };

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    const fileUrl = await uploadFile(file);
    createFileToGroup(file, fileUrl, props.groupId, setFiles);
    event.target.files[0] = null;
  };

  const renderFile = useCallback((file) => {
    return (
      <File
        file={file}
        key={file._id}
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
          onChange={onFileChange}
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
        <MenuItem onClick={handleDownload}>View</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default FileList;
