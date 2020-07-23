import styled from 'styled-components';

export const Form = styled.form`
  background-color: white;
  box-shadow: 2px 2.5px 4px -2px rgba(201,201,201,1);
  padding-left: 7px;
  padding-right: 7px;
  padding-top: 10px;
  padding-bottom: 15px;
  label {
    display: block;
    &:nth-child(1) {
      margin-bottom: 15px;
    }
    &:nth-child(2) {
      margin-bottom: 15px;
    }
    input {
      margin-top: 5px;
    }
  }
  label, input {
    width: 100%;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;