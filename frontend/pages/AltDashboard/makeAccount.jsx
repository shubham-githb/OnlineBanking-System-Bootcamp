import { useState } from "react";
import axios from "axios";

import * as React from "react";
import Title from "./Title";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { FormGroup, InputLabel } from "@mui/material";
import { CheckBox } from "@mui/icons-material";

const defaultTheme = createTheme();

export default function MakeAccount() {
  const [customer, setcustomer] = useState(
    JSON.parse(sessionStorage.getItem("loggedInCustomer").toString())
  );
  const [accountType, setaccountType] = useState("Savings Account");
  const [branch, setbranch] = useState();
  const [ifsccode, setifsccode] = useState();
  const [opendate, setopendate] = useState();
  const [accountBalance, setaccountBalance] = useState();
  const [debitCardReq, setdebitCardReq] = useState(true);
  const [creditCardReq, setcreditCardReq] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        `http://localhost:8080/account/createAccount/${customer.customerId}`,
        {
          accountType: accountType,
          branch: branch,
          ifsccode: ifsccode,
          openDate: opendate,
          accountBalance: accountBalance,
          debitCardReq: debitCardReq,
          creditCardReq: creditCardReq,
        }
      )
      .then((res) => {
        console.log(res.data);
        setaccountType("");
        setbranch("");
        setifsccode("");
        setaccountBalance("");
        setdebitCardReq("");
        setcreditCardReq("");
      });
  };
  return (
    <React.Fragment>
      <Title>Create User</Title>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="accountType">Select Account Type</InputLabel>
              <Select
                labelId="accountType"
                id="accountType"
                value={accountType}
                label="Select Account Type"
                onChange={(evt) => setaccountType(evt.target.value)}
              >
                <MenuItem value="Savings Account">Savings Account</MenuItem>
                <MenuItem value="Current Account">Current Account</MenuItem>
                <MenuItem value="Salary Account">Salary Account</MenuItem>
                <MenuItem value="Deposit Account">Deposit Account</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="branch"
              value={branch}
              label="Branch"
              name="branch"
              autoComplete="branch"
              onChange={(evt) => setbranch(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              value={ifsccode}
              id="ifsccode"
              label="IFSC Code"
              name="ifsccode"
              autoComplete="ifsccode"
              onChange={(evt) => setifsccode(evt.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(evt) => {
                      setcreditCardReq(!creditCardReq);
                    }}
                    value={creditCardReq}
                    checked={creditCardReq}
                  />
                }
                label="Need a Credit Card"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(evt) => {
                      setdebitCardReq(!debitCardReq);
                    }}
                    value={debitCardReq}
                    checked={debitCardReq}
                  />
                }
                label="Need a Debit Card"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                defaultValue={dayjs("2023-09-23")}
                onChange={(value) => {
                  let tp = new Date(value);
                  let final =
                    tp.getFullYear().toString() +
                    "-" +
                    tp.getMonth().toString() +
                    "-" +
                    tp.getDate().toString();
                  console.log(final.toString());
                  setopendate(final);
                }}
                sx={{ marginTop: "3%" }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add User
        </Button>
      </Box>
    </React.Fragment>
  );
}
