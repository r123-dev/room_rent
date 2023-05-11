import Homepage from "./pages/HomePage";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/Layout/PrivateRoute";
import Category from "./pages/Category";
import HomePage from "./pages/HomePage";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Contact from "./pages/Contact";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/contact/:landlordId" element={<Contact />} />
        <Route path="category/:categoryName/:listingId" element={<Listing />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/offers" element={<Offers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
