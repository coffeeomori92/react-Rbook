import React from 'react';
import styled from 'styled-components';

const Form = styled.div`
  & label {
    display: block;
  }
`;

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