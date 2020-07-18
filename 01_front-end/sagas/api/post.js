import axios from 'axios';

export const loadPostsAPI = data => axios.get(`/posts?lastId=${data || 0}`);
export const loadPostAPI = data => axios.get(`/post/${data}`);
export const addPostAPI = data => axios.post(`/post`, data);
export const removePostAPI = data => axios.post(`/post/${data}`);
export const uploadImagesAPI = data => axios.post('/post/images', data);