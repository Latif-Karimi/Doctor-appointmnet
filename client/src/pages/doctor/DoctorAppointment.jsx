import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import axios from "axios";
import moment from "moment";
import { Table, message } from "antd";
import '../../styles/table.css';

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
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Error in getting appointments");
    }
  };
  
  useEffect(() => {
    getAppointments();
  }, []);
  // statuse
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
//delete
const handleDelete = async (_id) => {
  try {
    const response = await axios.delete(`/api/doctor/delete-appointment/${_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      message.success(response.data.message);
      getAppointments();
    }
  } catch (error) {
    console.log(error);
    message.error("Error in deleting appointment");
  }
};

  const columns = [
    {
      title: "Patient confirmation number",
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
                className="btn btn-success ms-2"
                onClick={() => hadnleStatus(record, "Approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-warning ms-2"
                onClick={() => hadnleStatus(record, "rejected")}
              >
                Reject
              </button>
            </div>
          )}
          {(record.status === "Approved" || record.status === "rejected") && (
            <button
              className="btn btn-danger ms-2"
              onClick={() => handleDelete(record._id)}
            >
              Delete
            </button>
          )}
        </div>
      ),
      
    },
  ];
  
  return (
    <Layout>
      <h1 className="text-center p-4">Appointments List</h1>
      <div className="my-table ">
        <Table columns={columns} dataSource={appointments}rowKey="_id" />
      </div>
    </Layout>
  );
};
