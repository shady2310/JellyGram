import { Link } from "react-router-dom";
import logo from "../../assets/img/logo-blanco.png";

const Home = () => {
  return (
    <div>
      <div className="contenedor_titulo">
        <h1>
          Jelly<span>Gram</span>
        </h1>
      </div>
      {/* <div className="container-logo_home">
        <img src={logo} alt="logo"/>
      </div> */}
      <div className="nav-container-home">
        <Link to="/signup" className="nav-home link-white">Sing up</Link>
        <Link to="/login" className="nav-home link-white">Login</Link>
      </div>
    </div>
  );
};

export default Home;
