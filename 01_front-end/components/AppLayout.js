import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';

import LoginForm from './LoginForm';

import { 
  Menu, 
  MenuLogo, 
  MenuRight, 
  MenuInputSearch,
  SearchIcon
} from '../styles/AppLayoutStyle';

const LeftSide = styled.div`

`;

const MainContents = styled.div`

`;

const RightSide = styled.div`

`;

const AppLayout = ({ children }) => {
  const me = false;
  return (
    <>
      <Menu>
        <MenuLogo>
          <div><Link href="/"><a>Rbook</a></Link></div>
        </MenuLogo>
        <MenuInputSearch>
          <form>
            <input />
            <button><SearchIcon /></button>
          </form>
        </MenuInputSearch>
        <MenuRight>
          {
            me
            ? <Link href="/profile"><a>Profile</a></Link>
            : <Link href="/signup"><a>新規登録</a></Link>
          }
        </MenuRight>
      </Menu>
      <LeftSide>
        { me ? <UserProfile /> : <LoginForm /> }
      </LeftSide>
      <MainContents>
        { children }
      </MainContents>
      <RightSide>

      </RightSide>
    </>
  );
};

export default AppLayout;