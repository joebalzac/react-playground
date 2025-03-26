import { useEffect, useState } from "react";
const [posts, setPosts] = useState([]);
const [users, setUsers] = useState([]);
const [comments, setComments] = useState<Comment[]>([]);
const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

const SocialMediaPost = () => {
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

  console.log(users, posts, comments);

  return (
    <div>
      {posts.map((post) => {
        return <div>{post}</div>;
      })}
    </div>
  );
};

export default SocialMediaPost;
