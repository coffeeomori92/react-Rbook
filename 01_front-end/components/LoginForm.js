import React from 'react';

import { Form, buttonWrapper } from '../styles/LoginFormStyle';

const LoginForm = () => {
  return (
    <>
      <Form>
          <label>
            メール
            <input
              type="email"
            />
          </label>
          <label>
            パスワード
            <input
              type="passwords"
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