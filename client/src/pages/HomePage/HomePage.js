import { Link } from "react-router-dom";
import logo from "../../assets/img/logo-conjunto.svg";
import cardBorder from "../../assets/img/card-border.svg";
import LoginCard from "../../components/Auth/LoginCard";

const Home = () => {
  return (
    <div>
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
      <main className="container-home">
        <div className="container-card">
          <LoginCard />
          {/* <img src={cardBorder} alt="card-border" /> */}
        </div>
      </main>
      {/* <footer>
        <p>&copy; 2021 JellyGram </p>
      </footer> */}
    </div>
  );
};

export default Home;
