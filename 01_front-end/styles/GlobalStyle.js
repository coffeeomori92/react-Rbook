import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  html,
  body {
    height: 100%;
    min-width: 500px;
  }
  body {
    background-color: #f5f5f5;
    font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    font-weight: 500;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  form {
    label {
      display: block;
      input {
        display: block;
      }
    }
  }
  button,
  input[type="submit"] {
    cursor: pointer;
  }
`;

export default GlobalStyle;