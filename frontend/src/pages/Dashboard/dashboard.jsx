import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(
    JSON.parse(sessionStorage.getItem("loggedInCustomer"))
  );
  const handleViewCustomers = async () => {
    axios
      .get(
        `http://localhost:8080/account/getAccountsByCustomerId/${customer.customerId}`
      )
      .then((res) => {
        sessionStorage.setItem("customerAccounts", JSON.stringify(res.data));
        navigate("/viewAccounts");
      });
  };

  return (
    <div>
      <div>
        <p>Customer Details</p>
        <p>
          Name : {customer.firstName} {customer.lastName}{" "}
        </p>
        <p>Date Of Birth : {customer.dateOfBirth}</p>
        <p>Email ID : {customer.email}</p>
        <p>Phone Number : {customer.phoneNumber}</p>
      </div>
      <div>
        Account Details
        <div>
          <Link to="/createAccount">Create An Account</Link>
          <br />
          <button onClick={handleViewCustomers}>
            View Accounts Of Customer
          </button>
          {/* <Link to="/viewAccounts">View Accounts Of Customer</Link> */}
        </div>
      </div>
      <div>
        Transactions
        <div>
          <Link to="/transaction">Make a Transaction</Link>
        </div>
        <div>
          <Link to="/withdraw">Withdraw An Amount</Link>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
