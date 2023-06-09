import React from "react";
import { Header } from "../components/Header";
import "../styles/Register.css";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Footer } from "../components/Footer";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      dispatch(hideLoading());
      
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <>
      <Header />
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form card p-4"
        >
          <h3 className="text-center">Login Form</h3>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <Link to="/register" className="mt-2 text-center">
            New User Register Here!
          </Link>
        </Form>
      </div>
      <Footer />
    </>
  );
};
