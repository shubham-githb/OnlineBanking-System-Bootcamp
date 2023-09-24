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
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";
import { Oval, ProgressBar } from "react-loader-spinner";

export default function AccountStatement() {
  const [customer, setcustomer] = useState(
    JSON.parse(sessionStorage.getItem("loggedInCustomer"))
  );
  const [accounts, setaccounts] = useState([]);
  const [selectedaccount, setselectedaccount] = useState(0);
  const [accountsummary, setaccountsummary] = useState();
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
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
      });
  };

  useEffect(() => {
    getUserAccounts();
  }, [customer]);

  const getAccountSummary = async () => {
    await axios
      .post(
        `http://localhost:8080/account/getAccountStatement/${selectedaccount}`,
        { start: startdate, end: enddate }
      )
      .then((res) => {
        console.log(res.data);
        setaccountsummary(res.data.transactions);
      });
  };

  const [open, setOpen] = useState(false);

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleAccountStatement = (event) => {
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
        <DialogTitle color="primary">Account Statement</DialogTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
        </Box>
      </Dialog>
    );
  };

  return (
    <React.Fragment>
      <Title>Get Account Statement</Title>
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
          <FormControl fullWidth sx={{ margin: "2%", marginTop: "2%" }}>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              defaultValue={dayjs("2022-04-17")}
              onChange={(value) => {
                let tp = new Date(value);
                let final =
                  tp.getFullYear() + "-" + tp.getMonth() + "-" + tp.getDate();
                setstartdate(final);
              }}
              sx={{ marginTop: "3%" }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              defaultValue={dayjs("2022-04-17")}
              onChange={(value) => {
                let tp = new Date(value);
                let final =
                  tp.getFullYear() + "-" + tp.getMonth() + "-" + tp.getDate();
                setenddate(final);
              }}
              sx={{ marginTop: "3%" }}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            sx={{ padding: "3%", margin: "4%", marginTop: "5%" }}
            onClick={handleAccountStatement}
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
    </React.Fragment>
  );
}
