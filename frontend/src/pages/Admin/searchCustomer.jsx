import Typography from "@mui/material/Typography";
import Title from "./Title";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useState, useEffect } from "react";
import axios from "axios";
import { Oval, ProgressBar } from "react-loader-spinner";

const theme = createTheme({
  typography: {
    fontFamily: "Playfair Display",
  },
});

export default function SearchCustomer() {
  const [customerid, setcustomerid] = useState();
  const [customer, setcustomer] = useState();
  const [loading, setloading] = useState(false);
  const getUserAccount = async () => {
    await axios
      .get(`http://localhost:8080/customer/getCustomer/${customerid}`)
      .then((res) => {
        setloading(false);
        setcustomer(res.data);
        console.log(res.data);
      });
  };

  const [open, setOpen] = useState(false);

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleCustomerDetails = (event) => {
    getUserAccount();
    setOpen(true);
  };

  const SimpleDialog = (props) => {
    const { accountsummary, open } = props;
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Dialog fullWidth={true} maxWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle color="primary">Customer Details</DialogTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "PlayFair Display",
            padding: "2%",
          }}
        >
          {customer == null ? (
            <></>
          ) : (
            <>
              <Typography variant="h5">
                First Name : {customer.firstName}
              </Typography>
              <Typography variant="h5">
                Last Name : {customer.lastName}
              </Typography>
              <Typography variant="h5">Email : {customer.email}</Typography>
              <Typography variant="h5">
                Phone Number : {customer.phoneNumber}
              </Typography>
              <Typography variant="h5">
                Date Of Birth : {customer.dateOfBirth}
              </Typography>
              <Typography variant="h5">Address : {customer.address}</Typography>
            </>
          )}
        </Box>
      </Dialog>
    );
  };

  return (
    <React.Fragment>
      <Title>Get Customer Details</Title>
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="customerid"
            label="Customer ID"
            id="password"
            onChange={(evt) => setcustomerid(evt.target.value)}
          />
          <Button
            variant="contained"
            sx={{ padding: "1%", margin: "2%", marginTop: "2%" }}
            onClick={handleCustomerDetails}
          >
            Get Customer Details
          </Button>
          <SimpleDialog open={open} onClose={handleClose} customer={customer} />
        </Box>
      )}
    </React.Fragment>
  );
}
