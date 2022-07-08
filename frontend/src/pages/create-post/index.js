import React, { useRef, useEffect, useState } from "react";
import {
  Avatar,
  Paper,
  Typography,
  Stack,
  IconButton,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { DeleteRounded, ImageRounded } from "@mui/icons-material";
import "./styles.css";
import { PostTextInput, snackbar } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { loggedInUser } from "../../data";
import { dateFormat, uploadFile } from "../../utils";
import { apiRoutes, ServiceManager } from "../../services";

const postImages = [];

const CreatePost = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const textInput = useRef(null);
  const [textFilled, setTextFilled] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state?.post) {
      const { post } = state;
      post.description && textInput.current.setValue(post.description);
      setImages(post.images);
    }
  }, []);

  const onImageChange = (e) => {
    if (fileInput.current != null) {
      fileInput.current.click();
    }
  };

  const onImageSelect = (e) => {
    if (e.target.files) {
      const fileList = e.target.files;
      const newImages = [];
      let lastId = images.length;

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const url = URL.createObjectURL(file);
        const id = lastId + 1;
        postImages.push(file);
        newImages.push(url);
        lastId = id;
      }

      setImages((oldImages) => [...oldImages, ...newImages]);
    }
  };

  const onDeleteImage = (url) => {
    const filteredImages = images.filter((image) => image != url);
    setImages(filteredImages);
  };

  const onTextChange = (text) => {
    if (text != "" && !textFilled) {
      setTextFilled(true);
    } else if (text === "" && textFilled) {
      setTextFilled(false);
    }
  };

  const onPost = async () => {
    setLoading(true);

    const imageUrls = [];

    try {
      for (const file in postImages) {
        const imageUrl = await uploadFile(file);
        imageUrls.push(imageUrl);
      }
    } catch (error) {
      console.error(`File Upload error: ${error}`);
    }

    const params = {
      description: textInput.current?.getValue(),
      images: imageUrls,
    };

    try {
      const res = await ServiceManager.getInstance().request(
        apiRoutes.createPost,
        params,
        "post"
      );

      console.log({ res });
      const key = state?.post ? "updated" : "created";
      snackbar.current.showSnackbar(true, `Post ${key}`);
      navigate("/");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Paper sx={{ m: "50px", p: "30px" }}>
      <Stack direction="row" spacing={1.5}>
        <Avatar
          alt={loggedInUser.name}
          src={loggedInUser.image}
          sx={{ width: 56, height: 56 }}
        />
        <Stack>
          <Typography variant="h6" component="h6" sx={{ lineHeight: 1.2 }}>
            {loggedInUser.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ lineHeight: 1.2, color: grey[600] }}
          >
            {dateFormat(Date.now(), "MMM DD, YYYY")}
          </Typography>
        </Stack>
      </Stack>
      <PostTextInput
        ref={textInput}
        onChange={onTextChange}
        disabled={loading}
        minRows={8}
        maxRows={20}
        autoFocus={true}
        placeholder={"What's on your mind?"}
        sx={{ mt: "30px", fontSize: 20 }}
      />
      {images.length > 0 && (
        <Box className="img-list">
          {images.map((image, index) => (
            <div className="img-container" key={index + ""}>
              <img className="img" src={image} width="200" height="200" />
              <IconButton
                disabled={loading}
                sx={styling.btnDelete}
                onClick={() => onDeleteImage(image)}
              >
                <DeleteRounded />
              </IconButton>
            </div>
          ))}
        </Box>
      )}
      <Stack direction="row" sx={styling.btnContainer}>
        <input
          type="file"
          multiple
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={onImageSelect}
        />
        <IconButton onClick={onImageChange} disabled={loading}>
          <ImageRounded fontSize="medium" />
        </IconButton>
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            variant="contained"
            disabled={(images.length == 0 && !textFilled) || loading}
            onClick={onPost}
            sx={{
              backgroundColor: "#455A64",
            }}
          >
            {state?.post ? "Save" : "Post"}
          </Button>
          {loading && <CircularProgress size={24} sx={styling.progress} />}
        </Box>
      </Stack>
    </Paper>
  );
};

export default CreatePost;

const styling = {
  btnDelete: {
    position: "absolute",
    top: "2%",
    right: "2%",
    backgroundColor: "lightgrey",
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-12px",
    marginLeft: "-12px",
  },
  btnContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
};
