import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import moment from "moment";

export const Booking = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailible, setIsAvailible] = useState();
  // login user data
  const getUserData = async () => {
    try {
      const response = await axios.post(
        "/api/doctor/get-doctor-byId",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
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
  //booking
  const handelBooking = async () => {
    try {
      setIsAvailible(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading);
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading);
      console.log(error);
    }
  };
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/booking-availability",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setIsAvailible(true);
        console.log(isAvailible);
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1 className="m-3">Booking</h1>
      <div className="container m-2">
        {doctors && (
          <div>
            <h3>
              Dr. {doctors.firstName} {doctors.lastName}
            </h3>
            <h5>Fees : {doctors.fessPerConsultation}</h5>
            <h5>
              Timings : {doctors.timings}
            </h5>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                 
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                className="m-2"
                format="HH:mm"
                onChange={(value) => {
                  
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>
             
                <button
                  className="btn btn-success mt-2"
                  onClick={handelBooking}
                >
                  Book Now
                </button>
            
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
