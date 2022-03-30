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
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { setUserId } from "../../../actions/currentPost";

const Post = ({ post }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      ></CardMedia>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
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
          <MenuItem key={`delete${post._id}`} onClick={() => {}}>
            Delete
          </MenuItem>
        </Menu>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <CardContent>
        <Typography variant={classes.title} variant="h5" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpAltIcon />
          Post
          {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => {}}>
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
