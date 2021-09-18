import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <h2>Sign up</h2>
      <form>
        <label>
          Nombre completo:
          <input type="text" name="fullname" />
        </label>
        <label>
          Fecha de nacimiento:
          <input type="date" name="dateofbirth" />
        </label>
        <label>
          Nombre de usuario:
          <input type="text" name="username" />
        </label>
        <label>
          Foto de perfil:
          <input type="file" name="photo" />
        </label>
        <label>
          Correo electronico:
          <input type="email" name="email" />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Signup;
