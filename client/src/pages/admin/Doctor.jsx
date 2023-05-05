import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

export const Doctor = () => {
  const [doctors, setDoctors] = useState([]);

  //get docters
  const getDoctors = async () => {
    try {
      const response = await axios.get("/api/admin/get-all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        const updatedDoctors = response.data.data.map((doctor) => ({
          ...doctor,
          key: doctor._id,
        }));
        setDoctors(updatedDoctors);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  //handle account status
  const handleAccountStatus = async (record, status) => {
    try {
      const response = await axios.post(
        "/api/admin/change-account-status",
        {
          doctorId: record._id,
          userId: record.userId,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
        // Update status in doctors array
        setDoctors((prevDoctors) =>
          prevDoctors.map((doctor) =>
            doctor._id === record._id ? { ...doctor, status,key:doctor._id } : doctor
          )
        );
      }
    } catch (error) {
      message.error("Error in handler Account Status");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  //antD table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => handleAccountStatus(record, "rejected")}
            >
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center p-3">Doctors List</h1>
      <div className="my-table">
      <Table columns={columns} dataSource={doctors} rowKey="key" />

      </div>
    </Layout>
  );
};
