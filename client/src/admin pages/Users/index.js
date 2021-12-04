import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAdminUserById, getAllUsers } from "../../actions/usersAction";
import Loader from "../../components/Loader";

const Users = () => {
  const dispatch = useDispatch();

  const { loading, users } = useSelector((state) => state.getAllUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="admin">
      <AdminSidebar />
      <div className="p-5 admin__content">
        <h2>Users</h2>
        <h4 className="mt-3">Total Users {users && users.length}</h4>

        {loading ? (
          <Loader />
        ) : (
          <table className="table mt-5">
            <thead className="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <th scope="row">{user._id}</th>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link to={`/users/edit/${user._id}`}>
                        <button
                          className="button-sm"
                          onClick={() => dispatch(getAdminUserById(user._id))}
                        >
                          Edit
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
