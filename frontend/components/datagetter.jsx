import { useState, useEffect } from "react";
import axios from "axios";
import { Oval, ProgressBar } from "react-loader-spinner";

const DataGetter = () => {
  const [customer, setcustomer] = useState(
    JSON.parse(sessionStorage.getItem("loggedInCustomer"))
  );
  const [loading, setloading] = useState(true);

  const getUserAccounts = async () => {
    await axios
      .get(
        `http://localhost:8080/account/getAccountsByCustomerId/${customer.customerId}`
      )
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    console.log(customer);
    getUserAccounts();
    setloading(false);
  }, [customer]);

  useEffect(() => {}, [customer]);
  return (
    <div>
      {loading ? (
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
      ) : (
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
      )}
    </div>
  );
};

export default DataGetter;
