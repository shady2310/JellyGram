import React from "react";
import { Link } from "react-router-dom";

const UserDetails = ({ nextStep, handleChange}) => {
  // const Continue = (e) => {
  //   e.preventDefault();
  //   nextStep();
  // };
  return (
    <div className="container-signup">
      {/* <label>
        Email
        <input
          type="text"
          placeholder="email address"
          value={values.email}
          onChange={handleChange("email")}
        />
      </label> */}
      <form>
        <div>
          <input
            type="email"
            name="email"
            // value={values}
            onChange={handleChange}
            className="input-signup"
            placeholder="Correo electronico"
          />
        </div>
        <div>
          <input
            type="text"
            name="fullname"
            // value={values}
            onChange={handleChange}
            className="input-signup"
            placeholder="Nombre completo"
          />
        </div>

        <div>
          <input
            type="text"
            name="username"
            // value={values.username}
            onChange={handleChange}
            className="input-signup"
            placeholder="Nombre de usuario"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            // value={values.password}
            onChange={handleChange}
            className="input-signup"
            placeholder="Contraseña"
          />
        </div>
        <button className="btn btn-black" onClick={nextStep}>
          Siguiente
        </button>
      </form>
      <div className="divisor-form">
          <div></div>
          <div>o</div>
          <div></div>
        </div>
        <div>
          <p className="color-black">¿Ya tienes cuenta?</p>
        </div>
        <div>
          <Link to="/" className="link-blue">Iniciar Sesión</Link>
        </div>
    </div>
  );
};

export default UserDetails;
