import styled from 'styled-components';

export const Container = styled.div`
  background-color: white;
  box-shadow: 2px 2.5px 4px -2px rgba(201,201,201,1);
  margin-top: 10px;
  height: 75vh;
  border-radius: 10px;
  position: relative;
`;

export const Header = styled.div`
  padding: 10px;
  border-bottom: 1px dotted #74b9ff;
  button {
    width: 100px;
    height: 30px;
    border-radius : 5px;
    border: none;
    outline: none;
    :nth-child(1){
      margin-right: 20px;
    }
  }
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-top: 10px;
`;

export const AvatarCol1 = styled.div`
  display: flex;
  align-items: center;
`;

export const AvatarCol2 = styled.div`
  button {
    -webkit-appearance: none;
    border: 1px solid #3c40c6;
    padding: 3.5px 15px;
    margin-right: 20px;
    background-color: white;
  }
`;

export const InitName = styled.div`
  border-radius: 50%;
  background-color: #bdc3c7;
  display: flex;
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

export const Nickname = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 10px;
`;

export const BtnSubscriber = styled.button`
  background-color: ${
    ({ showSubscribers }) => showSubscribers ? '#dfe6e9' : '#74b9ff'
  };
  cursor: ${
    ({ showSubscribers }) => showSubscribers ? 'default' : 'pointer'
  };
`;

export const BtnProducer = styled.button`
background-color: ${
    ({ showProducers }) => showProducers ? '#dfe6e9' : '#74b9ff'
  };
cursor: ${
    ({ showProducers }) => showProducers ? 'default' : 'pointer'
  };
`;

export const BottomButtonArea = styled.div`
  position: absolute;
  bottom: 30px;
  right: 50%;
`;