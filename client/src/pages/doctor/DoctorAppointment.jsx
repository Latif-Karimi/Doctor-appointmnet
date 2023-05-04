import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import axios from "axios";
import moment from "moment";
import { Table, message } from "antd";

export const DoctorAppointment = () => {
  const [appointments, setAppointments] = useState();

  //get appointments
  const getAppointments = async () => {
    try {
      const response = await axios.get("/api/doctor/doctor-aapointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);
  const hadnleStatus = async (record, status) => {
    try {
      const response = await axios.post(
        "/api/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Error in handle statuse");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
  {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.data).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button  
                className="btn btn-success ms-2 "
                onClick={() => hadnleStatus(record, "approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => hadnleStatus(record, "rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1>Appointments Lists</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};
