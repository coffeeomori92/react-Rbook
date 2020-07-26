export const BACK_END_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.reactrbook.com' 
  : 'http://localhost:8080';

  export const IMG_URL = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:8080/';

  export const VIDDEO_URL = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:8080/';