import { ActionTypes } from '../actions';

//
//
const PostsReducer = (state = { all: [], post: null }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload.posts };
    case ActionTypes.FETCH_POST:
      return { ...state, post: action.payload.post };
    default:
      return state;
  }
};
//
// const PostsReducer = (state = { all: [], post: null }, action) => {
//   switch (action.type) {
//     case ActionTypes.INCREMENT:
//       return state + 1;
//     case ActionTypes.DECREMENT:
//       return state - 1;
//     default:
//       return state;
//   }
// };

export default PostsReducer;
