import React, { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  userId: number;
  name: string;
  username: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  body: string;
}

const SocialMediaPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

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

  const handleSelectedPost = (post: Post) => {
    setSelectedPost(post.id);
  };

  return (
    <div>
      {posts.map((post) => {
        const author = users.find((user) => user.id === post.id);
        const comment = comments.find((comment) => comment.id === post.id);

        return (
          <div>
            {post.title}
            {author?.name}
            <p>{post.body}</p>
            <button onClick={() => handleSelectedPost(post)}>Select</button>
            <div>{selectedPost === post.id && <div>{comment?.name}</div>}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SocialMediaPost;
