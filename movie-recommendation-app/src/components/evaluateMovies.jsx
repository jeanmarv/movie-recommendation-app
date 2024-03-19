import { useState } from 'react';
import { useContext } from 'react';
import GlobalContext from "../context/globalContext";

export default function EvaluateMovies () {
  const { staMovies } = useContext(GlobalContext)
  const [index, setIndex] = useState(0);

  const handleClick = (e) => {
    if (e.target.value === "1") {
      setIndex((prevIndex) => (prevIndex + 1) % staMovies.length);
    }
    if (e.target.value === "2") {
      setIndex((prevIndex) => (prevIndex + 1) % staMovies.length);
    }
    if (e.target.value === "3") {
      setIndex((prevIndex) => (prevIndex + 1) % staMovies.length);
    }
    if (e.target.value === "4") {
      setIndex((prevIndex) => (prevIndex + 1) % staMovies.length);
    }
    if (e.target.value === "5") {
      setIndex((prevIndex) => (prevIndex + 1) % staMovies.length);
    }
    if (e.target.value === "6") {
      setIndex((prevIndex) => (prevIndex + 1) % staMovies.length);
    }
  }

    return (
    <div>
      EVALUATE
      {staMovies[index]}
      <button
        onClick={ handleClick }
        value={"1"}
        type="button"
      >
        1 estrela
      </button>
      <button
        onClick={ handleClick }
        value={"2"}
        type="button"
      >
        2 estrelas
      </button>
      <button
        onClick={ handleClick }
        value={"3"}
        type="button"
      >
        3 estrelas
      </button>
      <button
        onClick={ handleClick }
        value={"4"}
        type="button"
      >
        4 estrelas
      </button>
      <button
        onClick={ handleClick }
        value={"5"}
        type="button"
      >
        5 estrelas
      </button>
      <button
        onClick={ handleClick }
        value={"6"}
        type="button"
      >
        Não assisti
      </button>
    </div>
  ) 
}