import React from "react";
import tarta from "../../assets/img/tarta.svg";

const PersonalDetails = ({ prevStep, nextStep, handleChange }) => {
  // const PersonalDetails = () => {
  // const Previous = (e) => {
  //   e.preventDefault();
  //   prevStep();
  // };
  // const Continue = (e) => {
  //   e.preventDefault();
  //   nextStep();
  // };
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
      <main>
        <div className="flex-column-center">
          <div>
            <label className="texto-inicio">Añade tu fecha de nacimiento</label>
          </div>
          <div>
            <p className="texto-inicio2">Este dato no se incluirá en tu perfil público.</p>
          </div>
          <div className="mt-lg flex-center">
            <input
              type="date"
              name="dateofbirth"
              // value={values.dateofbirth}
              onChange={handleChange}
              // className="input-signup"
            />
          </div>
        </div>
        <div className="mt-lg flex-botones-separados">
          <button className="btn btn-black btn-signup" onClick={prevStep}>
            Atras
          </button>
          <button className="btn btn-black btn-signup" onClick={nextStep}>
            Siguiente
          </button>
        </div>
      </main>
    </div>
  );
};

export default PersonalDetails;
