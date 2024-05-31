import { useState } from 'react';
import { useContext } from 'react';
import GlobalContext from "../context/globalContext";
import { addMovie } from "../api/requests";
import { useParams } from 'react-router-dom';
import "../css/evaluate.css";

export default function EvaluateMovies () {
  const { staMovies, navigate, staImages } = useContext(GlobalContext)
  const [index, setIndex] = useState(0);
  const { clientId  } = useParams();

  const handleEvaluation = async (evaluation) => {
    const request = await addMovie({ user_id: clientId, filme: staMovies[index], evaluation });
    if (request.status === 201) {
      setIndex((prevIndex) => (prevIndex + 1) % staMovies.length);
    }
  };

  const handleClick = (e) => {
    const value = e.target.value;
    if (value === "1" || value === "2" || value === "3" || value === "4" || value === "5") {
      handleEvaluation(Number(value));
    } else if (value === "6") {
      setIndex((prevIndex) => (prevIndex + 1) % staMovies.length);
    }
  };

  if (index === staMovies.length - 1) {
    navigate(`/recommend/${clientId}`);
  }

    return (
      <div className="evaluate-container">
      <h1>EVALUATE</h1>
      <div className="movie-title">{staMovies[index]}</div>
      <img src={staImages[index]} alt="movieImage" />
      <button onClick={handleClick} value="1" type="button">1 estrela</button>
      <button onClick={handleClick} value="2" type="button">2 estrelas</button>
      <button onClick={handleClick} value="3" type="button">3 estrelas</button>
      <button onClick={handleClick} value="4" type="button">4 estrelas</button>
      <button onClick={handleClick} value="5" type="button">5 estrelas</button>
      <button onClick={handleClick} value="6" type="button">Não assisti</button>
    </div>
  ) 
}