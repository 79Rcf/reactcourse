import { createContext, useContext, useRef, useState } from "react";

const JokeContext = createContext();

function JokeProvider({ children }) {
  const jokesRef = useRef([]);
  const [current, setCurrent] = useState(0);

  const getJokes = async () => {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    );

    const data = await response.json();

    jokesRef.current.push(data);
    setCurrent(jokesRef.current.length - 1);

    return data;
  };

  const nextJoke = () => {
    if (current < jokesRef.current.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prevJoke = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <JokeContext.Provider
      value={{
        jokes: jokesRef.current,
        current,
        getJokes,
        nextJoke,
        prevJoke,
      }}
    >
      {children}
    </JokeContext.Provider>
  );
}

export default JokeProvider;

export function useJokes() {
  return useContext(JokeContext);
}
