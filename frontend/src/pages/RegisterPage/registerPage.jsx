import { useState } from "react";

import axios from "axios";

const RegisterPage = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [pin, setpin] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [address, setaddress] = useState("");

  const submitFormHandler = async (evt) => {
    await axios
      .post("http://localhost:8080/customer/addCustomer/", {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
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
    <div>
      <div>
        <div>
          <label>First Name : </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={(evt) => setfirstName(evt.target.value)}
          />
        </div>
        <div>
          <label>Last Name : </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={(evt) => setlastName(evt.target.value)}
          />
        </div>
        <div>
          <label>Email : </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(evt) => setemail(evt.target.value)}
          />
        </div>
        <div>
          <label>Phone Number : </label>
          <input
            type="numeric"
            id="phoneNumber"
            name="phoneNumber"
            onChange={(evt) => setphoneNumber(evt.target.value)}
          />
        </div>
        <div>
          <label>Pasword : </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(evt) => setpassword(evt.target.value)}
          />
        </div>
        <div>
          <label>Pin : </label>
          <input
            type="numeric"
            id="pin"
            name="pin"
            onChange={(evt) => setpin(evt.target.value)}
          />
        </div>
        <div>
          <label>Date Of Birth : </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            onChange={(evt) => setdateOfBirth(evt.target.value)}
          />
        </div>
        <div>
          <label>Address : </label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={(evt) => setaddress(evt.target.value)}
          />
        </div>
        <div>
          <button onClick={submitFormHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
