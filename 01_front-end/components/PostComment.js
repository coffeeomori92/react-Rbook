import React from 'react';
import Link from 'next/link';
import { Comment, Avatar, InitName, Nickname, CommentTextArea } from '../styles/PostCommentStyle';

const PostComment = ({ author, content, authorId }) => {
  return (
    <Comment>
      <Avatar>
        <InitName>
          <Link href={`/user/${authorId}`} prefetch={false}>
            <a>{author[0]}</a>
          </Link>
        </InitName>
        <Nickname>{author}</Nickname>
      </Avatar>
      <CommentTextArea>{content}</CommentTextArea>
    </Comment>
  );
};

export default PostComment;