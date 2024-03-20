import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getMoviesID } from "../api/requests";

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

// Uma vez que os dados estão prontos, renderiza a lista de filmes
return (
    <div>
        {userMovies.map((movie) => (
            <div key={1}>{movie.filme} - {movie.evaluation}</div>
        ))}
        É ISSO AI
    </div>
)
}