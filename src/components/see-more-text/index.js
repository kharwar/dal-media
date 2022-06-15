import { useCallback, useState } from "react";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import ButtonBase from "@mui/material/ButtonBase";

const SeeMoreText = (props) => {
  const [showMore, setShowMore] = useState(!(props.children.length > 250));

  const handleClick = useCallback(() => {
    setShowMore((showMore) => !showMore);
  }, []);

  return (
    <Typography {...props}>
      {showMore ? props.children : `${props.children.substring(0, 250)}.. `}
      {!showMore && (
        <ButtonBase
          size="small"
          sx={{
            p: 0,
            color: grey[700],
            fontWeight: "600",
          }}
          disableRipple
          onClick={handleClick}
        >
          See more
        </ButtonBase>
      )}
    </Typography>
  );
};

export default SeeMoreText;
