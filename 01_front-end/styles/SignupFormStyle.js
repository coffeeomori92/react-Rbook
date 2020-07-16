import styled from 'styled-components';

export const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 2px 2.5px 4px -2px rgba(201,201,201,1);
  border-radius: 12px;
  width: 500px;
  height: 450px;
`;

export const Label = styled.label`
  margin-bottom: 30px;
  width: 300px;
  input {
    margin-top: 7px;
    width: 100%;
  }
`;

export const LabelLast = styled.label`
   width: 300px;
   position: relative;
   input {
    margin-top: 7px;
    width: 100%;
  }
  div {
    margin-top: 2px;
  }
`;

export const ErrorMsg = styled.div`
  position: absolute;
  color: red;
`;

export const ButtonWrapper = styled.div`
  width: 300px;
  margin-top: 17px;
  display: flex;
  flex-direction: row-reverse;
  button {
    width: 70px;
  }
`;