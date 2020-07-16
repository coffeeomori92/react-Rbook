import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-left: 12.5px;
  background-color: #ffffff;
  height: 70px;
  box-shadow: 0px 10px 8px -12px rgba(184,184,184,1);
  margin-bottom: 10px;
  position: sticky;
`;

export const MenuLogo = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  font-size: 23px;
`;

export const MenuLogoImage = styled.a`
  margin-right: 10px;
`;

export const MenuInputSearch = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 250px;
      height: 25px;
      outline: none;
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 25px;
      background-color: #BDC3C7;
      color: #5352ed;
      border-radius: 2px;
      cursor: pointer;
      span {
        font-size: 17px;
      }
    }
  }
`;

export const MenuRight = styled.div`
  width: 20%;
  font-size: 18.3px;
`;

export const MenuRightAlign = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
`;

export const LeftSide = styled.div`
  width: 20%;
`;

export const MainContents = styled.div`
  width: 60%;
  margin-left: 15px;
  margin-right: 15px;
`;

export const RightSide = styled.div`
  width: 20%;
`;

export const SearchIcon = styled(SearchOutlined)`
  font-size: 12px;
`;
