import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../customHooks/useInput';
import { Form } from '../styles/EditNicknameStyle';

const EditNickname = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const [nickname, onChangeNickname] = useInput('');
  return (
    <>
      <Form>
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