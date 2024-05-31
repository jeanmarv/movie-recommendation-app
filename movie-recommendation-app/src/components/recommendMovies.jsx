import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getMoviesID, addMovie } from "../api/requests";
import { GPT_KEY, TMDB_KEY } from '../../key';
import OpenAI from "openai";
import "../css/recommend.css"

export default function RecommendMovies() {
  const [userMovies, setUserMovies] = useState([]);
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [seenMovie, setSeenMovie] = useState([]);
  const [moviePoster, setMoviePoster] = useState(null);
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
  const message = `Here is a list of movies and my ratings (from 1 to 5): ${JSON.stringify(movieNamesAndEvaluations)}. Based on these ratings, recommend one new movie wich is not on the list that I would likely enjoy. Only provide the name of the recommended movie and nothing else.`;
  const completion = await chatCompletion(openai, message);
  setRecommendedMovie(completion);
  searchMovie(completion);
};

const seenMovieRecommend = async () => {
  const movieNamesAndEvaluations = userMovies.map(movie => [movie.filme, movie.evaluation]);
  console.log(seenMovie);
  const message = `Here is a list of movies and my ratings (from 1 to 5): ${JSON.stringify(movieNamesAndEvaluations)}, and your last recommendation was this movie:${seenMovie} wich i don't want to see,so Based on these ratings, recommend one new movie that I would likely enjoy. Only provide the name of the recommended movie and nothing else.`;
  const completion = await chatCompletion(openai, message);
  setRecommendedMovie(completion);
  searchMovie(completion);
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
    await seenMovieRecommend();
  }
}

async function searchMovie(completion) {
  try {
      // 1. Fazer a solicitação de pesquisa de filme
      const searchResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${completion}`);
      const searchData = await searchResponse.json();

      // 2. Obter o ID do filme a partir dos resultados da pesquisa
      const movieId = searchData.results[0].id;

      // 3. Fazer a solicitação para obter detalhes do filme usando o ID do filme
      const movieDetailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_KEY}`);
      const movieDetailsData = await movieDetailsResponse.json();

      // 4. Obter a URL do pôster do filme
      const posterUrl = `https://image.tmdb.org/t/p/original${movieDetailsData.poster_path}`;

      // 5. Retornar o nome do filme e a URL do pôster
      setMoviePoster(posterUrl);
  } catch (error) {
      console.error('Ocorreu um erro:', error);
  }
}

if (userMovies.length === 0) {
  return <div className="loading">Carregando...</div>;
}


// Uma vez que os dados estão prontos, renderiza o filme recomendado pela api
if (userMovies || userMovies.length > 0) {return (
    <div className="container">
      <h1>Recommended movie:</h1>
      {recommendedMovie && <p>{recommendedMovie}</p>}
      {moviePoster && <img src={moviePoster} alt={recommendedMovie} />}
      <div>
        <button className="evaluate" onClick={handleClick} value={"1"} type="button">1 estrela</button>
        <button className="evaluate" onClick={handleClick} value={"2"} type="button">2 estrelas</button>
        <button className="evaluate" onClick={handleClick} value={"3"} type="button">3 estrelas</button>
        <button className="evaluate" onClick={handleClick} value={"4"} type="button">4 estrelas</button>
        <button className="evaluate" onClick={handleClick} value={"5"} type="button">5 estrelas</button>
        <button className="recommend" onClick={handleClick} value={"6"} type="button">Me recomende outro</button>
      </div>
    </div>
)}
}
