import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieDetails = () => {
  const movie = useParams();
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDP_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  let getData = async () => {
    try {
      let data = await fetch(
        `${API_BASE_URL}/movie/${movie.id}?language=en-US`,
        API_OPTIONS
      );
      let respnse = await data.json();
      console.log(respnse);
    } catch (error) {
      console.log("error fetching data from api", error);
    }
  };

  useEffect(() => {
    getData();
  }, [movie.id]);

  return (
    <div>
      <h1>{movie.id}</h1>
    </div>
  );
};
export default MovieDetails;
