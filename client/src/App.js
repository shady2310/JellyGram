import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/" exact component={Home}
        ></Route>
        <Route
          path="/signup" exact component={Signup}
        ></Route>
        <Route
          path="/login" exact component={Login}
        ></Route>
      </Switch>
    </div>
  );
};

export default App;
