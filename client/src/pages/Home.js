import { Link } from "react-router-dom";
import logo from "../assets/img/logo-blanco.png";

const Home = () => {
  return (
    <div>
      <div className="contenedor_titulo">
        <h1>
          Jelly<span>Gram</span>
        </h1>
      </div>
      <div className="container-logo_home">
        <img src={logo} alt="logo"/>
      </div>
      <div>
        <Link to="/signup">Sing up</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Home;
