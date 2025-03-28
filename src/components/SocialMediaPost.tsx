import { useEffect, useState } from "react";

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
    ]).then(([postsData, usersData, commentsData]) => {
      setPosts(postsData);
      setUsers(usersData);
      setComments(commentsData);
    });
  }, []);

  const handleSelectedPost = (id: number) => {
    setSelectedPost(id);
  };

  return (
    <div>
      {posts.map((post) => {
        const author = users.find((user) => user.id === post.id);
        const commentTitle = comments.find((comment) => comment.id === post.id);

        return (
          <div>
            <h3>{post.title}</h3>
            <button onClick={() => handleSelectedPost(post.id)}>Select</button>
            {selectedPost === post.id && <div>{commentTitle?.name}</div>}
            <p>{author?.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SocialMediaPost;
