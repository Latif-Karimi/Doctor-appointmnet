import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../components/Layout";
import { Row } from "antd";
import { DoctorList } from "../components/DoctorList";

export const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    try {
      const response = await axios.get(
        "/api/user/get-all-doctors",

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h4
        className="p-3 "
        style={{ backgroundColor: "gray", color: "white", borderRadius: "5px" }}
      >
        {" "}
        You can select a doctor card to schedule an appointment. Simply click on
        the card of your desired doctor, and you'll be redirected to a page
        where you can choose a date and time for your appointment.{" "}
      </h4>
      <Row>
        {doctors &&
          doctors.map((doctor) => (
            <DoctorList doctor={doctor} key={doctor._id} />
          ))}
      </Row>
      
    </Layout>
  );
};
