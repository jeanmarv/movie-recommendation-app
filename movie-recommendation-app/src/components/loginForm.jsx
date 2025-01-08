import { useContext, useState } from 'react';
import GlobalContext from "../context/globalContext";
import { login } from '../api/requests';
import "../css/main.css";

export default function LoginForm() {
    const {navigate, user, setUser, setUserID} = useContext(GlobalContext)
    const [errorMessage, setErrorMessage] = useState("");

    const MIN_PASSWORD_LENGTH = 6;

    const handleClick = async () => {
      try {
        const request = await login({Username: user.Username, Password: user.Password});
          if (request.status === 202) {
            setUserID(request.data);
            localStorage.setItem('userID', request.data);
            navigate(`/evaluate/${request.data}`)
          }
          if (request.status === 200) {
            setUserID(request.data);
            localStorage.setItem('userID', request.data);
            navigate(`/recommend/${request.data}`);
          }
      } catch (error) {
        setErrorMessage(<span style={{ color: 'red' }}>Invalid credentials, please try again.</span>);
      }
    };

    return (
      <div className="login-container">
      <h1>MOVIE RECOMMENDATIONS</h1>
      <form className="login-form">
        <label>
          Login
          <input
            type="text"
            placeholder="Username"
            value={user.Username}
            onChange={(e) => setUser({ ...user, Username: e.target.value })}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="********"
            value={user.Password}
            onChange={(e) => setUser({ ...user, Password: e.target.value })}
          />
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button 
          type="button"
          onClick={handleClick}
          disabled={(user.Username.length < MIN_PASSWORD_LENGTH || user.Password.length < MIN_PASSWORD_LENGTH)}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </form>
    </div>
  );  
}
