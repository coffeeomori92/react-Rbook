import React, { useState, useCallback } from 'react';
import { Container, Main, Header, Avatar, InitName, Nickname, BtnSubscriber, BtnProducer } from '../styles/ProfileContentToggleAreaStyle';

const ProfilecontentToggleArea = ({ subscribers, producers }) => {
  const [showSubscribers, setShowSubscribers] = useState(true);
  const [showProducers, setShowProducers] = useState(false);

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
        <BtnSubscriber showSubscribers={showSubscribers} onClick={onClickShowSubscribers}>リスナー</BtnSubscriber>
        <BtnProducer showProducers={showProducers} onClick={onClickShowProducers}>購読</BtnProducer>
      </Header>
      <Main>
        {
          subscribers && showSubscribers && (
            subscribers.map(v => (
              <Avatar key={v.id}>
                <InitName>{v.nickname[0]}</InitName>
                <Nickname>{v.nickname}</Nickname>
              </Avatar>
            ))
          )
        }
        {
          producers && showProducers && (
            producers.map(v => (
              <Avatar key={v.id}>
                <InitName>{v.nickname[0]}</InitName>
                <Nickname>{v.nickname}</Nickname>
              </Avatar>
            ))
          )
        }
      </Main>
    </Container>
  );
};

export default ProfilecontentToggleArea;