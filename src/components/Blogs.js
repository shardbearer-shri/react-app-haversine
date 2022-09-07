import React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
const Blogs = ({ blogs, handleDelete }) => {
  return (
    <Container sx={{ display: "flex" }}>
      {blogs.map((ele, ind) => (
        <Card
          key={ele.id}
          sx={{ maxWidth: 345, margin: "2rem", padding: "1rem 1rem" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {ele.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {ele.blog}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              sx={{ fontSize: "0.8rem", letterSpacing: "0.5px" }}
              variant="outlined"
              size="small"
            >
              {ele.author}
            </Button>
            <Button
              sx={{
                fontSize: "0.8rem",
                letterSpacing: "0.5px",
                fontWeight: "100",
              }}
              variant="contained"
              size="small"
              onClick={() => handleDelete(ele.id)}
            >
              Remove
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};

export default Blogs;
