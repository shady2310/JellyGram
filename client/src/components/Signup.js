import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <h2>Sign up</h2>
      <form>
        <label>
          Nombre:
          <input type="text" name="fullname" />
        </label>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Password:
          <input type="text" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};


export default Signup;
