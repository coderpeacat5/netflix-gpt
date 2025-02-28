import { useEffect } from "react";
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utils/movieSlice';

// Fetch Data from TMDB API and Update the Store

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies)

  const getNowPlayingMovies = async () => {

    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addNowPlayingMovies(json.results))
  };

  useEffect(() => {
    const controller = new AbortController();
    !nowPlayingMovies && getNowPlayingMovies(controller.signal);

    return () => controller.abort(); // ✅ Cleanup
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

}

export default useNowPlayingMovies