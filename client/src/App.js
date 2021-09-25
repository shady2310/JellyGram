import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Signup from "./pages/SignUpPage/SignupPage";


const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/" exact component={HomePage}
        ></Route>
        <Route
          path="/signup" exact component={Signup}
        ></Route>
      </Switch>
    </div>
  );
};

export default App;
