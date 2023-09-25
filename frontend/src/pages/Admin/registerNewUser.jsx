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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

const defaultTheme = createTheme();

export default function RegisterNewUser() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [pin, setpin] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [address, setaddress] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:8080/customer/addCustomer/", {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        activeStatus: false,
        address: address,
        dateOfBirth: dateOfBirth,
        password: password,
        pin: pin,
      })
      .then((res) => {
        console.log(res.data);
        setfirstName("");
        setlastName("");
        setemail("");
        setphoneNumber();
        setpassword("");
        setpin(0);
        setaddress("");
      });
  };
  return (
    <React.Fragment>
      <Title>Create User</Title>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              value={firstName}
              id="firstName"
              label="First Name"
              autoFocus
              onChange={(evt) => setfirstName(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              value={lastName}
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              onChange={(evt) => setlastName(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              value={email}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(evt) => setemail(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              value={password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={(evt) => setpassword(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              value={phoneNumber}
              name="phoneNumber"
              label="Phone Number"
              type="numeric"
              id="phoneNumber"
              onChange={(evt) => setphoneNumber(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              value={pin}
              name="pin"
              label="Pin"
              type="numeric"
              id="pin"
              onChange={(evt) => setpin(evt.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date Of Birth"
                defaultValue={dayjs("2022-04-17")}
                onChange={(value) => setdateOfBirth(value.toString())}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              value={address}
              name="address"
              label="Address"
              type="text"
              id="address"
              onChange={(evt) => {
                setaddress(evt.target.value);
              }}
            />
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
