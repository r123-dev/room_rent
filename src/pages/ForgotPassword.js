import { useState } from "react";

import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h1>Reset your Password</h1>
        <form onSubmit={onSubmitHandle}>
          <div className=" container mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Enter email
            </label>
            <input
              type="email"
              value={email}
              className="form-control"
              id="name"
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="nameHelp"
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              reset
            </button>

            <Link to="/signin"> Sign IN</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
