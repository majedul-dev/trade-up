import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  getAllProducts,
  productDetailsAction,
} from "../../actions/productActions";
import Loader from "../../components/Loader";
import Pagination from "react-js-pagination";
import { Banner } from "../../components";
import { getCategories } from "../../actions/categoryActions";
import { format } from "timeago.js";

const Home = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );
  const { loading: categoryLoading, categories } = useSelector(
    (state) => state.getCategories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const keyword = match.params.keyword;

  useEffect(() => {
    dispatch(getAllProducts(keyword, currentPage, category));
    if (error) {
      return alert.error(error);
    }
  }, [dispatch, alert, error, keyword, currentPage, category]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      {categoryLoading ? (
        ""
      ) : (
        <div className="categories">
          <ul className="container categories__items">
            <li>
              <strong>CATEGORIES</strong>
            </li>
            {categories &&
              categories.map((cat) => {
                return (
                  <li key={cat._id} onClick={() => setCategory(cat.category)}>
                    {cat.category}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
      <section>
        <Banner className="hero--banner" />
        <div className="container section">
          <h2 className="pt-4 text-dark">
            Let's See What You are Looking for Today
          </h2>
          <div className="row py-3">
            {loading ? (
              <Loader />
            ) : (
              products &&
              products.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  className="col-md-3 my-2"
                  key={product._id}
                  onClick={() => dispatch(productDetailsAction(product._id))}
                >
                  <div className="card product">
                    <div className="product--top">
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
                      <small>{product.user.address.slice(0, 15)}...</small>
                      <small>{format(product.createdAt)}</small>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {resPerPage <= productsCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page__item"
            linkClass="page__link"
          />
        </div>
      )}
    </>
  );
};

export default Home;
