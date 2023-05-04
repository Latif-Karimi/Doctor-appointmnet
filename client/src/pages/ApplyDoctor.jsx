import React from "react";
import { Layout } from "../components/Layout";
import { Form, Col, Row, Input,TimePicker,message } from "antd";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

export const ApplyDoctor = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  //hundle Form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-doctor",
        { ...values, userId: user._id, timings: [
          moment(values.timings[0]).format("HH:mm"),
          moment(values.timings[1]).format("HH:mm"),
        ], },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  return (
    <Layout>
      <h1 className="text-center">Apply Docter</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h3 className="">Personel Details</h3>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your First name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your Last Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone Number"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your Phone Number" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="E-mail"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your email address" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="Your Website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your Address" />
            </Form.Item>
          </Col>
        </Row>
        <h3 className="">Professional Details</h3>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specailization"
              name="specailization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your Specailization" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your Experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fess Per Consultation"
              name="fessPerConsultation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your Fess Per Consultation" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Timings"
              name="timings" 
              required
            >
              <TimePicker.RangePicker format="HH:mm"/>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
          <button className="btn btn-primary form-btn" type="submit">Submite</button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};
