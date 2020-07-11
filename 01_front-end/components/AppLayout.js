import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import useInput from '../customHooks/useInput';
import { 
  Menu, 
  MenuLogo, 
  MenuRight, 
  MenuInputSearch,
  SearchIcon,
  LeftSide,
  MainContents,
  RightSide
} from '../styles/AppLayoutStyle';

const AppLayout = ({ children }) => {
  const [searchInput ,onChangeSearchInput] = useInput('');
  const { me } = useSelector(state => state.user);
  const router = useRouter();
  const path = router.pathname;

  const onSearch = useCallback(() => {
    router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

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
      <div style={{display: 'flex'}}>
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
      </div>
    </>
  );
};

export default AppLayout;