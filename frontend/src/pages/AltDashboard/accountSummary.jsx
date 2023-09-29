import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Title from "./Title";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";
import { Oval, ProgressBar } from "react-loader-spinner";

export default function AccountSummary() {
  const [customer, setcustomer] = useState(
    JSON.parse(sessionStorage.getItem("loggedInCustomer"))
  );
  const [altstatement, setaltstatement] = useState("");
  const [accounts, setaccounts] = useState([]);
  const [selectedaccount, setselectedaccount] = useState(0);
  const [accountsummary, setaccountsummary] = useState();
  const [loading, setloading] = useState(true);

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

  const getAccountSummary = async () => {
    await axios
      .get(`http://localhost:8080/account/getAccountSummary/${selectedaccount}`)
      .then((res) => {
        if (
          res.data.responseText ===
          "No tranactions have been made from this account."
        ) {
          setaccountsummary(res.data.responseText);
        } else {
          setaccountsummary(res.data.transactions);
        }
      });
  };

  const [open, setOpen] = useState(false);

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleAccountSummary = (event) => {
    getAccountSummary();
    setOpen(true);
  };

  const SimpleDialog = (props) => {
    const { accountsummary, open } = props;
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Dialog fullWidth={true} maxWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle color="primary">Account Summary</DialogTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {accountsummary ===
          "No tranactions have been made from this account." ? (
            <>
              <Box
                sx={{ margin: "auto", textAlign: "center", marginBottom: "3%" }}
              >
                <Title>Customer has not made any transactions yet!</Title>
              </Box>
            </>
          ) : (
            <Table size="small" sx={{ margin: "10%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>TimeStamp</TableCell>
                  <TableCell>Credit / Debit</TableCell>
                  <TableCell>Transaction Type</TableCell>
                  <TableCell>Transaction Amount</TableCell>
                  <TableCell>Receiver Account Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accountsummary == null ? (
                  <></>
                ) : (
                  accountsummary.map((row) => (
                    <TableRow key={row.transactionId}>
                      <TableCell>{row.txtime}</TableCell>
                      <TableCell>{row.creditOrDebit}</TableCell>
                      <TableCell>{row.transactionType}</TableCell>
                      <TableCell>{row.transactionAmount}</TableCell>
                      <TableCell>{row.receiverAccountNumber}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </Box>
      </Dialog>
    );
  };

  return (
    <React.Fragment>
      {altstatement !== "" ? (
        <>
          <Title>Get Account Summary</Title>
          <Box sx={{ margin: "auto", textAlign: "center" }}>
            <Title>Customer has not made any accounts yet!</Title>
          </Box>
        </>
      ) : (
        <>
          <Title>Get Account Summary</Title>
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
              <FormControl fullWidth sx={{ margin: "2%", marginTop: "10%" }}>
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
              <Button
                variant="contained"
                sx={{ padding: "3%", margin: "4%", marginTop: "10%" }}
                onClick={handleAccountSummary}
              >
                Get Account Summary
              </Button>
              <SimpleDialog
                open={open}
                onClose={handleClose}
                accountsummary={accountsummary}
              />
            </Box>
          )}
        </>
      )}
    </React.Fragment>
  );
}
