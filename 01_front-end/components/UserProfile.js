import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = () => {
  const { me, logoutLoading } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onChangeLogout = useCallback(() => {

  }, []);

  return (
    <>
    user-profile
    </>
  );
};

export default UserProfile;