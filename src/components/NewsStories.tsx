import axios from "axios";
import { useEffect, useState } from "react";

interface Article {
  title: string;
  author: string;
  description: string;
  url: string;
  id: number;
  read: boolean;
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
          id: `${Math.floor(Math.random() * 90) + 10}-${Date.now()}`,
          read: false,
        }));
        setArticles(articlesWithIds);
        console.log(articlesWithIds);
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
    setArticles(
      articles.map((a) => (a.id === article.id ? { ...a, read: true } : a))
    );
  };

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setSelectedArtcileIds(
      e.target.checked
        ? [...(selectedArticleIds || []), id]
        : selectedArticleIds?.filter((articleId) => articleId !== id) || null
    );
  };

  const toggleReadStatus = () => {
    setArticles(
      articles.map((article) => ({
        ...article,
        read: selectedArticleIds?.includes(article.id) ? true : article.read,
      }))
    );
  };

  const allSelectedAreRead = selectedArticleIds?.every(
    (id) => articles.find((article) => article.id === id)?.read === true
  );

  return (
    <div className="flex flex-col items-start bg-gray-100 min-h-screen p-6">
      <h1 className-="text-4xl font-bold text-gray-900 mb-6">
        TechCrunch News
      </h1>
      <div className="grid grid-cols-2">
        {isLoading ? (
          <div className="text-lg font-semibold text-gray-600">Loading....</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={toggleReadStatus}
              className="bg-amber-200 py-1 px-1 rounded-md cursor-pointer hover:bg-amber-300"
            >
              {allSelectedAreRead ? "Mark as unread" : "Mark as read"}
            </button>
            {articles.map((article) => (
              <div
                key={article.id}
                className={`p-4 rounded-lg shadow-md transition-transform transform cursor-pointer w-75 ${
                  article.read ? "bg-gray-300 border-gray-600" : "bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  onChange={(e) => handleInputChange(e, article.id)}
                />
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-600 pb-2">
                  {article.author || "Unknown Author"}
                </p>
                <div className="flex items-baseline gap-4 shrink-0 grow-0">
                  <button
                    className="w-full bg-blue-700 text-white py-1 px-1 rounded-md hover:bg-blue-700 transition"
                    onClick={() => handleSelectedArticle(article)}
                  >
                    Read More
                  </button>
                  <button
                    className="w-full bg-red-400 text-white py-1 px-1 rounded-md mt-2 hover:bg-red-700 transition"
                    onClick={() => handleDeleteArticle(article.id)}
                  >
                    Delete
                  </button>
                </div>
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
    </div>
  );
};

export default NewsStories;
