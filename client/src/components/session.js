import { Redirect } from "react-router-dom"

const Session = ({ authorized }) => {
  if(!authorized) {
    return <Redirect to="/" />
  }
  return <h1>Hola</h1>;
};
export default Session;
