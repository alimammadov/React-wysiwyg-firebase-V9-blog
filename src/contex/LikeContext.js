import { createContext, useEffect, useState } from "react";

export const LikesContext = createContext();

export const LikesContextProvider = ({ children }) => {
  const [likes, setLikes] = useState(localStorage.getItem("likes") || false);
  const toggle = () => {
    setLikes(!likes);
  };
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  return (
    <LikesContext.Provider value={{likes, toggle}}>{children}</LikesContext.Provider>
  );
};
