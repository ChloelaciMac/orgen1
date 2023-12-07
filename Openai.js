import { Configuration, OpenAIApi } from "openai";
const config = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY
});
const openai = new OpenAIApi(config);

export default openai;