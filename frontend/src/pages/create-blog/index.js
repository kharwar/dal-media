import React, { useEffect, useRef, useState } from "react";
import {
  Paper,
  Typography,
  Stack,
  IconButton,
  Button,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";
import { ImageRounded, DeleteRounded } from "@mui/icons-material";
import "./style.css";
import { RichTextInput, snackbar } from "../../components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { apiRoutes, ServiceManager } from "../../services";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
const CreateBlog = () => {
  const { state } = useLocation();

  const { id } = useParams();
  const [body, setBody] = useState(
    state?.blog ? state.blog.body : initialValue
  );
  const [title, setTitle] = useState("");
  const [textFilled, setTextFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const fileInput = useRef(null);
  const navigate = useNavigate();

  const isPublishDisable = !textFilled || loading;

  useEffect(() => {
    if (state?.blog) {
      const { blog } = state;
      blog.title != "" && setTitle(blog.title);
      // setImage(blog.image);
      console.log(blog.body);
      setBody(blog.body);
    }
  }, [state, id]);

  const onPublish = async () => {
    setLoading(true);

    const params = {
      title,
      image,
      body,
    };

    try {
      const res = await ServiceManager.getInstance().request(
        state?.blog
          ? `${apiRoutes.updateBlog}/${state.blog._id}`
          : apiRoutes.createBlog,
        params,
        state?.blog ? "put" : "post"
      );

      const key = state?.blog ? "updated" : "created";
      snackbar.current.showSnackbar(true, `Blog ${key}.`);
      navigate("/blogs");
    } catch (error) {
      console.log({ error });
    }
  };

  const onImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const onImageChange = (e) => {
    if (fileInput.current != null) {
      fileInput.current.click();
    }
  };

  const onDeleteImage = () => {
    setImage(null);
  };

  useEffect(() => {
    if (body[0]?.children[0]?.text != "" && title != "") {
      setTextFilled(true);
    } else {
      setTextFilled(false);
    }
  }, [body, title]);

  return (
    <Paper sx={{ m: "50px", p: "30px" }}>
      <Stack spacing={1.5} className="blog-title-container">
        <Typography variant="body1" style={{ paddingLeft: "10px" }}>
          Title
        </Typography>
        <TextField
          fullWidth
          id="title"
          required
          placeholder="My awesome blog!"
          size="medium"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Stack>
      <Stack style={{ marginTop: "10px" }}>
        <RichTextInput
          value={body}
          setValue={setBody}
          style={{ height: "fit-content", marginTop: "16px" }}
        />
      </Stack>
      {image != null && (
        <Box className="img-box">
          <div className="img-container">
            <img src={image} className="img" width="200" heigh="200" />
            <IconButton
              disabled={loading}
              sx={styling.btnDelete}
              onClick={() => onDeleteImage(image)}
            >
              <DeleteRounded />
            </IconButton>
          </div>
        </Box>
      )}
      <Stack direction="row" className="btn-container">
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={onImageSelect}
        />
        <IconButton onClick={onImageChange} disabled={image != null || loading}>
          <ImageRounded />
        </IconButton>
        <Box className="publish-btn-container">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#455A64",
            }}
            onClick={onPublish}
            disabled={isPublishDisable}
          >
            Publish
          </Button>
          {loading && <CircularProgress size={24} className="progress" />}
        </Box>
      </Stack>
    </Paper>
  );
};

export default CreateBlog;

const styling = {
  btnDelete: {
    position: "absolute",
    top: "2%",
    right: "2%",
    backgroundColor: "lightgrey",
  },
};
