import React from "react";
import Layout from "../components/Layout/Layout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
const Contact = () => {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", params.landlordId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
      }
    };
    getLandlord();
  }, [params.landlordId]);
  return (
    <Layout>
      <div className="container mt-4">
        <h3>Contacts</h3>
        {landlord !== "" && (
          <main>
            <h4>{landlord?.name}</h4>
            <form>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  value={message}
                  placeholder="leave a comment here"
                  id="message"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <label htmlFor="floatingTextarea">send your message</label>
              </div>
              <a
                href={`mailto:${landlord.email}?Subject=${searchParams.get(
                  "listingName"
                )}&body=${message}`}
              >
                <button className="btn btn-primary mt-2">Send message</button>
              </a>
            </form>
          </main>
        )}
      </div>
    </Layout>
  );
};

export default Contact;
