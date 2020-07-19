import styled from 'styled-components';

export const SettingStyle = styled.div`
  display: flex;
  font-size: 15px;
  margin-left: 20px;
  span {
    padding: 1.7px;
  }
  span:first-child {
    border: 1.5px solid #0984e3;
    margin-right: 10px;
    &:hover {
      background-color: #74b9ff;
    }
  }
  span:nth-child(2) {
    border: 1.5px solid red;
    &:hover {
      background-color: #ff3f34;
    }
  }
`;