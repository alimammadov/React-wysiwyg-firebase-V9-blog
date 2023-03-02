const LikeReducer = (state, action) => {
    switch (action.type) {
      case "LIKE": {
        return {
          likes: action.payload,
        };
      }
      case "UNLIKE": {
        return {
          likes: null,
        };
      }
      default:
        return state;
    }
  };
  export default LikeReducer;