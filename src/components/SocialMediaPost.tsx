import React, { useEffect, useState } from "react";

const SocialMediaPost = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/comments").then((res) =>
        res.json()
      ),
    ]).then(([postData, userData, commentData]) => {
      setPosts(postData);
      setUsers(userData);
      setComments(commentData);
    });
  }, []);

  return <div>SocialMediaPost</div>;
};

export default SocialMediaPost;
