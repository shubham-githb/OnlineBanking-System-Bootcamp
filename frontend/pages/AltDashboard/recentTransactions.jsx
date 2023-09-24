import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Title from "./Title";

import { useState, useEffect } from "react";
import axios from "axios";
import { Oval, ProgressBar } from "react-loader-spinner";
import { Button } from "@mui/material";

function preventDefault(event) {
  event.preventDefault();
}

export default function RecentTransactions() {
  const [customer, setcustomer] = useState(
    JSON.parse(sessionStorage.getItem("loggedInCustomer"))
  );
  const [recenttransactions, setrecenttransactions] = useState([]);
  const [loading, setloading] = useState(true);

  const getRecentTransactions = async () => {
    await axios
      .get(
        `http://localhost:8080/customer/getRecentTransactions/${customer.customerId}`
      )
      .then((res) => {
        console.log(res.data);
        setrecenttransactions(res.data);
        setloading(false);
      });
  };

  useEffect(() => {
    getRecentTransactions();
  }, [customer]);

  return (
    <React.Fragment>
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
        <Box>
          <Title>Recent Transactions</Title>
          <Table size="small">
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
              {recenttransactions.map((row) => (
                <TableRow key={row.transactionId}>
                  <TableCell>{row.txtime}</TableCell>
                  <TableCell>{row.creditOrDebit}</TableCell>
                  <TableCell>{row.transactionType}</TableCell>
                  <TableCell>{row.transactionAmount}</TableCell>
                  <TableCell>{row.receiverAccountNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            variant="contained"
            sx={{
              padding: "1%",
              marginTop: "3%",
              marginLeft: "45%",
              marginBottom: "1%",
            }}
            onClick={getRecentTransactions}
          >
            Refresh
          </Button>
        </Box>
      )}
    </React.Fragment>
  );
}
