import React from "react";
import Button from "@mui/material/Button";
const KeywordsUpload = (props) => {
  return (
    <div className="">
      <Button
        variant="contained"
        component="label"
        sx={{ margin: "2rem 0rem" }}
      >
        Upload Keywords
        <input
          hidden
          accept="text/csv"
          onChange={(e) => props.showFile(e)}
          multiple
          type="file"
        />
      </Button>
    </div>
  );
};

export default KeywordsUpload;
