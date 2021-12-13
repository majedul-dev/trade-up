import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./style.css";
import { updateUser } from "../../actions/usersAction";
import { Button } from "../../components";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.getUserById);

  const [username, setUsername] = useState(user.username);
  const [orgname, setOrgname] = useState(user.orgname);
  const [businessType, setBusinessType] = useState(user.businessType);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);

  useEffect(() => {}, [user]);

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({ username, orgname, businessType, email, address, phone })
    );
  };

  return (
    <section className="container editProfile section">
      <div className="row">
        <div className="col-md-3">
          <h4 className="">Edit Profile</h4>
          <div>
            <small>Change Profile Picture</small>
          </div>
          <div className="mt-4">
            <Link
              to={user && `/profile/${user._id}`}
              className="profile__btn d-block text-center"
            >
              View Profile
            </Link>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card">
            <div className="card-header">
              <h3 className="">Edit Profile</h3>
            </div>
            <form onSubmit={handelSubmit}>
              <div className="card-body">
                <div className="editProfile__basicInfo">
                  <h4 className="mb-3">Basic information</h4>
                  <div className="form-group">
                    {user.username ? (
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    ) : (
                      <>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Organization Name"
                          value={orgname}
                          onChange={(e) => setOrgname(e.target.value)}
                        />
                        <input
                          className="form-control mt-3"
                          type="text"
                          placeholder="Business Type"
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                        />
                        <input
                          className="form-control mt-3"
                          type="text"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <input
                          className="form-control mt-3"
                          type="text"
                          placeholder="Phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="editProfile__contactInfo">
                  <h4 className="mb-3">Contact information</h4>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer editProfile__cardFooter">
                <Link to={`/profile/${user._id}`}>
                  <button className="editProfile__saveBtn">Discard</button>
                </Link>
                <Button
                  disabled={loading ? true : false}
                  type="submit"
                  className={`button mt-3 ${loading ? "disabled" : ""}`}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
