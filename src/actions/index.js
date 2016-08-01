const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=r_jayaswal';
import axios from 'axios';
import { browserHistory } from 'react-router';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
};


// export function fetch() {
//   return {
//     type: ActionTypes.FETCH_POSTS,
//     payload: null,
//   };
// }


export function fetchPosts() {
  // ActionCreator returns a function
  // that gets called with dispatch
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then(response => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: { posts: response.data } });
    }).catch(error => {
      alert('Run!');
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: { post: response.data } });
    }).catch(error => {
      alert('Run!');
    });
  };
}

export function updatePost(id, post) {
  return (dispatch) => {
    const fields = { title: post.title, content: post.content, tags: post.tags };
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields).then(response => {
      dispatch({ type: ActionTypes.UPDATE_POST, payload: null });
    }).catch(error => {
      alert('Run!');
    });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      browserHistory.push('/');
      dispatch({ type: ActionTypes.DELETE_POST, payload: null });
    }).catch(error => {
      alert('Run!');
    });
  };
}

export function createPost(post) {
  return (dispatch) => {
    const fields = { title: post.title, content: post.content, tags: post.tags };
    axios.post(`${ROOT_URL}/posts/${API_KEY}`, fields).then(response => {
      browserHistory.push('/');
      dispatch({ type: ActionTypes.CREATE_POST, payload: null });
    }).catch(error => {
      alert('Run!');
    });
  };
}
