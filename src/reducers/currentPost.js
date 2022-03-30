const currentPostReducer = (post = null, action) => {
  switch (action.type) {
    case "SET_USER_ID":
      return action.payload;
    default:
      return post;
  }
};

export default currentPostReducer;
