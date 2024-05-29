import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { MovieContext } from "./MovieContext.js";

function MovieProvider({ children }) {
  const [movieLoadObject, setMovieLoadObject] = useState({
    state: "pending",
    error: null,
    data: null,
  });
  const location = useLocation();

  /* eslint-disable */
  useEffect(() => {
    handleLoad();
  }, []);
  

  async function handleLoad() {
    setMovieLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8001/movie/get?id=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
    const responseJson = await response.json();

    if (response.status < 400) {
      setMovieLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setMovieLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
    }
  }

  async function handleCreateMessage(dtoIn) {
    const response = await fetch(`http://localhost:8001/message/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      handleLoad();
    } else {
      setMovieLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
    }
  }

  const value = {
    state: movieLoadObject.state,
    movie: movieLoadObject.data,
    handlerMap: { handleCreateMessage },
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

export default MovieProvider;
