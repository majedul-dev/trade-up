import React, { useState, useEffect } from "react";

import AdminSidebar from "../components/AdminSidebar";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, deleteCategory } from "../../actions/categoryActions";
import CategoryModal from "../components/CategoryModal";

const Category = ({ history }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const { categories, loading } = useSelector((state) => state.getCategories);
  const { success } = useSelector((state) => state.createCategory);
  const { success: deleteCategorySuccess } = useSelector(
    (state) => state.deleteCategory
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch, success, deleteCategorySuccess]);

  return (
    <div className="admin">
      <AdminSidebar />
      <div className="p-5 admin__content">
        <h2>Categories</h2>

        <button className="button mt-3" onClick={handleShow}>
          Create
        </button>

        {loading ? (
          <Loader />
        ) : (
          <table class="table mt-5">
            <thead class="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <>
                  <tr key={category._id}>
                    <th scope="row">{category._id}</th>
                    <td>{category.category}</td>
                    <td>
                      <button
                        className="button-sm"
                        onClick={() => dispatch(deleteCategory(category._id))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <CategoryModal show={show} handleClose={handleClose} history={history} />
    </div>
  );
};
export default Category;
