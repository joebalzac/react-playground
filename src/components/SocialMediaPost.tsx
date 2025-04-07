import React, { useEffect, useState } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Comment {
  postId: number;
  name: string;
  email: string;
  body: string;
}

const SocialMediaPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
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

  const handleSelectedPost = (id: number) => {
    setSelectedPost(id);
  };

  return (
    <div>
      <div>
        {posts.map((post) => {
          const authors = users.find((user) => user.id === post.id);
          const postComment = comments.find(
            (postComment) => postComment.postId === post.id
          );

          return (
            <div>
              <div>
                {post.title}
                <h3>{authors?.name}</h3>
                {selectedPost === post.id && <div>{postComment?.name}</div>}
                <p>{post.body}</p>
                <button onClick={() => handleSelectedPost(post.id)}>
                  Select Post
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialMediaPost;
