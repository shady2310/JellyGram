import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserDetails from "../SignUpForm/UserDetails";
import PersonalDetails from "../SignUpForm/PersonalDetails";

const Signup = () => {
  const [step, setStep] = useState({
    step: 1,
  });
  const [values, setValues] = useState({
  });
  const [message, setMessage] = useState({
    text: "",
  });

  //Paso atras
  // console.log(values.step);
  
  const prevStep = () => {
    setStep({ step: step.step - 1 });
  };

  //Siguiente paso
  const nextStep = () => {
    setStep({ step: step.step + 1 });
  };

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
  console.log(values)
  

  

  const hola = 0;

  return (
    
    <div className="signup-card">
      {console.log(step.step)}
      <Link to="/">Home</Link>
      {/* <Link to="/login">Login</Link> */}
      {/* <h2>Sign up</h2> */}
      <main className="container-signup">
        El usuario esta {hola ? "esta" : "no esta"} logueado
        { step.step === 1 ? <UserDetails nextStep={nextStep} handleChange={handleChange}  /> : <div></div>}
        { step.step === 2 ? <PersonalDetails prevStep={prevStep} nextStep={nextStep} handleChange={handleChange} /> : <div></div>}
        
        {/* <form onSubmit={handleSubmit}>
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
        </form> */}
      </main>
    </div>
  );
};

export default Signup;
