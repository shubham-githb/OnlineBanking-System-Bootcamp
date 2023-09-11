import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const navigate = useNavigate();

  const addCustomer = async () => {
    await axios
      .post("http://localhost:8080/customer/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        pin: pin,
        dateOfBirth: dateOfBirth,
        address: address,
      })
      .then((res) => {});
  };

  return (
    <div className="bg-dark d-flex" style={{ height: "100vh" }}>
      <div className="container m-5 mx-auto bg-body-tertiary rounded">
        <div className="text-center mt-2">
          <h1>Login Page</h1>
          <form>
            <div class="mb-3">
              <label for="firstName" class="form-label">
                First Name
              </label>
              <input
                onChange={(e) => setfirstName(e.target.value)}
                type="text"
                class="form-control"
                id="firstName"
                name="firstName"
              />
            </div>
            <div class="mb-3">
              <label for="lastName" class="form-label">
                Last Name
              </label>
              <input
                onChange={(e) => setlastName(e.target.value)}
                type="text"
                class="form-control"
                id="lastName"
                name="lastName"
              />
            </div>
            <div class="mb-3">
              <label for="emailId" class="form-label">
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                class="form-control"
                id="emailId"
                name="emailId"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                class="form-control"
                id="password"
                name="password"
              />
            </div>
            <div class="mb-3">
              <label for="pin" class="form-label">
                Pin
              </label>
              <input
                onChange={(e) => setPin(e.target.value)}
                type="number"
                class="form-control"
                id="pin"
                name="pin"
              />
            </div>
            <div class="mb-3">
              <label for="dateOfBirth" class="form-label">
                Date Of Birth
              </label>
              <input
                onChange={(e) => setDateOfBirth(e.target.value)}
                type="date"
                class="form-control"
                id="dateOfBirth"
                name="dateOfBirth"
              />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">
                Address
              </label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                class="form-control"
                id="address"
                name="address"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
