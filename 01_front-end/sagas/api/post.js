import axois from 'axios';
import Axios from 'axios';

export const loadPostsAPI = data => axois.get(`/post${data}`);
export const addPostAPI = data => axois.post(`/post`, data);
export const removePostAPI = data => axois.post(`/post/${data}`);