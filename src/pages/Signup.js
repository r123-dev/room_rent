import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import OAuth from "../components/Layout/OAuth";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });
      const formDatacopy = { ...formData };
      delete formDatacopy.password;
      formDatacopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDatacopy);

      navigate("/");
      alert("signup successful");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center w-100 mt-4">
        <form className="bg-light p-4" onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Enter name
            </label>
            <input
              type="text"
              value={name}
              className="form-control"
              id="name"
              onChange={onChange}
              aria-describedby="nameHelp"
            />
          </div>
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
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <div>
            <OAuth />
            <span>Already User</span>
            <Link to="/signin">LogIn</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
