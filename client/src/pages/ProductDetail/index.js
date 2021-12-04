import React, { useEffect, useState } from "react";
import "./style.css";
import Moment from "react-moment";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { FiHeart } from "react-icons/fi";
import { GrNext } from "react-icons/gr";
import { OfferModal } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  productDetailsAction,
  productReviewAction,
} from "../../actions/productActions";
import { getUserById } from "../../actions/usersAction";
import {
  myProductOffersAction,
  offerDetails,
} from "../../actions/offerActions";
import Loader from "../../components/Loader";
import { useAlert } from "react-alert";
import { Button, Rating } from "../../components";
import DeleteModal from "../../components/Modals/DeleteModal";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { createConversation } from "../../actions/conversationAction";
import { PRODUCT_REVIEW_SAVE_RESET } from "../../constants/productConstants";

const ProductDetail = ({ match, history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const productId = match.params.productId;

  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const {
    loading: reviewLoading,
    success: reviewSuccess,
    error: reviewError,
  } = useSelector((state) => state.productReview);
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { success } = useSelector((state) => state.deleteProduct);
  const { offers, loading: offersLoading } = useSelector(
    (state) => state.myProductOffers
  );

  const { error: createOfferError } = useSelector((state) => state.createOffer);
  const { success: conversationSuccess } = useSelector(
    (state) => state.createConversation
  );

  useEffect(() => {
    if (reviewSuccess) {
      alert.success("Review submitted successfully");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
      dispatch(productDetailsAction(productId));
    }
  }, [conversationSuccess, reviewSuccess, alert, dispatch, productId]);

  useEffect(() => {
    if (createOfferError) {
      alert.error(createOfferError);
    }

    if (reviewError) {
      alert.error(reviewError);
    }
  }, [alert, createOfferError, reviewError]);

  useEffect(() => {
    if (success) {
      history.push(`/profile/${user._id}`);
      alert.success("Product deleted successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [success, dispatch, history, user, alert]);

  useEffect(() => {
    dispatch(productDetailsAction(productId));
    dispatch(myProductOffersAction(productId));
    if (error) {
      return alert.error(error);
    }
  }, [dispatch, productId, alert, error, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      productReviewAction(productId, {
        name: user.username,
        rating,
        comment,
      })
    );
  };

  useEffect(() => {
    if (product || reviewSuccess) {
      setReviews(product.reviews);
    }
  }, [product, reviewSuccess]);

  return (
    <section className="container section productdetail">
      <div className="row">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="col-md-8">
              <Carousel pause="hover" className="productdetail__carousel">
                {product &&
                  product.images.map((img) => (
                    <Carousel.Item
                      key={img._id}
                      className="productdetail__carouselItem"
                    >
                      <img
                        className="d-block w-100"
                        src={img.url}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
              <div className="productdetail__description">
                <h4>Description</h4>
                <p>{product && product.description}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="productdetail__info">
                <div className="info--top">
                  <div>
                    <h2>Exchange with - {product && product.exchangeWith}</h2>
                    <p>{product && product.name}</p>
                    <p>Exchange Price: ${product && product.exchangePrice}</p>
                    <div className="es_shipping_date">
                      <span>Estimated Shipping Date: </span>
                      <Moment format="DD MMM YYYY">
                        {product?.shippingDate}
                      </Moment>
                    </div>
                  </div>
                  {user && user._id === product.user._id ? (
                    ""
                  ) : (
                    <FiHeart className="product--saveicon" />
                  )}
                </div>
                {user && user._id === product.user._id ? (
                  <div className="py-2"></div>
                ) : (
                  <div className="info--bottom">
                    <small>{product && product.addressOne}</small>
                    <small>{format(product?.createdAt)}</small>
                  </div>
                )}

                {user && user._id === product.user._id ? (
                  <>
                    <Link to={`/edit/product/${product._id}`}>
                      <Button className="button mt-2">Edit</Button>
                    </Link>
                    <Button className="button mt-2" onClick={handleShowDelete}>
                      Delete
                    </Button>
                  </>
                ) : isAuthenticated ? (
                  <button
                    className="sellerInfo--chatBtn mt-2"
                    onClick={handleShow}
                  >
                    Make Offer
                  </button>
                ) : (
                  <Link to="/login">
                    <button className="sellerInfo--chatBtn mt-2">
                      Make Offer
                    </button>
                  </Link>
                )}

                <OfferModal
                  show={show}
                  handleClose={handleClose}
                  productId={product._id}
                  history={history}
                />
                <DeleteModal
                  showDelete={showDelete}
                  handleCloseDelete={handleCloseDelete}
                  productId={productId}
                  userId={user && user._id}
                />
              </div>
              <div className="productdetail__sellerInfo">
                <h3>Seller Description</h3>
                <div className="sellerInfo--user">
                  <div>
                    <img
                      src={product.user && product.user.avatar}
                      alt="avatar"
                    />
                    <div>
                      <h3>{product.user && product.user.username}</h3>
                      <small>
                        Member since{" "}
                        <Moment format="MMM YYYY">
                          {product.user.createdAt}
                        </Moment>
                      </small>
                    </div>
                  </div>
                  <Link
                    to={`/profile/user/${product.user._id}`}
                    onClick={() => dispatch(getUserById(product.user._id))}
                  >
                    <GrNext className="user--profile" />
                  </Link>
                </div>
                {user && user._id === product?.user._id ? (
                  ""
                ) : isAuthenticated ? (
                  <Link
                    to="/chat"
                    onClick={() =>
                      dispatch(
                        createConversation({
                          senderId: user._id,
                          receiverId: product.user._id,
                        })
                      )
                    }
                    className="sellerInfo--chatBtn text-center"
                  >
                    Chat with exchanger
                  </Link>
                ) : (
                  <Link to="/login" className="sellerInfo--chatBtn text-center">
                    Chat with exchanger
                  </Link>
                )}
              </div>
              <div className="productdetail__sellerLocation">
                <h4>Posted in</h4>
                <small>{product && product.addressOne}</small>
              </div>
              <h5>AD ID: {product._id}</h5>
            </div>
          </>
        )}
      </div>

      {user && user._id === product.user._id ? (
        <>
          <hr />
          <div className="row my-5 mx-1">
            <h2>
              Custommer Offers for <strong>"{product && product.name}"</strong>
              {user && user._id === product?.user._id
                ? offers.product && (
                    <small className="d-block my-3">
                      You have {offers.product.custommerOffers.length} offers
                    </small>
                  )
                : ""}
            </h2>
            <div className="col-md-10 mt-3">
              {offersLoading ? (
                <Loader />
              ) : user && user._id === product.user._id ? (
                offers.product &&
                offers.product.custommerOffers.map((offer) => (
                  <div className="card mb-3 offer_card">
                    <div className="card-body d-flex">
                      <img
                        src={offer.images[0].url}
                        alt=""
                        width="250"
                        height="180"
                        className="mr-2"
                      />
                      <div className="ml-2">
                        <h3>Offerd for: {offer.name}</h3>
                        <p className="py-3">
                          Phone: <strong>{offer.phone}</strong>
                        </p>
                        <p className="mb-4">
                          {offer.description.slice(0, 150)}...
                        </p>
                        <Link to={`/offer/${offer._id}`} className="py-2">
                          <Button
                            className="button-sm"
                            onClick={() => dispatch(offerDetails(offer._id))}
                          >
                            View Offer
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>noo</p>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {/* Rating Form*/}
      <hr />
      <div className="mt-3">
        <h3 className="mb-3">Write a customer review</h3>
        {isAuthenticated ? (
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <select
                className="form-control"
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option>Select Rating</option>
                <option value="1">1- Poor</option>
                <option value="2">2- Fair</option>
                <option value="3">3- Good</option>
                <option value="4">4- Very Good</option>
                <option value="5">5- Excelent</option>
              </select>
            </div>
            <div className="form-group">
              <label>Comment</label>
              <textarea
                rows={3}
                name="comment"
                className="form-control"
                placeholder="Enter your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button
              disabled={reviewLoading ? true : false}
              className={`button ${reviewLoading ? "disabled" : ""}`}
              type="submit"
            >
              Submit
            </button>
          </form>
        ) : (
          <div>
            Please <Link to="/login">Log in</Link> to write a review.
          </div>
        )}
      </div>

      {/* Rating lists */}
      <div md={6} sm={12} className="mt-3">
        <h2 className="mb-2">Reviews</h2>
        {reviews && reviews.length === 0 && <div>There is no review</div>}
        <div className="mb-2">Total reviews {reviews.length}</div>

        {reviews &&
          reviews.map((review) => (
            <div className="card mb-2">
              <div key={review._id} className="card-body">
                <div className="d-flex align-items-center">
                  <img
                    src={review.avatar}
                    alt=""
                    style={{ height: 40, width: 40, borderRadius: "100%" }}
                  />
                  <strong className="ml-2">{review.name}</strong>
                </div>
                <div>
                  <Rating value={review.rating}></Rating>
                </div>
                <div>{review.comment}</div>
                <small className="text-muted">{format(review.createdAt)}</small>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProductDetail;
