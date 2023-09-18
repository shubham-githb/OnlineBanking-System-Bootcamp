import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const submitFormHandler = async (evt) => {
    await axios
      .post("http://localhost:8080/customer/verifyCustomer/", {
        email: email,
        password: password,
      })
      .then((res) => {
        let loggedInCustomer = res.data.customerdata;
        sessionStorage.setItem(
          "loggedInCustomer",
          JSON.stringify(loggedInCustomer)
        );
        navigate("/dashboard");
      });
  };

  return (
    <div>
      <div>
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
          <label>Password : </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(evt) => setpassword(evt.target.value)}
          />
        </div>
        <div>
          <button onClick={submitFormHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
