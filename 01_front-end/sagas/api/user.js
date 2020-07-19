import axios from 'axios';

export const signupAPI = data => axios.post('/user', data);
export const loginAPI = data => axios.post('/user/login', data);
export const logoutAPI = () => axios.post('/user/logout');
export const loadMyInfoAPI = () => axios.get('/user');
export const loadUserAPI = data => axios.get(`/user/${data}`);
export const changeNicknameAPI = data => axios.patch('/user/nickname', data);
export const subscribeAPI = data => axios.patch(`/user/${data}/subscribe`);
export const unSubscribeAPI = data => axios.delete(`/user/${data}/subscribe`);
