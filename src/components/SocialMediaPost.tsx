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
const SocialMediaPostTwo = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts").then((response) =>
      response.json().then((data) => setPosts(data))
    );

    fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
      response.json().then((data) => setUsers(data))
    );

    fetch("https://jsonplaceholder.typicode.com/posts/1/comments").then(
      (response) => response.json().then((data) => setComments(data))
    );
  }, []);

  const handleSelectedPost = (id: number) => {
    setSelectedPostId(id);
  };

  return (
    <div>
      <ul>
        {posts.map((post) => {
          const author = users.find((user) => user.id === post.id);
          const postComments = comments.filter(
            (comment) => comment.id === post.id
          );
          return (
            <li onClick={() => handleSelectedPost(post.id)} key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <p> {author?.name}</p>
              {selectedPostId === post.id && (
                <ul>
                  {postComments.map((comment) => (
                    <li key={comment.id}>
                      <h3>{comment.name}</h3>
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SocialMediaPostTwo;

// "https://jsonplaceholder.typicode.com/posts"
// "https://jsonplaceholder.typicode.com/users"
// "https://jsonplaceholder.typicode.com/posts/1/comments"
