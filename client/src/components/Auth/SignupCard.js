import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
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
  // console.log(values);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(values);
    const response = await axios.post(
      `http://localhost:5000/auth/register`,
      values
    );
    console.log(response.data);
    if (response.data.success === "true") {
      window.localStorage.token = response.data.token;
    } else {
      setMessage({
        text: response.data.message,
      });
    }
  };

  return (
    <div className="signup-card">
      <Link to="/">Home</Link>
      {/* <Link to="/login">Login</Link> */}
      {/* <h2>Sign up</h2> */}
      <main className="container-signup">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="input-signup"
              placeholder="Correo electronico"
            />
          </div>
          <div>
            <input
              type="text"
              name="fullname"
              onChange={handleChange}
              className="input-signup"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="input-signup"
              placeholder="Nombre de usuario"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="input-signup"
              placeholder="Contraseña"
            />
          </div>
          <h3>step 2</h3>
          <div>
            <label>
              Fecha de nacimiento:
              <input
                type="date"
                name="dateofbirth"
                onChange={handleChange}
                className="input-signup"
              />
            </label>
          </div>
          <h3>step 3</h3>
          <div>
            <label>
              Foto de perfil:
              <input type="file" name="photo" onChange={handleChange} />
            </label>
          </div>
          <input type="submit" value="Submit" className="btn btn-black" />
          <span>{message.text}</span>
        </form>
      </main>
    </div>
  );
};

export default Signup;
