import Axios from "axios";

console.log(process.env.NODE_ENV);
const BASE_URL = "https://api.openai.com/v1/engines";

// Config Axios
const axiosInstance = Axios.create({
  baseURL: BASE_URL,
});

// Setup getAnswer() function to get answer to the question
export const getAnswer = async ({ prompt, engineId }) => {
  const data = {
    prompt,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  console.log(process.env.OPENAI_API_KEY);
  const option = {
    method: "post",
    url: `https://api.openai.com/v1/engines/${engineId}/completions`,
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
  };
  return axiosInstance(option);
};
