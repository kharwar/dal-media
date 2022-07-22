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
import { dateFormat, uploadFile } from "../../utils";
import { apiRoutes, ServiceManager } from "../../services";
import { useAuth } from "../../context";

const CreatePost = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const textInput = useRef(null);
  const [textFilled, setTextFilled] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (state?.post) {
      const { post } = state;
      post.description && textInput.current.setValue(post.description);
      const imgs = post.images.map((url) => ({
        file: null,
        url,
      }));
      setImages(imgs);
    }
  }, []);

  const onImageSelect = (e) => {
    if (e.target.files) {
      const fileList = e.target.files;
      const newImages = [];
      let lastId = images.length;

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const url = URL.createObjectURL(file);
        const id = lastId + 1;
        newImages.push({ file, url });
        lastId = id;
      }
      setImages((oldImages) => [...oldImages, ...newImages]);
      e.target.value = "";
    }
  };

  const onDeleteImage = (url) => {
    const filteredImages = images.filter((image) => image.url != url);
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
      for (let i = 0; i < images.length; i++) {
        if (images[i].file) {
          const imageUrl = await uploadFile(images[i].file);
          imageUrls.push(imageUrl);
        } else {
          imageUrls.push(images[i].url);
        }
      }
    } catch (error) {
      console.error(`File Upload error: ${error}`);
    }

    const groupId = state?.groupId ?? state?.post.groupId ?? null;

    const params = {
      description: textInput.current?.getValue(),
      images: imageUrls,
      groupId,
    };

    let method = "post";
    let url = apiRoutes.createPost;

    if (state?.post) {
      url = apiRoutes.editPost;
      params["id"] = state.post._id;
      method = "put";
    }

    try {
      const res = await ServiceManager.getInstance().request(
        url,
        params,
        method
      );
      const key = state?.post ? "updated" : "created";
      snackbar.current.showSnackbar(true, `Post ${key}`);
      groupId ? navigate(`/groups/${groupId}`) : navigate("/");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ m: "50px", p: "30px" }}>
      <Stack direction="row" spacing={1.5}>
        <Avatar
          alt={`${loggedInUser.firstname} ${loggedInUser.lastname}`}
          src={loggedInUser.image}
          sx={{ width: 56, height: 56 }}
        />
        <Stack>
          <Typography variant="h6" component="h6" sx={{ lineHeight: 1.2 }}>
            {`${loggedInUser.firstname} ${loggedInUser.lastname}`}
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
          {images.map(({ url }, index) => (
            <div className="img-container" key={index + ""}>
              <img className="img" src={url} width="200" height="200" />
              <IconButton
                disabled={loading}
                sx={styling.btnDelete}
                onClick={() => onDeleteImage(url)}
              >
                <DeleteRounded />
              </IconButton>
            </div>
          ))}
        </Box>
      )}
      <Stack direction="row" sx={styling.btnContainer}>
        <input
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          multiple
          accept="image/*"
          onChange={onImageSelect}
        />
        <label htmlFor="raised-button-file">
          <IconButton component="span" disabled={loading}>
            <ImageRounded fontSize="medium" />
          </IconButton>
        </label>
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
