import React from "react";
import Button from "@mui/material/Button";

const DescriptionUpload = (props) => {
  return (
    <Button variant="contained" component="label" sx={{ width: "100%" }}>
      Upload Description
      <input
        hidden
        accept="text/csv"
        onChange={(e) => props.showKeyword(e)}
        multiple
        type="file"
      />
    </Button>
  );
};

export default DescriptionUpload;
