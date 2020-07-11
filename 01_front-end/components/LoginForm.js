import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../customHooks/useInput';
import { LOG_IN_REQUEST } from '../reducers/constants/user';
import { Form, buttonWrapper } from '../styles/LoginFormStyle';

const LoginForm = () => {
  const { loginLoading, loginError } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  
  useEffect(() => {
    if(loginError) {
      alert(loginError);
    }
  }, [loginError]);

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password }
    });
  }, [email, password]);

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
          <label>パスワード
            <input
              type="password"
              value={password}
              onChange={onChangePassword}
              required
            />
          </label>
          <div>
            <button>ログイン</button>
          </div>
      </Form>
    </>
  );
};

export default LoginForm;