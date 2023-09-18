import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div>Customer Details</div>
      <div>Account Details</div>
      <div>
        Transactions
        <div>
          <Link to="/transaction">Make a Transaction</Link>
        </div>
        <div to="/withdraw">Withdraw An Amount</div>
      </div>
    </div>
  );
};
export default Dashboard;
