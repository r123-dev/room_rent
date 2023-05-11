import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { FaEdit, FaArrowAltCircleRight } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

const Profile = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchUserListings();
  }, []);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
  });
  const [changeDetails, setChangeDetails] = useState(false);
  const navigate = useNavigate();
  const { name, email } = formData;

  const logoutHandler = () => {
    auth.signOut();

    navigate("/");
  };
  const prevState = useState(false);
  const onchange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onsubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const userRef = doc(db, "users", auth.currentUser.id);
        await updateDoc(userRef, { name });
        console.log("successfully updated");
      }
    } catch (error) {
      toast.error("someting went wrong");
    }
  };
  return (
    <Layout>
      <div className="container m-20 w-50 d-flex justify-content-between">
        <h4>Profile Details</h4>
        <button className="btn btn-danger" onClick={logoutHandler}>
          Logout
        </button>
      </div>

      <div className="container m-auto" style={{ width: "18rem" }}>
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <p>User Personal Details</p>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                changeDetails && onsubmit();
                setChangeDetails(prevState != prevState);
              }}
            >
              {changeDetails ? (
                <MdDoneOutline color="green" />
              ) : (
                <FaEdit color="red" />
              )}
            </span>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={onsubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={onchange}
                disabled={changeDetails}
              />
            </div>
          </form>
        </div>
      </div>

      <div>
        <Link to="/create-listing">
          <FaArrowAltCircleRight color="primary" />
          sell or rent your home
        </Link>
      </div>
      <div>
        {listings && listings?.length > 0 && (
          <>
            <h6>Your listings</h6>
            hjk,jlk
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
