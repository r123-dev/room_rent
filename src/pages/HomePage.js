import React from "react";
import Layout from "../components/Layout/Layout";
import Header from "../components/Layout/Header";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container mt-3">
        <Slider />
        <h1>Category</h1>
        <div className="d-flex">
          <div className="col-md-5">
            <div className="Imagecontainer">
              <img
                src={`https://images.unsplash.com/photo-1626178793926-22b28830aa30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvcGVydHl8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60`}
                alt="Rent"
                style={{ width: "100%" }}
              />
              <button
                className="btn"
                onClick={() => navigate("/category/rent")}
              >
                To RENT
              </button>
            </div>
          </div>
          <div className="cold-md-5">
            <div className="Imagecontainer">
              <img
                src={`https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80`}
                alt="Rent"
                style={{ width: "100%" }}
              />
              <button
                className="btn"
                onClick={() => navigate("/category/sale")}
              >
                TO SALE
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
