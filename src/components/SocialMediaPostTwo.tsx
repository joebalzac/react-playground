import { useEffect, useState } from "react";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  userId: number;
  name: string;
}

interface Comment {
  id: number;
  name: string;
  title: string;
}

const SocialMediaPostTwo = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

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
      setComments(commentData);
      setUsers(userData);
    });
  }, []);

  const handleSelectedPost = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <div>
      {posts.map((post) => {
        const authors = users.find((user) => user.id === post.id);
        const commentPost = comments.find((comment) => comment.id === post.id);

        return (
          <div>
            {post.title}
            <h3>{authors?.name}</h3>
            {selectedPost?.id === post.id && <div>{commentPost?.name}</div>}
            <p>{post.body}</p>

            <button onClick={() => handleSelectedPost(post)}>Select</button>
          </div>
        );
      })}
    </div>
  );
};

export default SocialMediaPostTwo;
