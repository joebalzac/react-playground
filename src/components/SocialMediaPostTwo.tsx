import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface User {
  userId: number;
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const SocialMediaPostTwo = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
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
      setUsers(userData);
      setComments(commentData);
    });
  });

  const handleSelectedPost = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <div>
      {posts.map((post) => {
        const authors = users.find((user) => user.id === post.id);
        const postComments = comments.find((comment) => comment.id);
        return (
          <div>
            <div key={post.id}>
              {post.title}
              {authors?.name}
              <p>{post.body}</p>
              <button onClick={() => handleSelectedPost(post)}>
                Select Post
              </button>
            </div>
            {selectedPost?.id === post.id && (
              <div>
                {postComments?.name}
                <p>{postComments?.body}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SocialMediaPostTwo;
