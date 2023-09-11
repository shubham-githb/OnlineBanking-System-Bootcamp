import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/landingPage";
import LoginPage from "./pages/LoginPage/loginPage";
import SignupPage from "./pages/SignupPage/signupPage";
import HomePage from "./pages/HomePage/homePage";
import AccountCreationPage from "./pages/AccountCreationPage/accountCreationPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/createacc" element={<AccountCreationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
