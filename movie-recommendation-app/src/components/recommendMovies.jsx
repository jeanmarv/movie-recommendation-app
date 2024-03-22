import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getMoviesID } from "../api/requests";
import { GPT_KEY } from '../../key';
import OpenAI from "openai";

export default function RecommendMovies() {
    const [userMovies, setUserMovies] = useState([]);
    const { clientId  } = useParams();

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await getMoviesID(clientId);
            setUserMovies(movies);
        };
        fetchMovies();
        console.log(userMovies);
    }, []);
 // Renderiza uma mensagem de carregamento enquanto os dados estão sendo buscados
 
    const openai = new OpenAI({
      apiKey: GPT_KEY,
      dangerouslyAllowBrowser: true
    });


const chatCompletion = async (message) => {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    return response.choices[0].message.content;
  }

    const handleClick = async (event) => {
        console.log(event.target.value);
    }


// Uma vez que os dados estão prontos, renderiza o filme recomendado pela api
if (userMovies || userMovies.length > 0) {return (
    <div>
      Recommended movie:
      {userMovies.map((movie) => (
        <div key={"cjave"}>
          <h3>{movie.filme}</h3>
          <p>{movie.evaluation}</p>
        </div>
      ))}
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
        Me recomende outro
      </button>
    </div>
)}
}