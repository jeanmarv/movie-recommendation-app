import { useContext } from 'react';
import GlobalContext from "../context/globalContext";
import { login } from '../api/requests';

export default function LoginForm() {
    const {navigate, user, setUser} = useContext(GlobalContext)

    const MIN_PASSWORD_LENGTH = 6;

    const handleClick = async () => {
      const request = await login({Username: user.Username, Password: user.Password});
        if (request.status === 202) {
          navigate(`/evaluate/${request.data}`)
        }
        if (request.status === 200) {
          navigate(`/recommend/${request.data}`);
        }
    }

    return (
    <div>
      <form>
        <label>
            Login
          <input
          type="text"
          placeholder="Username"
          value={user.Username}
          onChange={(e) => setUser({ ...user, Username: e.target.value })}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            placeholder="********"
            value={user.Password}
            onChange={(e) => setUser({ ...user, Password: e.target.value })}
          />
        </label>
        <br />
        <button 
            type="button"
            onClick={handleClick}
            disabled={ (user.Username.length < MIN_PASSWORD_LENGTH || user.Password.length < MIN_PASSWORD_LENGTH) }
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
