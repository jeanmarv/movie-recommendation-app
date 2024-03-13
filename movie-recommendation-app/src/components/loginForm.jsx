import { useContext } from 'react';
import GlobalContext from "../context/globalContext";
import { login } from '../api/requests';

export default function LoginForm() {
    const {navigate, user, setUser} = useContext(GlobalContext)

    const MIN_PASSWORD_LENGTH = 6;

    const handleClick = async () => {
      const request = await login({Username: user.Username, Password: user.Password});
      if (request.error) {
        console.log(request.error);
        return;
      } else if (request.success) {
        navigate("/register");
      }
      console.log(request);
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
            type="buttom"
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
