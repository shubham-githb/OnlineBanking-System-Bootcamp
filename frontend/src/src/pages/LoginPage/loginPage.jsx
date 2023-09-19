// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import axios from "axios";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");

//   const submitFormHandler = async (evt) => {
//     await axios
//       .post("http://localhost:8080/customer/verifyCustomer/", {
//         email: email,
//         password: password,
//       })
//       .then((res) => {
//         let loggedInCustomer = res.data.customerdata;
//         sessionStorage.setItem(
//           "loggedInCustomer",
//           JSON.stringify(loggedInCustomer)
//         );
//         navigate("/dashboard");
//       });
//   };

//   return (
//     <div>
//       <div>
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
//           <label>Password : </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             onChange={(evt) => setpassword(evt.target.value)}
//           />
//         </div>
//         <div>
//           <button onClick={submitFormHandler}>Submit</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:8080/customer/verifyCustomer/", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        let loggedInCustomer = res.data.customerdata;
        sessionStorage.setItem(
          "loggedInCustomer",
          JSON.stringify(loggedInCustomer)
        );
        navigate("/dashboard");
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(evt) => setemail(evt.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(evt) => setpassword(evt.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
