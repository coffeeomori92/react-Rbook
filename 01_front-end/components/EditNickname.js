import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../customHooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/constants/user';
import { Form } from '../styles/EditNicknameStyle';

const EditNickname = () => {
  const dispatch = useDispatch();
  const { changeNicknameDone } = useSelector(state => state.user);
  const [nickname, onChangeNickname, setNickname] = useInput('');

  useEffect(() => {
    if(changeNicknameDone) {
      setNickname('');
    }
  }, [changeNicknameDone]);
  
  const onSubmit = useCallback(e => {
    e.preventDefault();
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: { nickname }
    })
  }, [nickname]);

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div>
          <input
            value={nickname}
            onChange={onChangeNickname}
            placeholder="ニックネーム"
          />
          <button>変更</button>
        </div>
      </Form>
    </>
  );
};

export default EditNickname;