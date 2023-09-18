import { useState } from "react";
import axios from "axios";

const WithdrawPage = () => {
  const [amount, setamount] = useState(0);
  const [accno, setaccno] = useState(0);

  const handleFormSubmit = async () => {
    await axios
      .put(`http://localhost:8080/account/withdrawAmount/${accno}`, {
        amount: amount,
      })
      .then((res) => alert(res.data.responseText));
  };
  return (
    <div>
      <h1>Withdrawal Page</h1>
      <div>
        <div>
          <label>Enter Amount to be with drawn : </label>
          <input
            type="numeric"
            id="amount"
            name="amount"
            onChange={(evt) => setamount(evt.target.value)}
          />
        </div>
        <div>
          <label>Enter Account Number : </label>
          <input
            type="numeric"
            id="accno"
            name="accno"
            onChange={(evt) => setaccno(evt.target.value)}
          />
        </div>
        <div>
          <button onClick={handleFormSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};
export default WithdrawPage;
