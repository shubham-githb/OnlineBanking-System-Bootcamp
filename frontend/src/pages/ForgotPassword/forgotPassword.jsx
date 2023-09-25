import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [code, setcode] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .put("http://localhost:8080/customer/resetPassword/", {
        code: code,
        password: password,
        email: email,
      })
      .then((res) => {
        if (res.data === "Invalid Code.Password Not Updated!") {
          navigate("/forgotpassword");
          alert(res.data);
        } else {
          alert(res.data);
          navigate("/login");
        }
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/lvWw_G8tKsk)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="code"
                label="Enter Code"
                name="code"
                autoComplete="code"
                autoFocus
                onChange={(evt) => setcode(evt.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter Email"
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
                label="New Password"
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
                Reset Password
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
