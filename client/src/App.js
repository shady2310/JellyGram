import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignUpPage/SignupPage";
import HomePage from "./pages/HomePage/HomePage";
import Test from "./components/session";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage}></Route>
        <Route exact path="/signup" component={SignupPage}></Route>
        <Route exact path="/home" component={HomePage}></Route>
        <Route exact path="/test" component={() => <Test authorized={false} />}></Route>
      </Switch>
    </Router>
  );
};

export default App;
