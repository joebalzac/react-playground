import axios from "axios";
import { useEffect, useState } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
}

interface User {
  id: number;
  name: string;
  username: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
}

const SocialMediaPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res)
        .then((data) => data),
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => res)
        .then((data) => data),
      axios
        .get("https://jsonplaceholder.typicode.com/comments")
        .then((res) => res)
        .then((data) => data),
    ]).then(([postsData, usersData, commentsData]) => {
      setPosts(postsData.data);
      setUsers(usersData.data);
      setComments(commentsData.data);
    });
  }, []);

  console.log("here is the data", posts, users, comments);

  const handleSelectedPost = (id: number) => {
    setSelectedPost(id);
  };

  return (
    <div>
      {posts.map((post) => {
        const author = users.find((user) => user.id === post.id);
        const postComment = comments.find((comment) => comment.id === post.id);
        return (
          <div key={post.id}>
            {post.title}
            <button onClick={() => handleSelectedPost(post.id)}>
              Select Post
            </button>
            {selectedPost === post.id && <div>{postComment?.name}</div>}
            <p>
              {author?.name} - {author?.username}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SocialMediaPost;
