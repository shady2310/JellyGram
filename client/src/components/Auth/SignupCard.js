import { useState } from "react";
import axios from "axios";
import UserDetails from "../SignUpForm/UserDetails";
import PersonalDetails from "../SignUpForm/PersonalDetails";
import SubirFoto from "../../assets/img/subir-foto.svg";

const Signup = () => {
  const [img, setImg] = useState({
    img: SubirFoto,
  });
  const imagen = img.img;

  const [step, setStep] = useState({
    step: 1,
  });
  const [values, setValues] = useState({});
  const [message, setMessage] = useState({
    text: "",
  });

  //Paso atras
  const prevStep = () => {
    setStep({ step: step.step - 1 });
  };

  //Siguiente paso
  const nextStep = () => {
    setStep({ step: step.step + 1 });
  };

  function handleChange(event) {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  }

  function handleImage(event) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg({ img: reader.result });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  }

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
  console.log(values);

  return (
    <div className="signup-card">
      {/* {console.log(step.step)} */}
      {/* <Link to="/login">Login</Link> */}
      {/* <h2>Sign up</h2> */}
      <main>
        {step.step === 1 ? (
          <UserDetails nextStep={nextStep} handleChange={handleChange} />
        ) : (
          <div></div>
        )}
        {step.step === 2 ? (
          <PersonalDetails
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
          />
        ) : (
          <div></div>
        )}
        {step.step === 3 ? (
          <div className="container-signup">
            {/* <img src={SubirFoto} alt="subirFoto" className="foto-registro" /> */}
            <form onSubmit={handleSubmit}>
              <h4 className="texto-inicio mb-lg text-center">
                Imagen de perfil
              </h4>
              <div>
                <img
                  src={imagen}
                  alt="userImage"
                  className="user-image"
                  // id="userImage"
                />
                <input
                  type="file"
                  name="photo"
                  id="input"
                  accept="image/*"
                  onChange={(e) => {
                    handleImage(e);
                    handleChange(e);
                  }}
                />
                <label htmlFor="input" className="custom-file-upload mt-lg">
                  Seleccionar imagen
                </label>
                {/* <label for="file-upload" class="custom-file-upload">
                Seleccionar imagen
                </label> */}
                <input
                  id="file-upload"
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  className="custom-file-upload"
                />
              </div>
              <div className="mt-lg flex-botones-separados">
                <button className="btn btn-black btn-signup" onClick={prevStep}>
                  Atras
                </button>
                <input
                  type="submit"
                  value="Terminar"
                  className="btn btn-black btn-signup"
                />
              </div>
            </form>
          </div>
        ) : (
          <div></div>
        )}
      </main>
    </div>
  );
};

export default Signup;
