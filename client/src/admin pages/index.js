import React, { useEffect } from "react";
import AdminSidebar from "./components/AdminSidebar";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../actions/productActions";
import Loader from "../components/Loader";

const Admin = () => {
  const dispatch = useDispatch();

  const { loading, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="admin">
      <AdminSidebar />
      <div className="p-5 admin__content">
        <h1>Welcome to the Admin Panel</h1>
        <h4 className="my-4">Total Products {products && products.length}</h4>

        {loading ? (
          <Loader />
        ) : (
          <table class="table">
            <thead class="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Offers</th>
                <th scope="col">Reviews</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <th scope="row">{product._id}</th>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.custommerOffers.length}</td>
                    <td>{product.numReviews}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Admin;
