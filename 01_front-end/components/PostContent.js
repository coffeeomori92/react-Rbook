import React from 'react';
import Link from 'next/link';
import { ContentArea, HashtagStyle } from '../styles/PostContentStyle';

const PostContent = ({ postData }) => {
  return (
    <ContentArea>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if(v.match(/(#[^\s#]+)/)) {
          return <Link prefetch={false} href={`/hashtag/${v.slice(1)}`} key={i}><HashtagStyle>{v}</HashtagStyle></Link>
        }
        return v;
      })}
    </ContentArea>
  );
};

export default PostContent;