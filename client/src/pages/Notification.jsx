import React from "react";
import { Layout } from "../components/Layout";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Notification = () => {

  const navigate =useNavigate()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  //handle Read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(hideLoading())
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Error in MarkAllRead handler ");
    }
  };
//delete notification
  const handleDeletAllRead = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/user/delete-all-notification',{userId:user._id},{
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading());
      if(response.data.success){
        message.success(response.data.message)
      }else{
        message.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      message.error('Somthing wnet wrong in Notification')
      
    }
  };
  return (
    <Layout>
      <h3 className="p-3 text-center">Notification Page</h3>
      <Tabs>
        <div tab="Unread" key={0}>
          <div className="d-flex justify-content-end" >
            <h5 className="p-d text-danger"style={{cursor:'pointer'}} onClick={handleMarkAllRead}>
              Mark All Read
            </h5>
          </div>
          {user?.notification.map((notificationMsg) => (
            <div className="card" style={{cursor:'pointer'}}>
              <div className="card-text"onClick={()=> navigate(notificationMsg.noClickPath)}>{notificationMsg.message}</div>
            </div>
          ))}
        </div>
        <div tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h5 className="p-d text-danger"style={{cursor:'pointer'}} onClick={handleDeletAllRead}>
              Delet All Read
            </h5>
          </div>
          {user?.seennotification.map((notificationMsg) => (
            <div className="card" onClick={notificationMsg.onClickPath}style={{cursor:'pointer'}}>
              <div
                className="card-text"
                
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </div>
      </Tabs>
    </Layout>
  );
};
