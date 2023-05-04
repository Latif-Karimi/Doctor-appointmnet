import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import axios from "axios";
import moment from 'moment'
import { Table } from "antd";

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
        title: 'ID',
        dataIndex: '_id',
    },
    // {
    //     title: 'Name',
    //     dataIndex: 'name',
    //     render: (text,record)=>(
    //         <span>
    //             {record.doctorId.firstName} {record.doctorId.lastName}
    //         </span>
    //     )
    // },
    // {
    //    title:'Phone',
    //    dataIndex: 'phone',
    //    render: (text,record)=>(
    //     <span>
    //         {record.doctorId.phone}
    //     </span>
    //    ),
    // },
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
    <h1>Appointments Lists</h1>
    <Table columns={columns} dataSource={appointments}/>
  </Layout>;
};