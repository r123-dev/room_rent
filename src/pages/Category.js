import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import Spinner from "../components/Layout/Spinner";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import ListingItem from "../components/Layout/ListingItem";

const Category = () => {
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListing(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, [params.categoryName]);
  return (
    <Layout>
      <div className="mt-3 container-fluid">
        <h1>
          {params.categoryName === "rent"
            ? "Places for Rent"
            : "places for sale"}
        </h1>
        {loading ? (
          <Spinner />
        ) : listing && listing.length > 0 ? (
          <div>
            {listing.map((list) => (
              <ListingItem listing={list.data} id={list.id} key={list.id} />
            ))}
          </div>
        ) : (
          <p>No Listing For {params.categoryName}</p>
        )}
      </div>
    </Layout>
  );
};

export default Category;
