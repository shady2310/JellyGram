import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";

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
      </Switch>
    </div>
  );
};

export default App;
