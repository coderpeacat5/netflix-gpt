import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants';
import { addTopRatedMovies } from '../utils/movieSlice';

const useTopRatedMovies = () => {
    const dispatch = useDispatch();

    const topRatedMovies = useSelector((store) =>store.movies.topRatedMovies)

    const getTopRatedMovies = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", API_OPTIONS)
        const json = await data.json()
        dispatch(addTopRatedMovies(json.results))
    }

    useEffect(() => {
        const controller = new AbortController();
        !topRatedMovies && getTopRatedMovies(controller.signal);
    
        return () => controller.abort(); // ✅ Cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    


}

export default useTopRatedMovies