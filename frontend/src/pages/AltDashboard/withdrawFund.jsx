import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Title from "./Title";
import { Button } from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";
import { Oval, ProgressBar } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CheckBalance() {
  const [customer, setcustomer] = useState(
    JSON.parse(sessionStorage.getItem("loggedInCustomer"))
  );
  const [altstatement, setaltstatement] = useState("");
  const [accounts, setaccounts] = useState([]);
  const [selectedaccount, setselectedaccount] = useState(0);
  const [amount, setamount] = useState(0);
  const [loading, setloading] = useState(true);
  const [amountaddloading, setamountaddloading] = useState(false);

  const getUserAccounts = async () => {
    await axios
      .get(
        `http://localhost:8080/account/getAccountsByCustomerId/${customer.customerId}`
      )
      .then((res) => {
        setloading(false);
        setaccounts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        setaltstatement(err.response.data);
        setloading(false);
      });
  };

  useEffect(() => {
    getUserAccounts();
  }, [customer]);

  const addAccountFunds = async () => {
    await axios
      .put(`http://localhost:8080/account/withdrawAmount/${selectedaccount}`, {
        amount: amount,
      })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.responseText);
        toast.success("Current Balance : " + res.data.account.accountBalance);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.responseText);
        toast.error(
          "Current Balance : " + err.response.data.account.accountBalance
        );
      });
  };

  const handleAddFunds = () => {
    setamountaddloading(true);
    addAccountFunds();
    setamountaddloading(false);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      {altstatement !== "" ? (
        <>
          <Title>Withdraw Funds</Title>
          <Box sx={{ margin: "auto", textAlign: "center" }}>
            <Title>Customer has not made any accounts yet!</Title>
          </Box>
        </>
      ) : (
        <>
          <Title>Withdraw Funds</Title>
          {loading ? (
            <Box sx={{ margin: "auto" }}>
              <Oval
                height={80}
                width={80}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <FormControl fullWidth sx={{ margin: "2%" }}>
                <InputLabel id="accountselect">Select Account</InputLabel>
                <Select
                  labelId="accountselect"
                  id="accountselect"
                  value={selectedaccount}
                  label="Account"
                  onChange={(evt) => setselectedaccount(evt.target.value)}
                >
                  {accounts.map((account) => (
                    <MenuItem
                      key={account.accountNumber}
                      value={account.accountNumber}
                    >
                      {account.accountNumber}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                name="amount"
                label="Amount"
                type="amount"
                id="amount"
                onChange={(evt) => setamount(evt.target.value)}
              />
              {amountaddloading ? (
                <Box sx={{ margin: "auto" }}>
                  <Oval
                    height={80}
                    width={80}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </Box>
              ) : (
                <Button
                  variant="contained"
                  sx={{ padding: "3%", margin: "4%" }}
                  onClick={handleAddFunds}
                >
                  Withdraw Funds
                </Button>
              )}
            </Box>
          )}
        </>
      )}
    </React.Fragment>
  );
}
