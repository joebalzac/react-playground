import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = "585e3c362f1184df6a46acc6594ad300";
const SCI_FI_GENRE_ID = [878, 53, 80, 28];

interface Movie {
  title: string;
  id: number;
  release_date: string;
  backdrop_path: string;
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
}

const MovieWatchlist = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedMovieIds, setSelectedMovieIds] = useState<number[]>([]);
  const [addedMovieIds, setAddedMovieIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError("");

      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              api_key: API_KEY,
              with_genres: SCI_FI_GENRE_ID.join(","),
            },
          }
        );

        setMovies(res.data.results || []);
      } catch (error) {
        if (error) {
          setError("An unknown error has occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            params: { api_key: API_KEY },
          }
        );
        setGenres(res.data.genres || []);
      } catch (error) {
        setError("Failed to fetch genres");
      }
    };
    fetchGenres();
  }, []);

  const handleAddMovie = (movie: Movie) => {
    setSelectedMovies((prevSelectedMovies) => [...prevSelectedMovies, movie]);
  };

  const handleRemoveMovie = (movie: Movie) => {
    setSelectedMovies(selectedMovies.filter((m) => m.id !== movie.id));
  };

  const handleDeleteMovie = (id: number) => {
    setMovies(movies.filter((movie) => movie.id !== id));
    setSelectedMovies(selectedMovies.filter((movie) => movie.id !== id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setSelectedMovieIds(
      e.target.checked
        ? [...selectedMovieIds, id]
        : selectedMovieIds.filter((movie) => movie !== id)
    );
  };

  const handleSelectedInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setAddedMovieIds(
      e.target.checked
        ? [...addedMovieIds, id]
        : addedMovieIds.filter((movieId) => movieId !== id)
    );
  };

  const addAllMovies = () => {
    setSelectedMovies(
      movies.filter((movie) => selectedMovieIds.includes(movie.id))
    );
    setSelectedMovieIds([]);
  };

  const deleteAllMovies = () => {
    setMovies(movies.filter((movie) => !selectedMovieIds.includes(movie.id)));
  };

  const handleRemoveAllMovies = () => {
    setSelectedMovies(
      selectedMovies.filter((movie) => !addedMovieIds.includes(movie.id))
    );
    setAddedMovieIds([]);
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="grid grid-cols-2">
          <div>
            <button onClick={addAllMovies}>Add Movies</button>
            <button onClick={deleteAllMovies}>Delete Movies</button>
            <ul className="grid grid-cols-3">
              {movies.map((movie) => {
                const genreNames = movie.genre_ids
                  .map((id) => genres.find((genre) => genre.id === id)?.name)
                  .filter(Boolean)
                  .join("");
                return (
                  <div>
                    <li key={movie.id}>
                      <input
                        type="checkbox"
                        checked={selectedMovieIds.includes(movie.id)}
                        onChange={(e) => handleInputChange(e, movie.id)}
                      />
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt={movie.title}
                      />
                      <h2>{movie.title}</h2>
                      <p>{movie.release_date}</p>
                      <ul>
                        <li>{genreNames}</li>
                      </ul>
                      <button onClick={() => handleAddMovie(movie)}>Add</button>
                      <button onClick={() => handleDeleteMovie(movie.id)}>
                        Delete
                      </button>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
          <div>
            <h3>Movie Watch List</h3>
            {selectedMovies ? (
              <div>
                <button onClick={handleRemoveAllMovies}>Remove Movies</button>
                <ul className="grid grid-cols-2">
                  {selectedMovies.map((movie) => (
                    <li key={movie.id}>
                      <input
                        type="checkbox"
                        checked={addedMovieIds.includes(movie.id)}
                        onChange={(e) => handleSelectedInputChange(e, movie.id)}
                      />
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt={movie.title}
                      />
                      {movie.title}
                      <button onClick={() => handleRemoveMovie(movie)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>Please select a movie to add to the list</div>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default MovieWatchlist;
