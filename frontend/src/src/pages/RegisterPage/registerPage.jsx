// import { useState } from "react";

// import axios from "axios";

// const RegisterPage = () => {
//   const [firstName, setfirstName] = useState("");
//   const [lastName, setlastName] = useState("");
//   const [email, setemail] = useState("");
//   const [phoneNumber, setphoneNumber] = useState("");
//   const [password, setpassword] = useState("");
//   const [pin, setpin] = useState("");
//   const [dateOfBirth, setdateOfBirth] = useState("");
//   const [address, setaddress] = useState("");

//   const submitFormHandler = async (evt) => {
//     await axios
//       .post("http://localhost:8080/customer/addCustomer/", {
//         firstName: firstName,
//         lastName: lastName,
//         phoneNumber: phoneNumber,
//         email: email,
//         activeStatus: false,
//         address: address,
//         dateOfBirth: dateOfBirth,
//         password: password,
//         pin: pin,
//       })
//       .then((res) => {
//         console.log(res.data);
//       });
//   };

//   return (
//     <div>
//       <div>
//         <div>
//           <label>First Name : </label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             onChange={(evt) => setfirstName(evt.target.value)}
//           />
//         </div>
//         <div>
//           <label>Last Name : </label>
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             onChange={(evt) => setlastName(evt.target.value)}
//           />
//         </div>
//         <div>
//           <label>Email : </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             onChange={(evt) => setemail(evt.target.value)}
//           />
//         </div>
//         <div>
//           <label>Phone Number : </label>
//           <input
//             type="numeric"
//             id="phoneNumber"
//             name="phoneNumber"
//             onChange={(evt) => setphoneNumber(evt.target.value)}
//           />
//         </div>
//         <div>
//           <label>Pasword : </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             onChange={(evt) => setpassword(evt.target.value)}
//           />
//         </div>
//         <div>
//           <label>Pin : </label>
//           <input
//             type="numeric"
//             id="pin"
//             name="pin"
//             onChange={(evt) => setpin(evt.target.value)}
//           />
//         </div>
//         <div>
//           <label>Date Of Birth : </label>
//           <input
//             type="date"
//             id="dateOfBirth"
//             name="dateOfBirth"
//             onChange={(evt) => setdateOfBirth(evt.target.value)}
//           />
//         </div>
//         <div>
//           <label>Address : </label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             onChange={(evt) => setaddress(evt.target.value)}
//           />
//         </div>
//         <div>
//           <button onClick={submitFormHandler}>Submit</button>
//         </div>
//       </div>

//     </div>
//   );
// };
// export default RegisterPage;

import { useState } from "react";
import axios from "axios";

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

export default function LoginPage() {
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
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
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
                    label="Uncontrolled picker"
                    defaultValue={dayjs("2022-04-17")}
                    onChange={(value) => setdateOfBirth(value.toString())}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
