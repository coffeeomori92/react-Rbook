import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/constants/user';
import { 
  Profile, 
  Avatar, 
  InitName, 
  Nickname, 
  Contents, 
  Content, 
  ContentTitle, ButtonWrapper } from '../styles/UserProfileStyle';

const UserProfile = () => {
  const { me, logoutLoading } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onClickLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST
    });
  }, []);

  return (
    <Profile>
      <Avatar>
        <InitName>
          <Link href={`/user/${me.id}`} prefetch={false}>
            <a>{me.nickname[0]}</a>
          </Link>
        </InitName>
        <Nickname>{me.nickname}</Nickname>
      </Avatar>
      <ButtonWrapper>
        <button onClick={onClickLogout}>ログアウト</button>
      </ButtonWrapper>
      <Contents>
        <Content>
          <Link href={`/user/${me.id}`}>
            <a>
              <ContentTitle>マイポスト</ContentTitle>
            </a>
          </Link>
          <div>{me.Posts.length}</div>      
        </Content>
        <Content>
          <ContentTitle>購読</ContentTitle>
          <div>{me.Producer.length}</div>
        </Content>
        <Content>
          <ContentTitle>リスナー</ContentTitle>
          <div>{me.Subscriber.length}</div>
        </Content>
      </Contents>
    </Profile>
  );
};

export default UserProfile;