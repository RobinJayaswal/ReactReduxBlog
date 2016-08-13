import React from 'react';
import { Link } from 'react-router';

export default function PostCard(props) {
  let tagStr = '';
  props.tags.forEach((tag, ind) => {
    tagStr += tag;

    tagStr += ind < props.tags.length - 1 ? ', ' : '';
  });
  return (
    <Link to={`posts/${props.postId}`}>
      <div className="post-card" >
        {props.title}
        <span>{tagStr}</span>
      </div>
    </Link>
  );
}
