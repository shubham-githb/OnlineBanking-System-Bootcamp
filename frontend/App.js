import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import LoginPage from "./pages/LoginPage/loginPage";
import RegisterPage from "./pages/RegisterPage/registerPage";
import Dashboard from "./pages/Dashboard/dashboard";
import TransactionPage from "./pages/TransactionPage/transactionPage";
import AccountCreation from "./pages/AccountCreation/accountCreation";
import AccountDisplay from "./pages/AccountDisplay/accountDisplay";
import WithdrawPage from "./pages/WithdrawPage/withdrawPage";
import AltDashboard from "./pages/AltDashboard/Dashboard";
import DataGetter from "./components/datagetter";
import AdminLogin from "./pages/Admin/adminLogin";
import AdminDashBoard from "./pages/Admin/admindashboard.jsx";
import ForgotPassword from "./pages/ForgotPassword/forgotPassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/datagetter" element={<DataGetter />} />
          <Route exact path="/createAccount" element={<AccountCreation />} />
          <Route exact path="/viewAccounts" element={<AccountDisplay />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/transaction" element={<TransactionPage />} />
          <Route exact path="/withdraw" element={<WithdrawPage />} />
          <Route exact path="/altdashboard" element={<AltDashboard />} />
          <Route exact path="/adminLogin" element={<AdminLogin />} />
          <Route exact path="/admindash" element={<AdminDashBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
