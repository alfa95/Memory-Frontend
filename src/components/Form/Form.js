import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../actions/currentPost";
import { updatePost } from "../../actions/posts";
import { createPost } from "../../actions/posts";
import useStyles from "./styles";

const Form = () => {
  const post = useSelector((state) => state.currentPostReducer);
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post) {
      dispatch(updatePost(post._id, {...postData, name: user?.result?.name}));
    } else {
      dispatch(createPost({...postData, name: user?.result?.name}));
    }
    clear();
  };

  const clear = () => {
    dispatch(setUserId(null));
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
<Typography variant="h6" align="center">Please Login to Start Creating Memories</Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => {
            setPostData((prevData) => ({ ...prevData, title: e.target.value }));
          }}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) => {
            setPostData((prevData) => ({
              ...prevData,
              message: e.target.value,
            }));
          }}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            setPostData((prevData) => ({
              ...prevData,
              tags: e.target.value.split(","),
            }));
          }}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData((prevData) => ({ ...prevData, selectedFile: base64 }))
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
