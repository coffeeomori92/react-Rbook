import styled from 'styled-components';

 export const Profile = styled.div`
  background-color: white;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 10px;
  box-shadow: 2px 2.5px 4px -2px rgba(201,201,201,1);
  margin-bottom: 20px;
`;

export const Avatar = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const InitName = styled.div`
  border-radius: 50%;
  margin-left: 35px;
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
  width: 20%;
  justify-content: center;
`;

export const Contents = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-around;
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