import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

import { getPosts } from "./actions/posts";
import memory from "./images/memory.jpeg";
import useStyles from "./styles";

const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const post = useSelector((state) => state.currentPostReducer);

  useEffect(() => {
    dispatch(getPosts());
  }, [post, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memory}
          alt="memories"
          height="60"
        ></img>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="strech"
            spacing="3"
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
