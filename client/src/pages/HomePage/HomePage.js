import { Link } from "react-router-dom";
import logo from "../../assets/img/logo-conjunto.svg";
const Home = () => {
  return (
    <div>
      <div className="contenedor_titulo">
        <h1>
          Jelly<span>Gram</span>
        </h1>
      </div>
      <div className="container-logo_home">
        <img src={logo} alt="logo" className="logo-home-phone"/>
      </div>
      <div className="nav-container-home">
        <Link to="/signup" className="nav-home link-white">
          Sing up
        </Link>
        <Link to="/login" className="nav-home link-white">
          Login
        </Link>
      </div>
      <main className="container-home">
        <h3 className="text-center color-white">
          Conecta con amigos, comparte lo que haces !
        </h3>
        <div>
          <button>Iniciar Sesión</button>
        </div>
        <div>
          <button>Registrarse</button>
        </div>
        <h3 className="text-center color-white">
          Se tu mismo, comienza a compartir
        </h3>
      </main>
      {/* <footer>
        <p>&copy; 2021 JellyGram </p>
      </footer> */}
    </div>
  );
};

export default Home;
