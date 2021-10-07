import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  // let history = useHistory();
  // history.push("/home")
  
  const [values, setValues] = useState({});
  const [message, setMessage] = useState({
    text: "",
  });

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(values);
    const response = await axios.post(
      `http://localhost:5000/auth/login`,
      values
    );
    console.log(response.data);
    if (response.data.success === true) {
      window.localStorage.token = response.data.token;
    } else {
      setMessage({
        text: response.data.message,
      });
    }
  };

  console.log(values);

  return (
    <div>
      <div className="login-card">
        {/* <Link to="/">Home</Link>
      <Link to="/signup">Sing up</Link> */}
        <main className="container-login">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                onChange={handleChange}
                className="input-login"
              ></input>
            </div>
            <div>
              <input
                type="password"
                name="password"
                onChange={handleChange}
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
            <a href="/" className="link-black texto-inicio">
              ¿Has olvidado la contraseña?
            </a>
          </div>
          <div>
            <Link to="/signup" className="link-blue texto-inicio">
              Registrarse
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
