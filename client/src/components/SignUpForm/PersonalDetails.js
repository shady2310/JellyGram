import React from "react";

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
      <form action="">
        <div>
          <div>
            <label>Fecha de nacimiento:</label>
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
