import styled from 'styled-components';

 export const Profile = styled.div`
  background-color: white;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 7px;
  box-shadow: 2px 2.5px 4px -2px rgba(201,201,201,1);
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const InitName = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: #bdc3c7;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
`;

export const Nickname = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
`;

export const Contents = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-width: 1.5px;
  border-style: dotted;
  border-color: #bdc3c7;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const ContentTitle = styled.div`
  margin-bottom: 15px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #dff9fb;
    border: 1px solid black;
    width: 100px;
    padding-top: 2px;
    padding-bottom: 2px;
  }
`;