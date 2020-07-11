import axois from 'axios';

export const signupAPI = data => axois.post('/user', data);
export const loginAPI = data => axois.post('/user/login', data);