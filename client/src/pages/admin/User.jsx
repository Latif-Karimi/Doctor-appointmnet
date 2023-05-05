import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import axios from 'axios';
import { Table,message } from 'antd';
import '../../styles/table.css';
import { useNavigate } from 'react-router-dom';

export const User = () => {
  const [user,setUser] = useState([]);
  const navigate = useNavigate()

  //get all users
  const getAllUser = async ()=>{
    try {
      const response = await axios.get('/api/admin/get-all-user',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')} `,
        },
      });
      if(response.data.success){
        setUser(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`/api/admin/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')} `,
        },
      });
      if (response.data.success) {
        message.success('user deleted successfully');
        navigate('/admin/users')
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getAllUser();
  },[]);

  //antD table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Doctor',
      dataIndex: 'isDoctor',
      render:(text,record)=>(
        <span>{record.isDoctor ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render:(text,record)=>(
        <div className='d-flex'>
          <button className='btn btn-danger' onClick={() => deleteUser(record._id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
        <h1 className='text-center'>Users list</h1>
        <div className='my-table p-4'>
          <Table columns={columns} dataSource={user}rowKey="_id"/>
        </div>
    </Layout>
  );
};

