/*
 * Created on Tue Jul 8 2022
 *
 * Author: Siddharth Kharwar
 */
import { Box } from "@mui/material";
import SeeMoreText from "../../see-more-text";
import { serialize } from "../../RichTextInput";

const BlogContent = ({ jsonContent }) => {
  const content = serialize(jsonContent);
  return (
    <Box sx={{ mb: 2 }}>
      {content && (
        <SeeMoreText
          variant="body1"
          sx={{ mb: 1, fontSize: "15px", lineHeight: 1.3 }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: serialize(content),
            }}
          ></div>
        </SeeMoreText>
      )}
    </Box>
  );
};

export default BlogContent;
