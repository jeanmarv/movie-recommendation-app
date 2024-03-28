import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getMoviesID, addMovie } from "../api/requests";
import { GPT_KEY } from '../../key';
import OpenAI from "openai";

export default function RecommendMovies() {
  const [userMovies, setUserMovies] = useState([]);
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const { clientId  } = useParams();

  useEffect(() => {
      const fetchMovies = async () => {
          const movies = await getMoviesID(clientId);
          setUserMovies(movies);
      };
      fetchMovies();
  }, []);
 // Renderiza uma mensagem de carregamento enquanto os dados estão sendo buscados
 

 useEffect(() => {
  const openai = new OpenAI({
      apiKey: GPT_KEY,
      dangerouslyAllowBrowser: true
  });

  const fetchRecommendedMovie = async () => {
      console.log(userMovies)
      const message = `This is a list of user's movies and evaluations of them:${userMovies}, Based on the user's preferences and evaluations, recommend a new movie title only`;
      const completion = await chatCompletion(openai, message);
      setRecommendedMovie(completion);
  };

  if (userMovies.length > 0) {
      fetchRecommendedMovie();
  }
}, [userMovies]);

const chatCompletion = async (openai, message) => {
  const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
  });
  const recommendedMovieName = response.choices[0].message.content;
  const recommendedMovieExists = userMovies.some(movie => movie.filme.toLowerCase() === recommendedMovieName.toLowerCase());

  // Se o filme recomendado já estiver na lista de filmes do usuário, tenta novamente
  if (recommendedMovieExists) {
    return chatCompletion(openai, message);
  }

  return recommendedMovieName;
}

const handleEvaluation = async (evaluation) => {
  const request = await addMovie({ user_id: clientId, filme: recommendedMovie, evaluation });
  if (request.status === 201) {
    console.log(request.status)
  //   {
  //     const fetchMovies = async () => {
  //         const movies = await getMoviesID(clientId);
  //         setUserMovies(movies);
  //     };
  //     fetchMovies();
  // }
  }
};



const handleClick = async (event) => {
  const value = event.target.value;
  if (value === "1" || value === "2" || value === "3" || value === "4" || value === "5") {
    handleEvaluation(Number(value));
  } else if (value === "6") {
    console.log(value)
  //   {
  //     const fetchMovies = async () => {
  //         const movies = await getMoviesID(clientId);
  //         setUserMovies(movies);
  //     };
  //     fetchMovies();
  // }
  }
}

if (userMovies.length === 0) {
  return <div>Carregando...</div>;
}


// Uma vez que os dados estão prontos, renderiza o filme recomendado pela api
if (userMovies || userMovies.length > 0) {return (
    <div>
      Recommended movie:
      {recommendedMovie}
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