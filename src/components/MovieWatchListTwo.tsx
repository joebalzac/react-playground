import axios from "axios";
import React, { useEffect, useState } from "react";

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
  const [addedMovieIds, setAddedMovieIds] = useState<Number[]>([]);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingTitleId, setEditingTitleId] = useState<number | null>(null);
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
    setSelectedMovies(selectedMovies.filter((movie) => movie.id !== id));
  };

  const handleEditTitle = (title: string, id: number) => {
    setEditingTitle(title);
    setEditingTitleId(id);
  };

  const handleSaveEditTitle = () => {
    if (editingTitleId !== null && editingTitle.trim()) {
      setMovies(
        movies.map((movie) =>
          movie.id === editingTitleId
            ? { ...movie, title: editingTitle }
            : movie
        )
      );
      setEditingTitleId(null);
    }
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

  // Handle all functions

  const addCheckedMovies = () => {
    setSelectedMovies(
      movies.filter((movie) => selectedMovieIds.includes(movie.id))
    );
    setSelectedMovieIds([]);
  };

  const deleteCheckedMovies = () => {
    setMovies(movies.filter((movie) => !selectedMovieIds.includes(movie.id)));
    setSelectedMovieIds([]);
  };

  // Selected Movie Section

  const handleRemoveMovie = (id: number) => {
    setSelectedMovies(selectedMovies.filter((movie) => movie.id !== id));
  };

  const handleAddedMovieInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setAddedMovieIds(
      e.target.checked
        ? [...addedMovieIds, id]
        : addedMovieIds.filter((addedMovieId) => addedMovieId !== id)
    );
  };

  const handleRemoveAllSelectedMovies = () => {
    setSelectedMovies(
      selectedMovies.filter((movieId) => !addedMovieIds.includes(movieId.id))
    );
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="grid grid-cols-2">
          <div>
            <button onClick={addCheckedMovies}>Add Movies</button>
            <button onClick={deleteCheckedMovies}>Delete Movies</button>
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
                    {editingTitleId === movie.id ? (
                      <div>
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                        />
                        <button onClick={handleSaveEditTitle}>Save</button>
                      </div>
                    ) : (
                      <div>{movie.title}</div>
                    )}

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
                    <button
                      onClick={() => handleEditTitle(movie.title, movie.id)}
                    >
                      Edit
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            {selectedMovies ? (
              <div>
                <button onClick={() => handleRemoveAllSelectedMovies()}>
                  Remove all selected movies
                </button>
                {selectedMovies.map((selectedMovie) => (
                  <li key={selectedMovie.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${selectedMovie.backdrop_path}`}
                      alt={selectedMovie.title}
                    />
                    {selectedMovie.title}
                    <input
                      type="checkbox"
                      checked={addedMovieIds.includes(selectedMovie.id)}
                      onChange={(e) =>
                        handleAddedMovieInputChange(e, selectedMovie.id)
                      }
                    />
                    <button onClick={() => handleRemoveMovie(selectedMovie.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </div>
            ) : (
              <div>Please add a movie to the list</div>
            )}
          </div>
          {error && <p className="text-red-400">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default MovieWatchListTwo;
