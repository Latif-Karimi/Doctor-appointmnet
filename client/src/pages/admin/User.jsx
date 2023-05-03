import React, { useEffect, useState } from 'react'
import {Layout} from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'

export const User = () => {
  const [user,setUser] = useState([])

  //get all users
  const getAllUser = async ()=>{
    try {
      const response = await axios.get('/api/admin/get-all-user',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')} `,
        },
      })
      if(response.data.success){
        setUser(response.data.data)
      }
    } catch (error) {
      console.log(error)
      
    }

  }
  useEffect(()=>{
    getAllUser()
  },[])

  //antD table
  const colums = [
    {
      title:"Name",
      dataIndex:"name",
    },
    {
      title:"Email",
      dataIndex:"email",
    },
    {
      title:"Doctor",
      dataIndex:"isDoctor",
      render:(text,record)=>(
        <span>{record.isDoctor ? "Yes" : "No"}</span>
      )
    },
    {
      title:"Actions",
      dataIndex:"actions",
      render:(text,record)=>(
        <div className='d-flex'>
          <button className='btn btn-danger'>Block</button>
        </div>
      )
    }
  ]
  return (
    <Layout>
        <h1 className='text-center'>Users list</h1>
        <Table columns={colums} dataSource={user}/>
    </Layout>
  )
}
