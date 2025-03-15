import axios from "axios";
import React, { useEffect, useState } from "react";

const MovieWatchlist = () => {
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = axios.get(
          "https://api.themoviedb.org/3/science-fiction/movie/list",
          {
            params: {
              api_key: "585e3c362f1184df6a46acc6594ad300",
            },
          }
        );
      } catch (err) {
        if (error) {
          setError("an unknown error has occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };
  });

  return <div>MovieWatchlist</div>;
};

export default MovieWatchlist;
