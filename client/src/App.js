import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/index";
import Chat from "./pages/Chat";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import EditProduct from "./pages/EditProduct";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import UsersProfile from "./pages/UsersProfile";
import { loadUser } from "./actions/authActions";
import store from "./store";
import Offers from "./pages/Offers";
import OfferDetail from "./pages/OfferDetail";
import MyOfferDetails from "./pages/MyOfferDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./admin pages";
import PrivateRouteForAdmin from "./components/Routing/PrivateRouteForAdmin";
import Category from "./admin pages/Category";
import Users from "./admin pages/Users";
import EditUser from "./admin pages/EditUser";
import RegisterOrg from "./pages/RegisterOrg";
import LoginOrg from "./pages/LoginOrg";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Navbar />
      <div className="app">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:productId" component={ProductDetail} />
          <Route path="/profile/:myId" exact component={Profile} />
          <Route path="/edit-profile" exact component={EditProfile} />
          <Route
            path="/profile/user/:profileId"
            exact
            component={UsersProfile}
          />
          <Route path="/login" component={Login} />
          <Route path="/login-org" component={LoginOrg} />
          <Route path="/register" component={Register} />
          <Route path="/register-org" component={RegisterOrg} />
          <Route path="/post" component={Post} />
          <Route path="/edit/product/:productId" component={EditProduct} />
          <Route path="/chat" component={Chat} />
          <Route path="/offers" component={Offers} />
          <Route path="/offer/my/:id" component={MyOfferDetails} />
          <Route path="/offer/:id" component={OfferDetail} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <PrivateRouteForAdmin path="/admin" exact component={Admin} />
          <PrivateRouteForAdmin path="/category" exact component={Category} />
          <PrivateRouteForAdmin path="/users" exact component={Users} />
          <PrivateRouteForAdmin
            path="/users/edit/:userId"
            exact
            component={EditUser}
          />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
