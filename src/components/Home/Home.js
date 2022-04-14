import React, { useEffect } from "react";
import { Grow, Grid, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import { getPosts } from "../../actions/posts";

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.currentPostReducer);

  useEffect(() => {
    dispatch(getPosts());
  }, [post, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          className={classes.mainContainer}
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
  );
};

export default Home;
