// const ROOT_URL = 'https://redux-blog-authenticate.herokuapp.com/api';
const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'http://redux-blog.herokuapp.com/api';
// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
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
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};


export function fetchPosts() {
  // ActionCreator returns a function
  // that gets called with dispatch
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then(response => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: { posts: response.data } });
    }).catch(error => {
      alert(error);
    });
  };
}

export function fetchPostsWithFilter(filter) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts?tagsFilter=${filter}`).then(response => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: { posts: response.data } });
    }).catch(error => {
      alert(error);
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      console.log(response);
      dispatch({ type: ActionTypes.FETCH_POST, payload: { post: response.data } });
    }).catch(error => {
      alert(error);
    });
  };
}

export function updatePost(id, post) {
  return (dispatch) => {
    const fields = { title: post.title, content: post.content, tags: post.tags };
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({ type: ActionTypes.UPDATE_POST, payload: null });
    }).catch(error => {
      alert('Run!');
    });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
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
    axios.post(`${ROOT_URL}/posts/${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      browserHistory.push('/');
      dispatch({ type: ActionTypes.CREATE_POST, payload: null });
    }).catch(error => {
      alert('Run!');
    });
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }) {
  return (dispatch) => {
    const fields = { email, password };
    axios.post(`${ROOT_URL}/signin`, fields).then(response => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch(error => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

export function signupUser({ email, password, username }) {
  return (dispatch) => {
    const fields = { email, password, username };
    axios.post(`${ROOT_URL}/signup`, fields).then(response => {
      console.log(response);
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch(error => {
      console.log(error);
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}


// deletes token from localstorage
// and deauths
export function signoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    browserHistory.push('/');
  };
}

export function searchTags(query) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/tags?query=${query}`).then(response => {
      console.log(response.data);
    });
  };
}
