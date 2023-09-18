import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/homePage";
import LoginPage from "./pages/LoginPage/loginPage";
import RegisterPage from "./pages/RegisterPage/registerPage";
import Dashboard from "./pages/Dashboard/dashboard";
import TransactionPage from "./pages/TransactionPage/transactionPage";
import AccountCreation from "./pages/AccountCreation/accountCreation";
import AccountDisplay from "./pages/AccountDisplay/accountDisplay";
import WithdrawPage from "./pages/WithdrawPage/withdrawPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/createAccount" element={<AccountCreation />} />
          <Route exact path="/viewAccounts" element={<AccountDisplay />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/transaction" element={<TransactionPage />} />
          <Route exact path="/withdraw" element={<WithdrawPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
