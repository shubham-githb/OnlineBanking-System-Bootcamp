import * as React from "react";
import Link from "@mui/material/Link";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Title from "./Title";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";
import { Oval, ProgressBar } from "react-loader-spinner";

export default function CustomerDetails() {
  const [customer, setcustomer] = useState(
    JSON.parse(sessionStorage.getItem("loggedInCustomer"))
  );
  const [loading, setloading] = useState(false);

  const theme = createTheme({
    typography: {
      fontFamily: "Playfair Display",
    },
  });

  const getCustomerDetails = async () => {
    await axios
      .get(`http://localhost:8080/customer/getCustomer/${customer.customerId}`)
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    getCustomerDetails();
  }, [customer]);

  return (
    <React.Fragment>
      <Title>Customer Details</Title>
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
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <ThemeProvider theme={theme}>
                  <Box sx={{ fontFamily: "PlayFair Display" }}>
                    <Typography variant="h5">
                      First Name : {customer.firstName}
                    </Typography>
                    <Typography variant="h5">
                      Last Name : {customer.lastName}
                    </Typography>
                    <Typography variant="h5">
                      Email : {customer.email}
                    </Typography>
                    <Typography variant="h5">
                      Phone Number : {customer.phoneNumber}
                    </Typography>
                    <Typography variant="h5">
                      Date Of Birth : {customer.dateOfBirth}
                    </Typography>
                    <Typography variant="h5">
                      Address : {customer.address}
                    </Typography>
                  </Box>
                </ThemeProvider>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </React.Fragment>
  );
}
