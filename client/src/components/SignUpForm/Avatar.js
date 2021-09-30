import React from "react";

const Avatar = ({ prevStep, nextStep, handleChange, values }) => {
  //   const Previous = (e) => {
  //     e.preventDefault();
  //     prevStep();
  //   };
  //   const Continue = (e) => {
  //     e.preventDefault();
  //     nextStep();
  //   };
  return (
    <div>
      <div>
        <label>
          Foto de perfil:
          <input type="file" name="photo" onChange={handleChange} />
        </label>
      </div>
      <button className="btn btn-black" onClick={prevStep}>
        Atras
      </button>
      <button className="btn btn-black" onClick={nextStep}>
        Siguiente
      </button>
    </div>
  );
};

export default Avatar;
