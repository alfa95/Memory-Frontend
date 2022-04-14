import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";

import MoreVertIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { setUserId } from "../../../actions/currentPost";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      ></CardMedia>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            placement="bottom-start"
          >
            <MenuItem
              key={`edit${post._id}`}
              onClick={() => {
                dispatch(setUserId(post));
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              key={`delete${post._id}`}
              onClick={() => {
                dispatch(deletePost(post._id));
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <CardContent>
        <Typography variant={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant={classes.title} variant="textSecondary">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
          disabled={!user?.result}
        >
          <Likes />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
