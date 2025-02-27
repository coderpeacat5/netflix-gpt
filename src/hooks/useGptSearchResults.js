import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import genAI from '../utils/openai';
import { addGptMovieResults } from '../utils/gptSlice';
import Error from '../components/Error'

const useGptSearchResults = () => {
  const dispatch = useDispatch();

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async (searchText) => {
    if (!searchText.current.value) return; 

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt =
      `Act as a Movie Recommendation system and suggest some movies for the query: ${searchText.current.value}. 
      Only give me names of 10 movies, comma-separated like this example: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

    const result = await model.generateContent(prompt);
    const aiResponse = await result.response.text();

    if (!aiResponse) return <Error />;

    const aiMovies = aiResponse.split(",").map(movie => movie.trim());

    const promiseArray = aiMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    const filteredMovies = tmdbResults.map((tmdbMovieList, index) =>
      tmdbMovieList.find((movie) => movie.title.trim() === aiMovies[index])
    ).filter(Boolean);

    dispatch(addGptMovieResults({ movieNames: aiMovies, movieResults: filteredMovies }));
  };

  return handleGptSearchClick; // Return the function so it can be used in GptSearchBar
};

export default useGptSearchResults;
