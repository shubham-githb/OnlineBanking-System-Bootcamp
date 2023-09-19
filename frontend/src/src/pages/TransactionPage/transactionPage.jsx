import { useState } from "react";
import axios from "axios";

const TransactionPage = () => {
  const [transactionType, settransactionType] = useState("");
  const [creditordebit, setcreditordebit] = useState("debit");
  const [transactionAmount, settransactionAmount] = useState();
  const [senderaccno, setsenderaccno] = useState("");
  const [receiveraccno, setreceiveraccno] = useState("");

  const formSubmitHandler = async () => {
    await axios
      .post("http://localhost:8080/transaction/makeTransaction", {
        transactionType: transactionType,
        creditOrDebit: creditordebit,
        transactionAmount: transactionAmount,
        senderAccountNumber: senderaccno,
        receiverAccountNumber: receiveraccno,
      })
      .then((res) => alert(res.data.responseText));
  };

  return (
    <div>
      <h1>Make a Transaction</h1>
      <div>
        <div>
          <label>Transaction Type: </label>
          <input
            type="text"
            id="transactionType"
            name="transactionType"
            onChange={(evt) => settransactionType(evt.target.value)}
          />
        </div>
        <div>
          <label>Transaction Amount: </label>
          <input
            type="numeric"
            id="transactionAmount"
            name="transactionAmount"
            onChange={(evt) => settransactionAmount(evt.target.value)}
          />
        </div>
        <div>
          <label>Sender Account Number: </label>
          <input
            type="text"
            id="senderaccno"
            name="senderaccno"
            onChange={(evt) => setsenderaccno(evt.target.value)}
          />
        </div>
        <div>
          <label>Receiver Account Number: </label>
          <input
            type="text"
            id="receiveraccno"
            name="receiveraccno"
            onChange={(evt) => setreceiveraccno(evt.target.value)}
          />
        </div>
        <div>
          <button onClick={formSubmitHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
};
export default TransactionPage;
