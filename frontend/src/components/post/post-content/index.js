import { Box, ImageList, ImageListItem, Paper } from "@mui/material";
import React from "react";
import SeeMoreText from "../../see-more-text";

const PostContent = ({ post: { description, images } }) => {
  const renderImages = () => {
    return (
      <ImageList sx={{ width: "100%", m: 0 }} variant="quilted" rowHeight={180}>
        {images.map((image, index) => (
          <Paper
            variant="outlined"
            key={index + ""}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ImageListItem>
              <img src={`${image}?fit=crop&auto=format`} loading="lazy" />
            </ImageListItem>
          </Paper>
        ))}
      </ImageList>
    );
  };

  return (
    <Box sx={{ mb: 2 }}>
      {description && (
        <SeeMoreText
          variant="body1"
          sx={{ mb: 1, fontSize: "15px", lineHeight: 1.3 }}
        >
          {description}
        </SeeMoreText>
      )}
      {images.length > 0 && renderImages()}
    </Box>
  );
};

export default PostContent;
