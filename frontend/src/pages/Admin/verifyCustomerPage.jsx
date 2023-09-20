import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Button } from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";
import { Oval, ProgressBar } from "react-loader-spinner";

const defaultTheme = createTheme();

export default function VerifyCustomerPage() {
  const [unverified, setunverified] = useState();
  const getUnverifiedCustomers = async () => {
    await axios
      .get("http://localhost:8080/admin/getUnverifiedCustomers")
      .then((res) => {
        setunverified(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    getUnverifiedCustomers();
  }, []);

  const handleVerify = async (evt) => {
    let custid = evt.target.name;
    await axios
      .post("http://localhost:8080/admin/verifyCustomerAccount", {
        customerId: custid,
      })
      .then((res) => {
        console.log(res.data);
      });
    getUnverifiedCustomers();
  };
  return (
    <React.Fragment>
      <Title>Verify Customer Accounts</Title>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {unverified == null ? (
              <></>
            ) : (
              unverified.map((row) => (
                <TableRow key={row.customerId}>
                  <TableCell>{row.customerId}</TableCell>
                  <TableCell>
                    {row.firstName} {row.lastName}
                  </TableCell>
                  <TableCell>
                    <Button
                      name={row.customerId}
                      variant="contained"
                      sx={{
                        padding: "1%",
                        marginTop: "3%",
                        marginLeft: "45%",
                        marginBottom: "1%",
                      }}
                      onClick={handleVerify}
                    >
                      Verify
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
    </React.Fragment>
  );
}
