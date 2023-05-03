import React, { useEffect,useState } from "react";
import axios from "axios";
import { Layout } from "../components/Layout";
import { Row } from "antd";
import { DoctorList } from "../components/DoctorList";


export const HomePage = () => {
const [doctors,setDoctors] = useState([])
  // login user data
  const getUserData = async () => {
    try {
      const response = await axios.get(
        "/api/user/get-all-doctors",
        
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if(response.data.success){
        setDoctors(response.data.data)
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
      <h1 className="text-center">Home Page</h1>
      <Row>
        {doctors && doctors.map(doctor=>(
          <DoctorList doctor = {doctor}/>
        ))}
      </Row>
    </Layout>
  );
};


