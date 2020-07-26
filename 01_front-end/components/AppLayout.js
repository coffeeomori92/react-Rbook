import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RadarChartOutlined } from '@ant-design/icons';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import SearchHashtag from './SearchHashtag';
import useInput from '../customHooks/useInput';
import { 
  Menu, 
  MenuLogo,
  MenuLogoImage, 
  MenuRight,
  MenuRightAlign,
  MenuInputSearch,
  FlexBox,
  LeftSide,
  MainContents,
  RightSide
} from '../styles/AppLayoutStyle';

const AppLayout = ({ children }) => {
  const [searchInput ,onChangeSearchInput] = useInput('');
  const { me } = useSelector(state => state.user);
  const router = useRouter();
  const path = router.pathname;

  return (
    <>
      <Menu>
        <MenuLogo>
          <Link href="/"><MenuLogoImage><RadarChartOutlined /></MenuLogoImage></Link>
          <Link href="/"><a>Rbook</a></Link>
        </MenuLogo>
        <MenuInputSearch>
          <SearchHashtag />
        </MenuInputSearch>
        <MenuRight>
          <MenuRightAlign>
            <div></div>
            {
              me
              ? <div><Link href="/profile"><a>Profile</a></Link></div>
              : <div><Link href="/signup"><a>新規登録</a></Link></div>
            }
            <div></div>
          </MenuRightAlign>
        </MenuRight>
      </Menu>
      <FlexBox>
      <LeftSide>
        { me && path !== '/signup' && <UserProfile />}
        { !me && path !== '/signup' && <LoginForm /> }
        { me && path === '/signup' && null}
      </LeftSide>
      <MainContents>
        { children }
      </MainContents>
      <RightSide>

      </RightSide>
      </FlexBox>
    </>
  );
};

export default AppLayout;