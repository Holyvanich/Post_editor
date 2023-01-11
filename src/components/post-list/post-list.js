import React from 'react';

import Postlistitem from '../post-list-item';

import './post-list.css';

const PostList = ({ posts, OnDelete, onToggle }) => {
  const elements = posts.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="list-group-item">
        <Postlistitem
          {...itemProps}
          OnDelete={() => OnDelete(id)}
          onToggleImportant={() => onToggle(id, 'important')}
          onToggleLiked={() => onToggle(id, 'like')}
        />
      </li>
    );
  });

  return <ul className="app-list list-group">{elements}</ul>;
};

export default PostList;
