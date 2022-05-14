import React, { useState } from "react";
import { getAnswer } from "../config/axios";

const Home = () => {
  const [text, setText] = useState();
  const getData = async () => {
    try {
      const {
        data: { choices },
      } = await getAnswer({
        prompt: "How you know girls like you?",
        engineId: "text-davinci-002",
      });
      // console.log(response);
      setText(choices[0].text);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={getData}>Click get answer</button>
      <p>{text}</p>
    </div>
  );
};

export default Home;
