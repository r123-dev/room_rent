import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { useNavigate, Link, useParams } from "react-router-dom";
import SwipeCore, { EffectCoverflow, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import Spinner from "../components/Layout/Spinner";
import SimpleImageSlider from "react-simple-image-slider";
SwipeCore.use([EffectCoverflow, Pagination]);
const Listing = () => {
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <Layout>
      <div className="container d-flex align-items-center justify-content-center mt-4">
        <div className="card" style={{ width: "600px" }}>
          <div className="card-header"></div>
          <div className="card-body">
            <h6>
              Price :{" "}
              {listing.offer ? listing.discountedPrice : listing.regularPrice}
              /Rs
            </h6>
            <p>{listing.type === "rent" ? "Rent" : "sale"}</p>
            <p>
              {listing.offer && (
                <span>
                  {listing.regularPrice - listing.discountedPrice} Discount
                </span>
              )}
            </p>
            <p>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : "1 Bedroom"}
            </p>
            <p>{listing.parking ? "Parking spot" : "no spot for parking"}</p>
            <p>{listing.furnished ? "furnished house" : "not furnished"}</p>
          </div>
          <Link
            className="btn btn-success"
            to={`/contact/${listing.useRef}?listingName=${listing.name}`}
          >
            Contact Landlord
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Listing;
