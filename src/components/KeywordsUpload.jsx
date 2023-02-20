import React from "react";
import Button from "@mui/material/Button";
const KeywordsUpload = (props) => {
  return (
    <Button variant="contained" component="label" sx={{ width: "100%" }}>
      Upload Keywords
      <input
        hidden
        accept="text/csv"
        onChange={(e) => props.showFile(e)}
        multiple
        type="file"
      />
    </Button>
  );
};

export default KeywordsUpload;
