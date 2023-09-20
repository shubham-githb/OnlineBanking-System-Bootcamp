import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AccountCreation = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(
    JSON.parse(sessionStorage.getItem("loggedInCustomer"))
  );
  const [accountType, setaccountType] = useState();
  const [branch, setbranch] = useState();
  const [ifsccode, setifsccode] = useState();
  const [accountBalance, setaccountBalance] = useState();
  const [openDate, setopenDate] = useState();
  const [debitCardReq, setdebitCardReq] = useState();
  const [creditCardReq, setcreditCardReq] = useState();

  const formsubmitHandler = async (evt) => {
    await axios
      .post(
        `http://localhost:8080/account/createAccount/${customer.customerId}`,
        {
          accountType: accountType,
          branch: branch,
          ifsccode: ifsccode,
          accountBalance: accountBalance,
          openDate: openDate,
          debitCardReq: debitCardReq,
          creditCardReq: creditCardReq,
        }
      )
      .then((res) => {
        console.log(res.data);
        // navigate("/dashboard");
      });
  };

  return (
    <div>
      Account Creation Page
      <div>
        <div>
          <label>Account Type : </label>
          <input
            type="text"
            id="accountType"
            name="accountType"
            onChange={(evt) => setaccountType(evt.target.value)}
          />
        </div>
        <div>
          <label>Branch : </label>
          <input
            type="text"
            id="branch"
            name="branch"
            onChange={(evt) => setbranch(evt.target.value)}
          />
        </div>
        <div>
          <label>IFSC Code : </label>
          <input
            type="text"
            id="ifsccode"
            name="ifsccode"
            onChange={(evt) => setifsccode(evt.target.value)}
          />
        </div>
        <div>
          <label>Account Balance : </label>
          <input
            type="text"
            id="accountBalance"
            name="accountBalance"
            onChange={(evt) => setaccountBalance(evt.target.value)}
          />
        </div>
        <div>
          <label>Opening Date : </label>
          <input
            type="date"
            id="openDate"
            name="openDate"
            onChange={(evt) => setopenDate(evt.target.value)}
          />
        </div>
        <div>
          <label>Debit Card Required : </label>
          <input
            type="checkbox"
            id="debitCardReq"
            name="debitCardReq"
            onChange={(evt) =>
              setdebitCardReq(evt.target.value === "on" ? true : false)
            }
          />
        </div>
        <div>
          <label>Credit Card Required : </label>
          <input
            type="checkbox"
            id="creditCardReq"
            name="creditCardReq"
            onChange={(evt) =>
              setcreditCardReq(evt.target.value === "on" ? true : false)
            }
          />
        </div>
        <button onClick={formsubmitHandler}>Submit</button>
      </div>
    </div>
  );
};

export default AccountCreation;
