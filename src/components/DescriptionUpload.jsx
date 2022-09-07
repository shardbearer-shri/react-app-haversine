import React from "react";
import Button from "@mui/material/Button";

const DescriptionUpload = (props) => {
  return (
    <div className="">
      <Button
        variant="contained"
        component="label"
        sx={{ margin: "2rem 0rem" }}
      >
        Upload Description
        <input
          hidden
          accept="text/csv"
          onChange={(e) => props.showKeyword(e)}
          multiple
          type="file"
        />
      </Button>
    </div>
  );
};

export default DescriptionUpload;
