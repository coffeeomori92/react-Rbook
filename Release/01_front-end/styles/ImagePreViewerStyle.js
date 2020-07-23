import styled from 'styled-components';

export const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #3c40c6;
  margin-top: 10px;
`;

export const Header = styled.div`
  background-color: white;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  padding: 10px;
  border-bottom: 1px dotted #3c40c6;
`;

export const HeaderFlex = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  div {
    border: 1px solid red;
    padding: 5px 10px;
    margin-right: 40px;
    cursor: pointer;
  }
`;

export const Img = styled.img`
  width: 100%;
  padding: 10px;
`;