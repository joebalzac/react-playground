import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = "585e3c362f1184df6a46acc6594ad300";
const SCI_FI_GENRE_ID = [878, 53, 80, 28];

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
}

const MovieWatchListTwo = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
  const [selectedMovieIds, setSelectedMovieIds] = useState<number[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: API_KEY,
            with_genres: SCI_FI_GENRE_ID.join(","),
          },
        }
      );
      const data: Movie[] = await res.data.results;
      setMovies(data);
    } catch (error) {
      setError("An unknown error has occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            params: { api_key: API_KEY },
          }
        );
        const data: Genre[] = await res.data.genres;
        setGenres(data);
      } catch (error) {
        setError("An unknown error occurred getting genres");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenres();
  }, []);

  console.log("Movies", movies);

  const handleAddMovie = (movie: Movie) => {
    setSelectedMovies([...selectedMovies, movie]);
  };

  const handleDeleteMovie = (id: number) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setSelectedMovieIds(
      e.target.checked
        ? [...selectedMovieIds, id]
        : selectedMovieIds.filter((movieId) => movieId !== id)
    );
  };

  const addCheckedMovies = () => {
    setSelectedMovies(
      movies.filter((movie) => selectedMovieIds.includes(movie.id))
    );
    setSelectedMovieIds([]);
  };

  const deleteAllMovies = () => {
    setMovies(movies.filter((movie) => !selectedMovieIds.includes(movie.id)));
    setSelectedMovieIds([]);
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="grid grid-cols-2">
          <div>
            <button onClick={addCheckedMovies}>Add Movies</button>
            <button onClick={deleteAllMovies}>Delete Movies</button>
            <ul className="grid grid-cols-3">
              {movies.map((movie) => {
                const genreNames = movie.genre_ids
                  .map((id) => genres.find((genre) => genre.id === id)?.name)
                  .filter(Boolean)
                  .join(",");

                return (
                  <li key={movie.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                      alt={movie.title}
                    />
                    {movie.title}
                    <ul>
                      <li>{genreNames}</li>
                    </ul>
                    <input
                      checked={selectedMovieIds.includes(movie.id)}
                      type="checkbox"
                      onChange={(e) => handleInputChange(e, movie.id)}
                    />
                    <button onClick={() => handleAddMovie(movie)}>
                      Add Movie
                    </button>
                    <button onClick={() => handleDeleteMovie(movie.id)}>
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            {selectedMovies ? (
              <div>
                {selectedMovies.map((movie) => (
                  <li key={movie.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                      alt={movie.title}
                    />
                    {movie.title}
                  </li>
                ))}
              </div>
            ) : (
              <div>Please add a movie to the list</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieWatchListTwo;
