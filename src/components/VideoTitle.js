import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" w-screen aspect-video pt-[10%] md:pt-[16%] px-6 md:px-8 absolute text-white bg-gradient-to-r from-gray-950/80 overflow-hidden">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="p-0 md:py-8 text-sm md:text-lg w-[80%] md:w-[30%] ">{overview}</p>
      <div className="mt-9 md:mt-0">
        <button className="bg-gray-500 text-white p-2 md:p-3 px-8 text-xl bg-opacity-50 rounded-lg font-medium hover:text-black hover:bg-slate-100">
        <FontAwesomeIcon icon={faPlay} className="mr-2" /> Play
        </button>
        <button className="mx-2 bg-gray-500 text-white p-2 md:p-3 px-5 text-xl bg-opacity-50 rounded-lg font-medium hover:text-black hover:bg-slate-100">
        <FontAwesomeIcon icon={faCircleInfo} className="mr-2" /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
