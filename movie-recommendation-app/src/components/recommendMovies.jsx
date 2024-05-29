import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getMoviesID, addMovie } from "../api/requests";
import { GPT_KEY } from '../../key';
import OpenAI from "openai";

export default function RecommendMovies() {
  const [userMovies, setUserMovies] = useState([]);
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [seenMovie, setSeenMovie] = useState([]);
  const { clientId  } = useParams();

  useEffect(() => {
      const fetchMovies = async () => {
          const movies = await getMoviesID(clientId);
          setUserMovies(movies);
      };
      fetchMovies();
  }, [clientId]);
 // Renderiza uma mensagem de carregamento enquanto os dados estão sendo buscados
 

 useEffect(() => {
  const fetchMovies = async () => {
    const movies = await getMoviesID(clientId);
    setUserMovies(movies);
  };
  fetchMovies();
}, [clientId]);

useEffect(() => {
  if (userMovies.length > 0) {
    fetchRecommendedMovie();
  }
}, [userMovies]);

const openai = new OpenAI({
  apiKey: GPT_KEY,
  dangerouslyAllowBrowser: true
});

const fetchRecommendedMovie = async () => {
  console.log(userMovies);
  const movieNamesAndEvaluations = userMovies.map(movie => [movie.filme, movie.evaluation]);
  console.log(movieNamesAndEvaluations);
  const message = `Here is a list of movies and my ratings (from 1 to 5): ${movieNamesAndEvaluations}. Based on these ratings, recommend one new movie that I would likely enjoy. Only provide the name of the recommended movie and nothing else.`;
  const completion = await chatCompletion(openai, message);
  setRecommendedMovie(completion);
};

const seenMovieRecommend = async () => {
  const movieNamesAndEvaluations = userMovies.map(movie => [movie.filme, movie.evaluation]);
  console.log(seenMovie);
  const message = `Here is a list of movies and my ratings (from 1 to 5): ${movieNamesAndEvaluations}, and your last recommendation was this movie:${seenMovie} wich i don't want to see,so Based on these ratings, recommend one new movie that I would likely enjoy. Only provide the name of the recommended movie and nothing else.`;
  const completion = await chatCompletion(openai, message);
  setRecommendedMovie(completion);
}

const chatCompletion = async (openai, message) => {
  const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "user", content: message }],
  });
  const recommendedMovieName = response.choices[0].message.content;
  return recommendedMovieName;
}

const handleEvaluation = async (evaluation) => {
  const request = await addMovie({ user_id: clientId, filme: recommendedMovie, evaluation });
  if (request.status === 201) {
    console.log(request.status)
    {
      const updatedMovies = [...userMovies, { filme: recommendedMovie, evaluation }];
      setUserMovies(updatedMovies);
  }
  }
};


const handleClick = async (event) => {
  const value = event.target.value;
  if (value === "1" || value === "2" || value === "3" || value === "4" || value === "5") {
    handleEvaluation(Number(value));
  } else if (value === "6") {
    console.log(value)
    console.log(recommendedMovie)
    const lastRecommended = [ ...seenMovie, recommendedMovie]
    console.log(lastRecommended)
    setSeenMovie(lastRecommended);
    seenMovieRecommend();
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
      <button onClick={handleClick} value={"1"} type="button">1 estrela</button>
      <button onClick={handleClick} value={"2"} type="button">2 estrelas</button>
      <button onClick={handleClick} value={"3"} type="button">3 estrelas</button>
      <button onClick={handleClick} value={"4"} type="button">4 estrelas</button>
      <button onClick={handleClick} value={"5"} type="button">5 estrelas</button>
      <button onClick={handleClick} value={"6"} type="button">Me recomende outro</button>
    </div>
)}
}