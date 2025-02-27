import React, { useRef } from 'react';
import lang from '../utils/languageConstants';
import { useSelector } from 'react-redux';
import useGptSearchResults from '../hooks/useGptSearchResults';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const handleGptSearchClick = useGptSearchResults(); // Get the function from hook

  return (
    <div className='flex justify-center pt-[50%] md:pt-[10%] bg-inherit mb-2'>
      <form className='w-full md:w-1/2 p-5 bg-black mb-6 grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
        <input ref={searchText} type='text' className='col-span-9 p-4' placeholder={lang[langKey].gptSearchPlaceholder} />
        <button
          className='bg-red-600 text-white col-span-3 p-4 ml-3 hover:bg-red-700'
          onClick={() => handleGptSearchClick(searchText)} // Pass ref to function
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
