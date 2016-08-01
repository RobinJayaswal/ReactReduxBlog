import React from 'react';
import { Link } from 'react-router';

export default function PostCard(props) {
  return (
    <Link to={`posts/${props.postId}`}>
      <div className="post-card" >
        {props.title}
        <span>{props.tags}</span>
      </div>
    </Link>
  );
}
