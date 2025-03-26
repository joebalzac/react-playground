import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

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

  

  const handlePostClick = (postId: number) => {
    setSelectedPostId(postId);
  };

  return (
    <ul>
      {posts.map((post) => {
        const author = users.find((user) => user.id === post.id);
        const postComments = comments.filter(
          (comment) => comment.postId === post.id
        );

        return (
          <li key={post.id} onClick={() => handlePostClick(post.id)}>
            <h2>{post.title}</h2>
            <p>{author ? `Author: ${author.name}` : "Unknown Author"}</p>
            <p>{post.body}</p>

            {selectedPostId === post.id && (
              <ul>
                {postComments.map((comment) => (
                  <li key={comment.id}>
                    <strong>{comment.name}</strong> ({comment.email})
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
