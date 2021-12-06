import React, { useState } from "react";
import { Button } from "../../components";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

const RegisterOrg = ({ history }) => {
  const [avatarPreview, setAvatarPreview] = useState("/images/no-image.jpg");

  return (
    <section className="section container authform">
      <div className="div"></div>
      <h2>Create an Account</h2>
      <form className="pt-4 formStyle">
        <div class="form-group">
          <label>Organization Name</label>
          <input
            className="form-control"
            placeholder="Enter Your Organization Name"
            type="text"
          />
        </div>
        <div class="form-group">
          <label>Business Type</label>
          <input
            className="form-control"
            placeholder="Enter Your Business Type"
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            placeholder="Enter Email"
            type="email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            placeholder="Enter Password"
            type="password"
          />
        </div>
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Avatar</Form.Label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={avatarPreview}
              alt="avatar-preview"
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "999px",
                marginRight: "1rem",
              }}
            />
            <Form.Control
              type="file"
              size="lg"
              name="avatar"
              accept="images/*"
            />
          </div>
        </Form.Group>
        <Button type="submit" className="button">
          Register
        </Button>
      </form>

      <Link to="register">
        <Button className="button">Signup As Regular User</Button>
      </Link>

      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
};

export default RegisterOrg;
