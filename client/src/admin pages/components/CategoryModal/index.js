import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { Modal } from "react-bootstrap";
import { createCategory } from "../../../actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";

const CategoryModal = ({ show, handleClose, history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [category, setCategory] = useState("");

  const { loading, success, error } = useSelector(
    (state) => state.createCategory
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (success) {
      history.push("/category");
      setCategory("");
    }
  }, [success, history, alert, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("category", category);

    dispatch(createCategory(formData));
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Create a Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitHandler}>
          <div className="form-group mb-3">
            <label htmlFor="">Category</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter a Category"
              width="100%"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <small class="form-text text-muted">
              Category should be Capitalize, like - Mobile, Cars
            </small>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={loading ? true : false}
              className={`button mt-3 ${loading ? "disabled" : ""}`}
              onClick={success ? handleClose : ""}
            >
              Create
            </button>
            <button className="button" onClick={handleClose}>
              Close
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CategoryModal;
