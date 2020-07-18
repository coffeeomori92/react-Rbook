import styled from 'styled-components';
import { CommentOutlined } from '@ant-design/icons';

export const PostCard = styled.div`
  background: white;
  box-shadow: 2px 2.5px 4px -2px rgba(201,201,201,1);
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
`;

export const InitName = styled.div`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background-color: #bdc3c7;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

export const Nickname = styled.div`
  display: flex;
  margin-left: 15px;
  justify-content: center;
`;

export const PostToggle = styled.div`
  display: flex;
  font-size: 20px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 2px;
  margin-bottom: 7px;
  padding-bottom: 7px;
  div {
    cursor: pointer;
  }
  div:nth-child(1),
  div:nth-child(2),
  div:nth-child(3) {
    margin-right: 30px;
  }
`;

export const CommentIcon = styled(CommentOutlined)`
  outline: none;
`;

export const CommentNumber = styled.div`
  padding-left: 10px;
  font-size: 13.2px;
`;