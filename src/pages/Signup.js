import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Canvas from "../components/Canvas";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    try {
      event.preventDefault();
      //je viens reset le message d'erreur à chaque tentative
      setErrorMessage("");
      //une requête au serveur pour créer un nouveau user
      // axios.post("url", body)

      const response = await axios.post(
        "https://tic-tac-tic--app.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      setUsername("");
      setEmail("");
      setPassword("");
      setNewsletter(false);

      if (response.data) {
        console.log("J'ai bien réussi à créer un compte");
        setUser(response.data.token);
        //Rediriger l'utilisateur vers la page principale
        navigate("/todolist");
      }
    } catch (error) {
      //   console.log(error.message);
      console.log(error.response.status);
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte !");
      }
    }
  };

  return (
    <div className="mainSignup">
      <figure className="figureSignup">
        <div className="titleSignup">
          <span>SIGN UP </span>
        </div>
      </figure>
      <br />

      <form className="formSignup" onSubmit={handleSignup}>
        <input
          className="inputSignup"
          value={username}
          type="text"
          placeholder="username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <input
          className="inputSignup"
          value={email}
          type="email"
          placeholder="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <input
          className="inputSignup"
          value={password}
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <span className="spanNews"> Newsletter ? </span>
        <input
          className="inputCheckSignup"
          value={newsletter}
          type="checkbox"
          placeholder="newsletter"
          onChange={(event) => setNewsletter(event.target.checked)}
        />
        <br />
        <input className="buttonSignup" type="submit" value="SIGN UP" />
        <p style={{ color: "red" }}>{errorMessage}</p>
      </form>
      <Link to={"/login"}>
        <span className="spanSL">Already have an account ? Go to login</span>
      </Link>
    </div>
  );
};

export default Signup;
