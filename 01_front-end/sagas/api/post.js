import axios from 'axios';

export const loadPostsAPI = data => axios.get(`/posts?lastId=${data || 0}`);
export const loadPostAPI = data => axios.get(`/post/${data}`);
export const addPostAPI = data => axios.post(`/post`, data);
export const addCommentAPI = data => axios.post(`/post/${data.postId}/comment`, data);
export const likePostAPI = data => axios.post(`/post/${data}/like`);
export const unLikePostAPI = data => axios.delete(`/post/${data}/like`);
export const removePostAPI = data => axios.post(`/post/${data}`);
export const uploadImagesAPI = data => axios.post('/post/images', data);