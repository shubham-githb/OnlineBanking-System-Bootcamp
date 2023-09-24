import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Title from "./Title";
import { Button } from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";
import { Oval, ProgressBar } from "react-loader-spinner";

export default function CheckBalance() {
  const [customer, setcustomer] = useState(
    JSON.parse(sessionStorage.getItem("loggedInCustomer"))
  );
  const [accounts, setaccounts] = useState([]);
  const [selectedaccount, setselectedaccount] = useState(0);
  const [accountbalance, setaccountbalance] = useState(0);
  const [loading, setloading] = useState(true);
  const [balanceloading, setbalanceloading] = useState(false);

  const getUserAccounts = async () => {
    await axios
      .get(
        `http://localhost:8080/account/getAccountsByCustomerId/${customer.customerId}`
      )
      .then((res) => {
        setloading(false);
        setaccounts(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    getUserAccounts();
  }, [customer]);

  const getAccountBalance = async () => {
    setbalanceloading(true);
    await axios
      .get(
        `http://localhost:8080/account/getAccountByAccountNumber/${selectedaccount}`
      )
      .then((res) => {
        console.log(res.data);
        setaccountbalance(res.data.accountBalance);
        setbalanceloading(false);
      });
  };

  const handleCheckBalance = (event) => {
    getAccountBalance();
  };

  return (
    <React.Fragment>
      <Title>Check Account Balance</Title>
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
          {balanceloading ? (
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
          ) : (
            <Typography component="p" sx={{ margin: "3%" }} variant="h4">
              ${accountbalance}
            </Typography>
          )}
          <Button
            variant="contained"
            sx={{ padding: "3%", margin: "4%" }}
            onClick={handleCheckBalance}
          >
            Check Balance
          </Button>
        </Box>
      )}
    </React.Fragment>
  );
}
