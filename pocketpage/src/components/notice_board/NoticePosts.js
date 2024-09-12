// src/components/MainPage/ConceptPosts.js
import React, { useEffect, useState } from 'react';
import database from '../../firebase';

function ConceptPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    database.ref('conceptPosts').on('value', (snapshot) => {
      setPosts(snapshot.val() || []);
    });
  }, []);

  return (
    <div className="concept-posts">
      {posts.map((post, index) => (
        <div key={index} className="post-item">
          <h3>{post.title}</h3>
          <p>{post.summary}</p>
        </div>
      ))}
    </div>
  );
}

export default ConceptPosts;
