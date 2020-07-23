import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  width: 100%;
  height: 6vh;
  margin-bottom: 15px;
  textarea {
    width: 90%;
    resize: none;
  }
  button {
    width: 10%;
    background-color: #1890FF;
    border: 1px solid black;
    border-radius: 2.5px;
    color: white;
    font-weight: 400;
  }
`;