import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const GlobalContext = createContext();

const defaultUser = {
  id: "",
  Username: "jeanmarv",
  Password: "jean121bol",
  movies: [],
};

const starterMovies = [ "The Godfather", "Inception", "Pulp Fiction", "Schindler's List", "Toy Story", "The Shawshank Redemption", "Mad Max: Fury Road", 
"Amélie", "Parasite", "The Dark Knight", "La La Land", "2001: A Space Odyssey", "The Silence of the Lambs", "Spirited Away", "The Grand Budapest Hotel",
"Fight Club", "Forrest Gump", "Moonlight", "Blade Runner 2049","Casablanca", "Citizen Kane", "Vertigo", "Star Wars: Episode IV - A New Hope", "Jurassic Park",
"The Matrix","12 Angry Men", "Eternal Sunshine of the Spotless Mind", "Gladiator", "Saving Private Ryan", "Goodfellas" ]

const StarterImg = [ "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg", "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hA2ple9q4qnwxp3hKVNhroipsir.jpg", "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/nSxDa3M9aMvGVLoItzWTepQ5h5d.jpg",
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg", "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ve72VxNqjGM69Uky4WTo2bK6rfq.jpg",
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg", "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg", "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4911T5FbJ9eD2Faz5Z8cT3SUhU3.jpg",
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5K7cOHoay2mZusSLezBOY0Qxh8a.jpg",
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sav0jxhqiH0bPr2vZFU0Kjt2nZL.jpg", "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/15uOEfqBNTVtDUT7hGBVCka0rZz.jpg",
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg", "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/b1xCNnyrPebIc7EWNZIa6jhb1Ww.jpg",
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg",
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg", "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
  "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg", "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg"
]

export default GlobalContext;

export function GlobalProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(defaultUser);
    const [ staMovies ] = useState(starterMovies);
    const [ staImages ] = useState(StarterImg);
    
    return (
      <GlobalContext.Provider
        value={ {
          navigate,
          user,
          setUser,
          staMovies,
          staImages,
        } }
      >
        {children}
      </GlobalContext.Provider>
    );
  }

  GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };