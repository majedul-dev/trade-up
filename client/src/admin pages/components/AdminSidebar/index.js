import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { FaUserAlt, FaProductHunt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import logo from "../../../images/logo2.png";

const AdminSidebar = () => {
  return (
    <aside className="admin__sidebar">
      <ul>
        <li>
          <Link to="/">
            <img
              src={logo}
              alt=""
              height="70"
              width="70"
              style={{ borderRadius: 0 }}
            />
          </Link>
        </li>
        <li className="mt-5">
          <FaProductHunt />
          <Link to="/admin">Products</Link>
        </li>
        <li>
          <FaUserAlt />
          <Link to="/users">Users</Link>
        </li>
        <li>
          <BiCategory />
          <Link to="/category">Category</Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
