import React from "react";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames || !movieResults) return null;

  return (
    <div className="p-4 m-5 bg-black bg-opacity-60 text-white flex flex-wrap justify-center items-center">
      {movieResults
        .filter((movie) => movie.poster_path) // Only keep movies with posterPath
        .map((movie, index) => (
          <div className="p-0 md:p-2 mx-1 mb-12 cursor-pointer hover:shadow-xl flex flex-col justify-evenly items-center transform transition-transform duration-200 hover:scale-105" key={index}>
            <img
              src={IMG_CDN_URL + movie.poster_path}
              alt={movie.title || "movie poster"}
              className="rounded w-24 md:w-44 my-2 "
            />
            <h1 className="md:text-lg w-28 md:w-44 md:h-20 text-center font-semibold">{movie.title}</h1>
          </div>
        ))}
    </div>
  );
};

export default GptMovieSuggestions;
