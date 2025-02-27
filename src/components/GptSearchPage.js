// import React from 'react'

import { BG_URL } from "../utils/constants"
import GptMovieSuggestions from "./GptMovieSuggestions"
import GptSearchBar from "./GptSearchBar"
import {clearMovieResults} from '../utils/gptSlice'
import { useDispatch } from "react-redux"
import { useEffect } from "react"

const GptSearchPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearMovieResults()); // ✅ Clears movies when GPT page is unmounted
    };
  }, [dispatch]);

  return (
    <>
    <div className="fixed -z-10 ">
        <img src={BG_URL} alt="bg-img" className="h-screen object-cover md:w-screen"></img>
      </div>
      <div className="">
      <GptSearchBar />
      <GptMovieSuggestions />
      </div>
    </>
    

  )
}

export default GptSearchPage