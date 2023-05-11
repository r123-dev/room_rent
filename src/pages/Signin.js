import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import OAuth from "../components/Layout/OAuth";
const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center w-100 mt-4">
        <form className="bg-light p=4" onSubmit={loginHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={onChange}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onChange}
              className="form-control"
              id="password"
            />
            <span>
              show Password
              <BsFillEyeFill
                className="text-Danger"
                onClick={() => {
                  setShowPassword((prevState) => !prevState);
                }}
              />
            </span>
            <Link to="/forgot-password">forgotPassword</Link>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
          <OAuth />
          <div className="mt-50">
            <span>Already User</span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Signin;
