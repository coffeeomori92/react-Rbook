import React from 'react';
import Link from 'next/link';
import { ContentArea } from '../styles/PostContentStyle';

const PostContent = ({ postData }) => {
  return (
    <ContentArea>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if(v.match(/(#[^\s#]+)/)) {
          return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
        }
        return v;
      })}
    </ContentArea>
  );
};

export default PostContent;