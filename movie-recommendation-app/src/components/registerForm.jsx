import { useContext } from 'react';
import GlobalContext from "../context/globalContext";
import { register } from "../api/requests";

export default function RegisterForm () {

    const {navigate, user, setUser} = useContext(GlobalContext)

    const MIN_PASSWORD_LENGTH = 6;

    const handleClick = async () => {
        const request = await register({Username: user.Username, Password: user.Password});
        if (request.status === 201) {
            navigate("/");
        }
    }

    return (
        <div>
            <h1>Register</h1>
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
                <label>
                    Password:
                    <input
                    type="password"
                    placeholder="********"
                    value={user.Password}
                    onChange={(e) => setUser({ ...user, Password: e.target.value })}
                    />
                </label>
                <button 
                    type="button"
                    onClick={handleClick}
                    disabled={ (user.Username.length < MIN_PASSWORD_LENGTH || user.Password.length < MIN_PASSWORD_LENGTH) }
                >
                    REGISTER
                </button>
            </form>
        </div>
    )
}