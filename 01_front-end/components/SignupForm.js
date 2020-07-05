import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Form, ErrorMsg } from '../styles/SignupFormStyle';
import { SIGN_UP_REQUEST } from '../reducers/constants/user';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();

  const onChangeEmail = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const onChangeNickname = useCallback(e => {
    setNickname(e.target.value);
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const onChangePasswordCheck = useCallback(e => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, [password]);

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
    if(password !== passwordCheck) {
      alert('パスワードを確認してください。')
      return setPasswordError(true);
    }
    console.log(email, nickname, password, passwordCheck);
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        nickname
      }
    });
  }, [email, nickname, password, passwordCheck]);
 
  return (
    <>
      <Form onSubmit={onSubmitForm}>
        <label>メール
          <input
            type="email"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </label>
        <label>ニックネーム
          <input
            type="text"
            value={nickname}
            onChange={onChangeNickname}
            required
          />
        </label>
        <label>パスワード
          <input
            type="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </label>
        <label>パスワードチェック
          <input
            type="password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required
          />
        </label>
        <div>
          {passwordError && passwordCheck !== '' && <ErrorMsg>パスワードが一致しません。</ErrorMsg>}
        </div>
        <div>
          <button>登録</button>
        </div>
      </Form>
    </>
  );
};

export default SignupForm;