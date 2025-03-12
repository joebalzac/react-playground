import { useEffect, useState } from "react";

interface User {
  userId: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const SocialMediaPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>();

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

  console.log("Posts", posts);
  console.log("Users", users);
  console.log("Comments", comments);

  const handleSelectedPost = (id: number) => {
    setSelectedPostId(id);
  };

  return (
    <div>
      <ul>
        {posts.map((post) => {
          const author = users.find((name) => name.userId === post.id);
          const postComments = comments.filter(
            (comment) => comment.id === post.id
          );
          return (
            <li onClick={() => handleSelectedPost(post.id)}>
              <h2>{post.title}</h2>
              {author?.name}
              <p>{post.body}</p>

              {selectedPostId === post.id && (
                <ul>
                  {postComments.map((comment) => (
                    <li>
                      <h3> {comment.name}</h3>
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

export default SocialMediaPost;
