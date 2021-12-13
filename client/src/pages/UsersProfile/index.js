import React, { useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../actions/usersAction";
import { usersProducts } from "../../actions/productActions";
import Loader from "../../components/Loader";
import { format } from "timeago.js";

const UsersProfile = ({ match }) => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.getUserById);
  const { products, loading: productsLoading } = useSelector(
    (state) => state.usersProducts
  );

  useEffect(() => {
    dispatch(getUserById(match.params.profileId));
    dispatch(usersProducts(match.params.profileId));
  }, [dispatch, match]);
  return (
    <section className="section profile">
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <div className="profile__userInfo">
            <img src={user.avatar} alt="avatar" />
            <div>
              <h3 className="mb-2">
                {user && user.username ? user.username : user.orgname}
              </h3>
              <p>Address: {user && user.address}</p>
              <p>Phone: {user && user.phone}</p>
            </div>
          </div>
        )}
        <div className="profile__postedAd">
          <h4 className="mb-3">Published Exchanges</h4>
          <div className="row">
            <div className="col-md-3 col-sm-6">
              {productsLoading ? (
                <Loader />
              ) : (
                products &&
                products.map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className="col-md-3 my-2"
                  >
                    <div className="card product">
                      <div className="product--top">
                        {/* {product.images.map((img, index) => ( */}
                        <img
                          src={product.images[0].url}
                          alt=""
                          className="product--img"
                        />
                      </div>
                      <div className="card-body product--content">
                        <h3 className="card-text text-muted">{product.name}</h3>
                        <h4>Exchange with - {product.exchangeWith}</h4>
                      </div>

                      <div className="product--footer">
                        <small>{format(product.createdAt)}</small>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsersProfile;
