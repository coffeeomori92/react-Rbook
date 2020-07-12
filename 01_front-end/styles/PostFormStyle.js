import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  background-color: #F5F5F5;
  textarea {
    width: 100%;
    height: 100px;
    resize: none;
    box-shadow: 2px 2.5px 4px -2px rgba(201,201,201,1);
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
  & > div{
    width: 300px;
    &:nth-child(2) {
      margin-left: 2px;
      margin-right: 2px;
    }
  }
  button {
    width: 100%;
    padding-top: 7px;
    padding-bottom: 7px;
    background-color: #40A9FF;
    border: none;
    border-radius: 7px;
    color:#FFFFFF;
    font-weight: 200;
    font-size: 13px;
    --webkit-appearance: none;
    box-shadow: 2px 2.5px 4px -2px rgba(201,201,201,1);
  }
`;