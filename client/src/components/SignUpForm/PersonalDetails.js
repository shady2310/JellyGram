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
      <div>
        <label>
          Fecha de nacimiento:
          <input
            type="date"
            name="dateofbirth"
            value={values.dateofbirth}
            onChange={handleChange("dateofbirth")}
            className="input-signup"
          />
        </label>
      </div>
      <button onClick={Previous}>Previous</button>
      <button onClick={Continue}>Next</button>
    </div>
  );
};

export default PersonalDetails;
