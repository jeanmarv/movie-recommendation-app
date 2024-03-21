import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getMoviesID, addMovie } from "../api/requests";

export default function RecommendMovies() {
    const [userMovies, setUserMovies] = useState([]);
    const { clientId  } = useParams();

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await getMoviesID(clientId);
            setUserMovies(movies);
        };
        fetchMovies();
    }, []);
 // Renderiza uma mensagem de carregamento enquanto os dados estão sendo buscados
 if (!userMovies || userMovies.length === 0) {
    return <div>Carregando...</div>;
}

    const handleClick = async (event) => {
        console.log(event.target.value);
    }

// Uma vez que os dados estão prontos, renderiza o filme recomendado pela api
return (
    <div>
      Recommended movie:
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
)
}