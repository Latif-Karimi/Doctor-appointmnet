import React from "react";
import '../styles/Register.css'
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {showLoading,hideLoading} from '../redux/features/alertSlice'

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading()) 
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading())
      if (response.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
    <div className='form-container'>
      <Form layout='vertical' onFinish={onfinishHandler} className='register-form card p-4'>
        <h3 className='text-center'>Register Form</h3>
        <Form.Item label="Name" name="name">
          <Input type='text' required/>
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type='email' required/>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type='password' required/>
        </Form.Item>
        <button className='btn btn-primary' type='submit'>Register</button>
        <Link to='/login'className='mt-2 text-center'>Already User click to login</Link>
      </Form>
    </div>
    </>
  );
};

export default Register;
