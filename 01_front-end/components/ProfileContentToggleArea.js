import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Main, Header, Avatar, InitName, Nickname, BtnSubscriber, BtnProducer, AvatarCol1, AvatarCol2, BottomButtonArea } from '../styles/ProfileContentToggleAreaStyle';
import { UNSUBSCRIBE_REQUEST, REMOVE_SUBSCRIBER_REQUEST } from '../reducers/constants/user';

const ProfilecontentToggleArea = ({ subscribers, producers}) => {
  const dispatch = useDispatch();
  const [subscribersLimit, setSubscribersLimet] = useState(10);
  const [producersLimit, setProducersLimit] = useState(10);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [showProducers, setShowProducers] = useState(true);
  
  const onClickUnSubscribe = (id) => () => {
    dispatch({
      type: UNSUBSCRIBE_REQUEST,
      data: id
    });
  };

  const onClickShowSubscribers = useCallback(e => {
    if(showSubscribers) {
      return;
    }
    setShowSubscribers(true);
    setShowProducers(false);
  }, [showSubscribers, showProducers]);

  const onClickShowProducers = useCallback(e => {
    if(showProducers) {
      return;
    }
    setShowProducers(true);
    setShowSubscribers(false);
  }, [showProducers, showSubscribers]);

  return (
    <Container>
      <Header>
        <BtnProducer showProducers={showProducers} onClick={onClickShowProducers}>購読</BtnProducer>
        <BtnSubscriber showSubscribers={showSubscribers} onClick={onClickShowSubscribers}>リスナー</BtnSubscriber>
      </Header>
      <Main>
        {
          producers && showProducers && (
            producers.map(v => (
              <Avatar key={v.id}>
                <AvatarCol1>
                  <InitName>{v.nickname[0]}</InitName>
                  <Nickname>{v.nickname}</Nickname>
                </AvatarCol1>
                <AvatarCol2>
                  <button onClick={onClickUnSubscribe(v.id)}>購読済み</button>
                </AvatarCol2>
              </Avatar>      
            ))
          )
        }
        {
          subscribers && showSubscribers && (
            subscribers.map(v => (
              <Avatar key={v.id}>
                <AvatarCol1>
                  <InitName>{v.nickname[0]}</InitName>
                  <Nickname>{v.nickname}</Nickname>
                </AvatarCol1>
                <AvatarCol2>
                  
                </AvatarCol2>
              </Avatar>
            ))
          )
        }
        <BottomButtonArea>
          <button>もっと見る</button>
        </BottomButtonArea>
      </Main>
    </Container>
  );
};

export default ProfilecontentToggleArea;