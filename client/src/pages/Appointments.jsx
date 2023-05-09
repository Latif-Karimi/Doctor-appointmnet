import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import axios from "axios";
import moment from 'moment'
import { Table } from "antd";
import '../styles/table.css';

export const Appointments = () => {
  const [appointments, setAppointments] = useState();

  //get appointments
  const getAppointments = async () => {
    try {
      const response = await axios.get("/api/user/user-appointments", {
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
  const columns = [
    {
        title: 'Your appointment confirmation number',
        dataIndex: '_id',
    },
    {
        title:'Date & Time',
        dataIndex: 'date',
        render: (text,record)=>(
         <span>
             {moment(record.date).format('DD-MM-YYYY')} &nbsp;
             {moment(record.data).format('HH:mm')}
         </span>
        ),
     },
     {
        title:'Status',
        dataIndex:'status'
     },
  ];
  return <Layout>
    <h1 className="text-center p-2">Appointments List</h1>
    <p className="text-center ">Note: Only the doctor is authorized to clear the appointments list's history.</p>

    <div className="my-table p-4">
      <Table columns={columns} dataSource={appointments}rowKey="_id"/>
    </div>
    
  </Layout>;
};
