import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
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

export default function MakeTransaction() {
  const [customer, setcustomer] = useState(
    JSON.parse(sessionStorage.getItem("loggedInCustomer"))
  );
  const [loading, setloading] = useState(false);
  const [senderaccounts, setsenderaccounts] = useState([]);
  const [selsenderaccount, setselsenderaccount] = useState();
  const [recaccounts, setrecaccounts] = useState([]);
  const [selrecaccount, setselrecaccount] = useState();
  const [transactiontypes, settransactiontypes] = useState(["NEFT", "IMPS"]);
  const [seltransactiontype, setseltransactiontype] = useState("");
  const [amount, setamount] = useState(0);

  const getSenderAccounts = async () => {
    await axios
      .get(
        `http://localhost:8080/account/getAccountsByCustomerId/${customer.customerId}`
      )
      .then((res) => {
        setsenderaccounts(res.data);
      });
  };

  const getReceiverAccounts = async () => {
    await axios
      .get(
        `http://localhost:8080/customer/getNonCustomerAccounts/${customer.customerId}`
      )
      .then((res) => {
        console.log("*****");
        console.log(res.data);
        setrecaccounts(res.data);
        console.log("*****");
      });
  };

  useEffect(() => {
    setloading(true);
    getSenderAccounts();
    getReceiverAccounts();
    setloading(false);
  }, [customer]);

  const makeTransaction = async () => {
    await axios
      .post("http://localhost:8080/transaction/makeTransaction", {
        transactionType: seltransactiontype,
        creditOrDebit: "Debit",
        transactionAmount: amount,
        senderAccountNumber: selsenderaccount,
        receiverAccountNumber: selrecaccount,
      })
      .then((res) => alert(res.data.responseText));
  };

  return (
    <React.Fragment>
      <Title>Make Transaction</Title>
      {loading ? (
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={6}>
                <FormControl fullWidth sx={{ margin: "2%" }}>
                  <InputLabel id="senderaccountselect">
                    Select Your Account
                  </InputLabel>
                  <Select
                    labelId="senderaccountselect"
                    id="senderaccountselect"
                    value={selsenderaccount}
                    label="Sender Account"
                    onChange={(evt) => setselsenderaccount(evt.target.value)}
                  >
                    {senderaccounts.map((account) => (
                      <MenuItem
                        key={account.accountNumber}
                        value={account.accountNumber}
                      >
                        {account.accountNumber}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} lg={6}>
                <FormControl fullWidth sx={{ margin: "2%" }}>
                  <InputLabel id="recaccountselect">
                    Select Receiver Account
                  </InputLabel>
                  <Select
                    labelId="recaccountselect"
                    id="recaccountselect"
                    value={selrecaccount}
                    label="Receiver Account"
                    onChange={(evt) => setselrecaccount(evt.target.value)}
                  >
                    {recaccounts.map((account) => (
                      <MenuItem
                        key={account.accountNumber}
                        value={account.accountNumber}
                      >
                        {account.accountNumber}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} lg={6}>
                <FormControl fullWidth sx={{ margin: "2%" }}>
                  <InputLabel id="accountselect">
                    Set Transaction Type
                  </InputLabel>
                  <Select
                    labelId="transactiontypeselect"
                    id="transactiontypeselect"
                    value={seltransactiontype}
                    label="Transaction Type"
                    onChange={(evt) => setseltransactiontype(evt.target.value)}
                  >
                    {transactiontypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} lg={6} sx={{ marginTop: "1%" }}>
                <TextField
                  required
                  fullWidth
                  name="amount"
                  label="Amount"
                  type="numeric"
                  id="amount"
                  onChange={(evt) => setamount(evt.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              sx={{ padding: "1%", marginLeft: "45%", marginTop: "2%" }}
              onClick={makeTransaction}
            >
              Make Transaction
            </Button>
          </Container>
        </Box>
      )}
    </React.Fragment>
  );
}
