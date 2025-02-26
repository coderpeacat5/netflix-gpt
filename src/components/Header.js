import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"; // Correct import
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => { })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView())
  }

  const handleLangChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className="w-full bg-gradient-to-b from-black flex justify-between absolute z-40">

      <img src={LOGO_URL} alt="logo" className="w-72 px-6 py-2" />


      {user && (
        <div className="p-6 z-20 flex items-center justify-between relative">

          {showGptSearch && <select className="p-2 mx-6 bg-black bg-opacity-60 text-white cursor-pointer focus:border rounded" onChange={handleLangChange}>
            {SUPPORTED_LANGUAGES.map((lang) => <option key={lang.identifier} value={lang.identifier} className="bg-black bg-opacity-60 text-white">{lang.name}</option>)}
          </select>}

          <button className="bg-[#C73659] rounded px-4 py-2 text-white mr-6 shadow-md font-medium hover:shadow-xl"
            onClick={handleGptSearchClick}>{showGptSearch ? "Home" : "GPT Search"}</button>

          <img
            className="w-12 h-12 mr-2 cursor-pointer"
            src={user?.photoURL}
            alt="user-icon"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-white text-xl cursor-pointer"
          >
            ▼
          </button>

          {showDropdown && (
            <div className="absolute top-16 right-0 w-56 bg-gray-900 bg-opacity-95 rounded-lg shadow-lg p-2">
              <div className="flex flex-col">
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded">
                  <img className="w-8 h-8 rounded-full" src={user?.photoURL} alt="profile" />
                  <span className="text-white">{user.displayName}</span>
                </div>
                <div className="border-t border-gray-700 my-2"></div>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;