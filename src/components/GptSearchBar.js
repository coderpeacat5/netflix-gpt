import React from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang)

  return (
    <div className='flex justify-center pt-[10%] bg-inherit'>
        <form className='w-1/2 p-5 bg-black mb-6 grid grid-cols-12'>
        <input type='text' className='col-span-9 p-4' placeholder={lang[langKey].gptSearchPlaceholder}/>
        <button className='bg-red-600 text-white col-span-3 p-4 ml-3 hover:bg-red-700'>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar