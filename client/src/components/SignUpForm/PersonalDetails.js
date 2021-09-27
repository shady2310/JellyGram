import React from "react";
import tarta from "../../assets/img/tarta.svg";

const PersonalDetails = ({ prevStep, nextStep, handleChange, values }) => {
  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };
  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };
  return (
    <div>
      {/* <label>
        Email
        <input
          type="text"
          placeholder="username"
          value={values.username}
          onChange={handleChange("username")}
        />
      </label> */}
      <img src={tarta} alt="tarta" />
      <form action="">
        <div>
          <div>
            <label>Añade tu fecha de nacimiento</label>
          </div>
          <div>
            <p>Este dato no se incluirá en tu perfil público.</p>
          </div>
          <input
            type="date"
            name="dateofbirth"
            value={values.dateofbirth}
            onChange={handleChange("dateofbirth")}
            className="input-signup"
          />
        </div>
        <button className="btn btn-black" onClick={Previous}>
          Atras
        </button>
        <button className="btn btn-black" onClick={Continue}>
          Siguiente
        </button>
      </form>
    </div>
  );
};

export default PersonalDetails;
