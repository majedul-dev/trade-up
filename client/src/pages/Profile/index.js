import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { myProducts } from "../../actions/productActions";
import { format } from "timeago.js";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products, loading } = useSelector((state) => state.myProducts);

  useEffect(() => {
    dispatch(myProducts());
  }, [dispatch]);

  return (
    <section className="section container profile">
      <div className="row">
        <div className="col-md-4">
          <div className="profile__info">
            <img src={user.avatar && user.avatar} alt="" />
            <div>
              <h2>{user.username ? user.username : user.orgname}</h2>
              <small>
                Member since <Moment format="MMM YYYY">{user.createdAt}</Moment>
              </small>
            </div>
            <Link to="/edit-profile" className="profile__btn">
              Edit Profile
            </Link>
          </div>
        </div>
        <div className="col-md-8">
          <h3>Your All Ads</h3>
          {!loading && products.length === 0 && (
            <h2 className="display-2 text-muted mt-5">
              You have no Exchanges!
            </h2>
          )}
          <div className="row py-3">
            <div className="col-md-4 col-sm-6">
              {loading ? (
                <Loader />
              ) : (
                products &&
                products.map((product) => (
                  <>
                    <Link
                      to={`/product/${product._id}`}
                      className="col-md-4"
                      key={product.id}
                    >
                      <div className="card mb-4">
                        <div className="product--top">
                          <img
                            src={product.images[0].url}
                            alt="avatar"
                            className="product--img"
                          />
                        </div>
                        <div className="card-body product--content">
                          <h3 className="card-text text-muted">
                            {product.name}
                          </h3>
                          <h4>Exchange with - {product.exchangeWith}</h4>
                        </div>
                        <div className="product--footer">
                          <small>{format(product.createdAt)}</small>
                        </div>
                      </div>
                    </Link>
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
