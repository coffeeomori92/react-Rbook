import axois from 'axios';

export const signupAPI = data => axois.post('/user', data);