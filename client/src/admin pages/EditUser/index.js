import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { useSelector, useDispatch } from "react-redux";
import { updateUserByAdmin, getAdminUserById } from "../../actions/usersAction";

const EditUser = ({ match }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.adminUserById);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  useEffect(() => {
    dispatch(getAdminUserById(match.params.userId));
  }, [dispatch, match]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUserByAdmin({ username, email, role }, match.params.userId));
  };

  return (
    <div className="admin">
      <AdminSidebar />
      <div className="p-5 admin__content">
        <h2>Update User Info</h2>

        <form className="my-5" onSubmit={submitHandler}>
          <div class="form-group">
            <label for="exampleInputPassword1">Username</label>
            <input
              type="text"
              class="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label>Email address</label>
            <input
              type="email"
              class="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label class="my-1 mr-2" for="inlineFormCustomSelectPref">
            Role
          </label>
          <select
            class="custom-select my-1 mr-sm-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value={role} selected>
              {role}
            </option>
            <option value={role === "user" ? "admin" : "user"}>
              {role === "user" ? "admin" : "user"}
            </option>
          </select>
          <button type="submit" class="button mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
