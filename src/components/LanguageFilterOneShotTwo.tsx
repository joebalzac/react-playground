import React, { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  language: "en" | "cz";
}

const initialPosts: Post[] = [
  { id: 1, title: "Hello World", language: "en" },
  { id: 2, title: "React is fun", language: "en" },
  { id: 3, title: "Ahoj světe", language: "cz" },
  { id: 4, title: "React je zábava", language: "cz" },
];

const LanguageFilterOneShotTwo = () => {
  const [language, setLanguage] = useState<"en" | "cz">("en");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const filtered = initialPosts.filter((post) => post.language === language);
    setPosts(filtered);
  }, [language]);

  return (
    <div>
      <h1>Language Filter Demo</h1>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as "en" | "cz")}
        name=""
        id=""
      >
        <option value="en">English</option>
        <option value="en">Czech</option>
      </select>

      {posts.length === 0 ? (
        <div>No Post fouind</div>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageFilterOneShotTwo;
