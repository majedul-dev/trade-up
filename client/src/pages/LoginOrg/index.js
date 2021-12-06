import React from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "../../components";

const LoginOrg = () => {
  return (
    <section className="container section authform">
      <h2>Login to Your Account</h2>
      <form className="pt-4 formStyle">
        <div class="form-group">
          <label>Email</label>
          <Input placeholder="Enter Email" type="email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <Input placeholder="Enter Password" type="password" />
          <Link to="/password/forgot" className="forgot-password">
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" className="button">
          Login
        </Button>
      </form>

      <Link to="/login">
        <Button className="button">Login As Regular User</Button>
      </Link>

      <p className="mt-3">
        Don't have an account? <Link to="/register">Signup</Link>
      </p>
    </section>
  );
};

export default LoginOrg;
