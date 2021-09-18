import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <h2>Sign up</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Signup;
