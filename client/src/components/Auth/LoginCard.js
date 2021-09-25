import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-card">
      {/* <Link to="/">Home</Link>
      <Link to="/signup">Sing up</Link> */}
      <main className="container-login">
        <form action="">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="input-login"
            ></input>
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="input-login"
            ></input>
          </div>
          <div>
            <input
              type="submit"
              value="Iniciar Sesión"
              className="btn btn-black"
            />
          </div>
        </form>
        <div className="divisor-form">
          <div></div>
          <div>o</div>
          <div></div>
        </div>
        <div>
          <a href="/" className="link-black">¿Has olvidado la contraseña?</a>
        </div>
        <div>
          <Link to="/signup">Registrarse</Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
