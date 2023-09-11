import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";

const LandingPage = () => {
  return (
    <div className="bg-dark d-flex" style={{ height: "100vh" }}>
      <div class="container py-4">
        <div class="p-5 mb-4 bg-body-tertiary rounded-3 text-center">
          <div class="container-fluid py-5">
            <Link className="btn btn-lg btn-outline-dark m-3" to="/login">
              <p className="h1">Login</p>
            </Link>
            <Link className="btn btn-lg btn-outline-dark m-3" to="/login">
              <p className="h1">Sign Up</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
