import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

const MovieDetails = () => {
  const { id } = useParams();

  const [movieData, setMovieData] = useState(null);
  const [creditData, setCreditData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDP_API_KEY;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const movieRes = await fetch(
          `${API_BASE_URL}/movie/${id}?language=en-US`,
          API_OPTIONS
        );

        const creditRes = await fetch(
          `${API_BASE_URL}/movie/${id}/credits?language=en-US`,
          API_OPTIONS
        );

        const movieJson = await movieRes.json();
        const creditJson = await creditRes.json();

        setMovieData(movieJson);
        setCreditData(creditJson);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
      <Spinner />
    </div>
    );

  if (!movieData) return null;

  const bgImage = `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`;

  return (
    <div
      className="relative min-h-screen text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
 
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

     
      <div className="relative z-10 container mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16">
        
   
        <div className="flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={movieData.title}
            className="rounded-2xl shadow-lg w-[350px]"
          />
        </div>


        <div>
          <h1 className="text-5xl font-bold mb-6">{movieData.title}</h1>

          <p className="text-lg opacity-90 italic mb-8 leading-relaxed">
            {movieData.overview}
          </p>

      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white/10 p-4 rounded-xl border border-white/10">
              <p><strong>Language:</strong> {movieData.original_language}</p>
              <p><strong>Release:</strong> {movieData.release_date}</p>
              <p><strong>Rating:</strong> ⭐ {movieData.vote_average}</p>
              <p><strong>Popularity:</strong> {movieData.popularity}</p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl border border-white/10">
              <h3 className="font-semibold text-lg mb-2">Spoken Languages</h3>
              <ul className="space-y-1">
                {movieData?.spoken_languages?.map((lang, index) => (
                  <li key={index}>{lang.english_name}</li>
                ))}
              </ul>
            </div>
          </div>
     
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Genres</h2>
            <div className="flex flex-wrap gap-3">
              {movieData.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

         
          <div>
            <h2 className="text-3xl font-semibold mb-4">Top Cast</h2>
            <ul className="space-y-3">
              {creditData?.cast?.slice(0, 8)?.map((actor) => (
                <li key={actor.id} className="flex items-center gap-3">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : "https://via.placeholder.com/50"
                    }
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span>
                    <strong>{actor.name}</strong> — {actor.character}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;
