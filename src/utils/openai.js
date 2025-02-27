import { GEMINI_KEY} from './constants';

// const openai = new OpenAI({
//   apiKey: OPENAI_KEY, 
//   dangerouslyAllowBrowser: true,
// });

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(GEMINI_KEY);

export default genAI;