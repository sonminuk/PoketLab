// src/components/MainPage/RecommendedPosts.js
import React, { useEffect, useState } from 'react';
import database from '../../firebase';

function RecommendedPosts() {
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  useEffect(() => {
    database.ref('recommendedPosts').on('value', (snapshot) => {
      setRecommendedPosts(snapshot.val() || []);
    });
  }, []);

  return (
    <div className="recommended-posts">
      {recommendedPosts.map((post, index) => (
        <div key={index} className="post-item">
          <h3>{post.title}</h3>
          <p>{post.summary}</p>
        </div>
      ))}
    </div>
  );
}

export default RecommendedPosts;
