import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Comments(props) {
  const { recipeId } = props;
  const [comments, setComments] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchComments(id) {
      const response = await axios.get(`http://localhost:4000/comments/${id}`);

      if (isMounted) {
        setComments(response.data);
      }
    }

    fetchComments(recipeId);

    return () => {
      isMounted = false;
    };
  }, [recipeId]);

  if (!comments) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.content}</p>
            <p>By {comment.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
