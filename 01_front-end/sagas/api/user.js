import axois from 'axios';

export const signupAPI = data => axois.post('/user', data);
export const loginAPI = data => axois.post('/user/login', data);
export const logoutAPI = () => axois.post('/user/logout');
export const loadMyInfoAPI = () => axois.get('/user');
export const loadUserAPI = data => axois.get(`/user/${data}`);
export const changeNicknameAPI = data => axois.patch('/user/nickname', data);
