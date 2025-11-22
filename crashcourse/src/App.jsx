import React, { useState, useEffect, use } from "react";
import Search from "./components/Search";
import MovieCards from "./components/MovieCards";
import { useDebounce } from "./hooks/useDebounce";
import  { getTrendingMovies, updateSearchCount } from "./appWrite";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDP_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
  
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
  
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error("TMDB error " + response.status);
  
      const data = await response.json();
      setMovieList(data.results || []);
  

      if (query && data.results?.length > 0) {
        await updateSearchCount(data.results[0], query);
      }
  
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
   
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.log(`'Error fetching the trending movies:'/${error}`);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []); 

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> you'll Enjoy
            Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
               <h2>Trending Movies</h2>

               <ul>
                  {trendingMovies.map((movie, index)=> (
                    <li key={movie.$id}>
                         <p>{index + 1}</p>
                         <img src={movie.poster_url} alt={movie.title} />
                    </li>
                  ))}
               </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCards key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
