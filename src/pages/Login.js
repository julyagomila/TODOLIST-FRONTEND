import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:3001/user/login", {
        email: email,
        password: password,
      });

      console.log(response.data);
      if (response.data.token) {
        setUser(response.data.token);
        // redirection
        navigate("/todolist");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mainLogin">
      <figure className="figureLogin">
        <div className="titleLogin">
          <span>LOGIN</span>
        </div>
      </figure>
      <br />

      <form className="formLogin" onSubmit={handleLogin}>
        <input
          className="inputLogin"
          value={email}
          placeholder="email"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <input
          className="inputLogin"
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <input className="buttonLogin" type="submit" value="LOGIN" />
        <br />
      </form>
      <Link to={"/signup"}>
        <span className="spanSL">No account ? Go to sign up</span>
      </Link>
    </div>
  );
};

export default Login;
