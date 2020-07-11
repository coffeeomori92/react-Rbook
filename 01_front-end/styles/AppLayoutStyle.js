import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  height: 70px;
  box-shadow: 0px 10px 8px -12px rgba(184,184,184,1);
  margin-bottom: 10px;
  position: sticky;
`;

export const MenuLogo = styled.div`
  
`;

export const MenuInputSearch = styled.div`

`;

export const MenuRight = styled.div`

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
