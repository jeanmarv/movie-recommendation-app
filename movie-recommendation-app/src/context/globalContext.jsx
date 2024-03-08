import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const GlobalContext = createContext();

export default GlobalContext;

export function GlobalProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    
    return (
      <GlobalContext.Provider
        value={ {
          navigate,
          user,
          setUser,
        } }
      >
        {children}
      </GlobalContext.Provider>
    );
  }

  GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };