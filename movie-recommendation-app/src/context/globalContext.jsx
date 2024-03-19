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
"Fight Club", "Forrest Gump", "Moonlight", "Blade Runner 2049","Casablanca" ]

export default GlobalContext;

export function GlobalProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(defaultUser);
    const [ staMovies ] = useState(starterMovies);
    
    return (
      <GlobalContext.Provider
        value={ {
          navigate,
          user,
          setUser,
          staMovies,
        } }
      >
        {children}
      </GlobalContext.Provider>
    );
  }

  GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };