import React, { useEffect, useState } from "react";

const SocialMediaPost = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

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
    ]).then(([postsData, usersData, commentsData]) => {
      setPosts(postsData);
      setUsers(usersData);
      setComments(commentsData);
    });
  }, []);

  console.log(posts, users, comments);

  return <div>SocialMediaPost</div>;
};

export default SocialMediaPost;
