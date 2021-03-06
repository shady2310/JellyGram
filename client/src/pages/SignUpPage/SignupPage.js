import { Link } from "react-router-dom";
import logo from "../../assets/img/logo-conjunto.svg";
import cardBorder from "../../assets/img/card-border.svg";
import SignupCard from "../../components/Auth/SignupCard";
import SignUp from "../../components/Auth/SignupCard";

const Signup = () => {
  return (
    <div className="contenedor-signup">
      <div className="contenedor_titulo">
        <h1>
          Jelly<span>Gram</span>
        </h1>
      </div>
      <div className="container-logo_home">
        <img src={logo} alt="logo" className="logo-home-phone" />
      </div>
      {/* <div className="nav-container-home">
        <Link to="/signup" className="nav-home link-white">
          Sing up
        </Link>
        <Link to="/login" className="nav-home link-white">
          Login
        </Link>
      </div> */}
      <div className="container-home">
        <main className="signup-card">
          <div className="container-signup">
            <SignUp></SignUp>
            {/* <SignupCard /> */}
            {/* <img src={cardBorder} alt="card-border" /> */}
          </div>
          {/* <footer>
        <p>&copy; 2021 JellyGram </p>
      </footer> */}
        </main>
      </div>
    </div>
  );
};

export default Signup;
