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
      <div className="container-inputs">
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
        <div className="mt-lg flex-column-center">
        <button className="btn btn-black btn-signup" onClick={nextStep}>
          Siguiente
        </button>
        </div>
      </div>
      <div className="divisor-form">
          <div></div>
          <div>o</div>
          <div></div>
        </div>
        <div>
          <p className="color-black texto-inicio">¿Ya tienes cuenta?</p>
        </div>
        <div>
          <Link to="/" className="link-blue texto-inicio">Iniciar Sesión</Link>
        </div>
    </div>
  );
};

export default UserDetails;
