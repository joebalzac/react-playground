import axios from "axios";
import { useEffect, useState } from "react";

interface Article {
  title: string;
  author: string;
  description: string;
  url: string;
  id: number;
}

const NewsStories = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedArticleIds, setSelectedArtcileIds] = useState<Number[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const apiKey = "b0c42c59bd884d58a514298db3a01dfa";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines",
          {
            params: {
              sources: "techcrunch",
              apiKey: apiKey,
            },
          }
        );
        const data = response.data;
        const articlesWithIds = data.articles.map((article: Article) => ({
          ...article,
          id: Math.floor(Math.random() * 90) + 10,
          read: false,
        }));
        setArticles(articlesWithIds);
      } catch (error) {
        if (error) {
          setError("An unknown problem occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleSelectedArticle = (article: Article) => {
    setSelectedArticle(article);
    setArticles(articles.map((article) => ({ ...article, read: true })));
  };

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">TechCrunch News</h1>

      {isLoading ? (
        <div className="text-lg font-semibold text-gray-600">Loading....</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {articles.map((article) => (
            <div
              key={article.id}
              className={`p-4 border rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer ${
                selectedArticle?.id === article.id
                  ? "bg-gray-300 border-gray-600"
                  : "bg-white"
              }`}
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {article.title}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                {article.author || "Unknown Author"}
              </p>
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                onClick={() => handleSelectedArticle(article)}
              >
                Read More
              </button>
              <button
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-red-700 transition"
                onClick={() => handleDeleteArticle(article.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedArticle && (
        <div className="mt-8 w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {selectedArticle.title}
          </h2>
          <h3 className="text-md text-gray-600 mb-4">
            {selectedArticle.author || "Unknown Author"}
          </h3>
          <p className="text-gray-700">{selectedArticle.description}</p>
          <a
            href={selectedArticle.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 text-blue-500 hover:underline"
          >
            Read Full Article →
          </a>
        </div>
      )}
    </div>
  );
};

export default NewsStories;
