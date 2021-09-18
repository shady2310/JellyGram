import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/signup">Sing up</Link>
      <h2>Login</h2>
      <form action="">
        <label>
          Correo electronico:
          <input type="email" name="email"></input>
        </label>
        <label>
          Contraseña:
          <input type="password" name="password"></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
