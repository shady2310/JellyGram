import React from "react";

const Avatar = ({ prevStep, nextStep, handleChange, handleSubmit }) => {
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Foto de perfil:
            <input type="file" name="photo" onChange={handleChange} />
          </label>
        </div>
        <button className="btn btn-black" onClick={prevStep}>
          Atras
        </button>
        {/* <button className="btn btn-black" onClick={handleSubmit}>
          Finalizar
        </button> */}
        <input type="submit" value="Submit" className="btn btn-black" />
      </form>
    </div>
  );
};

export default Avatar;
