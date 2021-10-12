import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IconContext } from "react-icons";
// import { DataProvider } from "./helper/Context";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignUpPage/SignupPage";
import HomePage from "./pages/HomePage/HomePage";
import Test from "./components/session";
import MobilePostExp from "./components/MobilePostExp/MobilePostExp";

const App = () => {
  return (
    <IconContext.Provider value={{ color: "#242424", size: "2em" }}>
      {/* <DataProvider> */}
        <div>
          <Router>
            <Switch>
              <Route exact path="/login" component={LoginPage}></Route>
              <Route exact path="/signup" component={SignupPage}></Route>
              <ProtectedRoute exact path="/post/:id" component={MobilePostExp} />
              {/* <Route exact path="/" component={HomePage}></Route> */}
              {/* <Route exact path="/home" component={() => <HomePage authorized={true} />}></Route> */}
              <ProtectedRoute exact path="/" component={HomePage} />
              {/* <ProtectedRoute exact path="/" component={HomePage} isAuth={true} /> */}
            </Switch>
          </Router>
        </div>
      {/* </DataProvider> */}
    </IconContext.Provider>
  );
};

export default App;
