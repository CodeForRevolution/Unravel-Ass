import React, { useState } from "react";

import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";



const Description = ({ text, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div>
      <Typography variant="body1">
        {isExpanded ? text : `${text?.substring(0, maxLength)}...`}
      </Typography>
      <IconButton
        aria-label="delete"
        size="small"
        color="primary"
        onClick={toggleDescription}
      >
        {isExpanded ? (
          <ArrowDropUpIcon fontSize="inherit" />
        ) : (
          <ArrowDropDownIcon fontSize="inherit" />
        )}
      </IconButton>
    </div>
  );
};

export default Description;
