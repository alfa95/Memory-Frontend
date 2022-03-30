export const setUserId = (post) => async (dispatch) => {
  dispatch({ type: "SET_USER_ID", payload: post });
};
