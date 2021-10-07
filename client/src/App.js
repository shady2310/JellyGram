import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IconContext } from "react-icons"


import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignUpPage/SignupPage";
import HomePage from "./pages/HomePage/HomePage";
import Test from "./components/session";

const App = () => {
  return (
    <IconContext.Provider value={{color: "#242424", size: "2em"}}>
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage}></Route>
          <Route exact path="/signup" component={SignupPage}></Route>
          <Route exact path="/home" component={() => <HomePage authorized={false} />}></Route>
        </Switch>
      </Router>
    </div>
    </IconContext.Provider>
  );
};

export default App;
