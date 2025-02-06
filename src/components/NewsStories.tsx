import axios from "axios";
import { useEffect, useState } from "react";

interface Article {
  title: string;
  author: string;
  description: string;
}

const NewsStories = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedArticleIds, setSelectedArtcileIds] = useState<Number[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b0c42c59bd884d58a514298db3a01dfa"
        );
        const data = response.data;
        setArticles(data.articles);
        console.log("Big Data Dawg", data);
        console.log("News Stories Data", articles);
      } catch (error) {
        if (error) {
          setError("an unknown problem occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleSelectedArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <ul>
            {articles.map((article) => (
              <li>
                <h4>{article.title}</h4>
                <button
                  onClick={() => {
                    handleSelectedArticle(article);
                  }}
                >
                  Select Article
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedArticle ? (
        <div>
          <h4>{selectedArticle.title}</h4>
          <h5>{selectedArticle.author}</h5>
          <p>{selectedArticle.description}</p>
        </div>
      ) : (
        <div>{null}</div>
      )}
    </div>
  );
};

export default NewsStories;
