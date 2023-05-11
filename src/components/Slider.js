import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase.config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SwipeCore, { EffectCoverflow, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import Spinner from "./Layout/Spinner";
SwipeCore.use([EffectCoverflow, Pagination]);

const Slider = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchlistings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
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
    fetchlistings();
  }, [listings]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="container-fluid"></div>
    </>
  );
};

export default Slider;
