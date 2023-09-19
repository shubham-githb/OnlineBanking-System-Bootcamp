import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(
    JSON.parse(sessionStorage.getItem("loggedInCustomer"))
  );
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  const [accnum, setaccnum] = useState(0);
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
  const handleGetAccountSummary = async () => {
    axios
      .get(`http://localhost:8080/account/getAccountSummary/${accnum}`)
      .then((res) => console.log(res.data));
  };
  const handleGetAccountStatement = async () => {
    await axios
      .post(`http://localhost:8080/account/getAccountStatement/${accnum}`, {
        start: startdate,
        end: enddate,
      })
      .then((res) => console.log(res.data));
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
          <div>
            View Account Summary
            <br />
            <label for="accnum">Enter Account Number : </label>
            <input
              type="numeric"
              id="accnum"
              name="accnum"
              onChange={(evt) => setaccnum(evt.target.value)}
            />
            <button onClick={handleGetAccountSummary}>Submit</button>
          </div>
          <br />
          <br />
          <br />
          <div>
            View Account Statement
            <br />
            <label for="accnum">Enter Account Number : </label>
            <input
              type="numeric"
              id="accnum"
              name="accnum"
              onChange={(evt) => setaccnum(evt.target.value)}
            />
            <br />
            <label for="startdate">Enter Start Date : </label>
            <input
              type="date"
              id="startdate"
              name="startdate"
              onChange={(evt) => setstartdate(evt.target.value)}
            />
            <br />
            <label for="startdate">Enter End Date : </label>
            <input
              type="date"
              id="enddate"
              name="enddate"
              onChange={(evt) => setenddate(evt.target.value)}
            />
            <br />
            <button onClick={handleGetAccountStatement}>Submit</button>
          </div>
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
