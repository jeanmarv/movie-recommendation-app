import { useContext } from 'react';
import GlobalContext from "../context/globalContext";

export default function LoginForm() {
    const {navigate, user, setUser} = useContext(GlobalContext)

    const MIN_PASSWORD_LENGTH = 6;

    const handleclick = () => {
        navigate("/register");
        return console.log(user)
    }

    return (
    <div>
      <form>
        <label>
            Login
          <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            placeholder="********"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </label>
        <br />
        <button 
            type="buttom"
            onClick={ handleclick() }
            disabled={ user.username.lenght < MIN_PASSWORD_LENGTH || user.password.lenght < MIN_PASSWORD_LENGTH }
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