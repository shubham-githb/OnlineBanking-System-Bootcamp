import { useEffect, useState } from "react";
import axios from "axios";

const AccountDisplay = (props) => {
  const [customer, setCustomer] = useState(
    JSON.parse(sessionStorage.getItem("loggedInCustomer"))
  );
  const [accounts, setAccounts] = useState(
    JSON.parse(sessionStorage.getItem("customerAccounts"))
  );
  const [loading, setloading] = useState(true);
  console.log(accounts);

  return (
    <div>
      <div>
        <table style={{ border: "1px solid black" }}>
          <tr>
            <th>Account Balance</th>
            <th>Account Type</th>
            <th>Account Branch</th>
            <th>IFSC Code</th>
            <th>Opening Date</th>
          </tr>
          <tbody>
            {accounts.map((item) => (
              <tr>
                <td style={{ border: "1px solid black" }}>
                  {item.accountBalance}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {item.accountType}
                </td>
                <td style={{ border: "1px solid black" }}>{item.branch}</td>
                <td style={{ border: "1px solid black" }}>{item.ifsccode}</td>
                <td style={{ border: "1px solid black" }}>{item.openDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AccountDisplay;
