import React from "react";
import { Layout } from "../components/Layout";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Notification = () => {
  const navigate = useNavigate();
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

      dispatch(hideLoading());
      if (response.data.success) {
        dispatch({ type: "user/setUser", payload: response.data.user });
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
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch({ type: "user/setUser", payload: response.data.user });
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Somthing wnet wrong in Notification");
    }
  };
  return (
    <Layout>
      <h3 className="p-3 text-center">Notification Page</h3>
      <Tabs className="m-3" defaultActiveKey="0" key="notification-tabs">
        <div tab="Unread" key="unread">
          <div className="d-flex justify-content-end m-4">
            <h5
              className="p-d text-danger"
              style={{ cursor: "pointer" }}
              onClick={handleMarkAllRead}
            >
              Mark All Read
            </h5>
          </div>
          {user?.notification.map((notificationMsg) => (
            <div key={notificationMsg._id}>
              <div className="card m-3 p-3">
                <div
                  className="card-text"
                  onClick={() => navigate(notificationMsg.noClickPath)}
                >
                  {notificationMsg.message}
                </div>
              </div>
            </div>
          ))}
        </div>
        <dive tab="Read" key="read">
          <div className="d-flex justify-content-end m-4">
            <h5
              className="text-danger"
              style={{ cursor: "pointer" }}
              onClick={handleDeletAllRead}
            >
              Delet All Read
            </h5>
          </div>
          {user?.seennotification.map((notificationMsg) => (
            <div key={notificationMsg._id}>
              <div
                className="card m-3 p-3 "
                onClick={notificationMsg.onClickPath}
                style={{ cursor: "pointer" }}
              >
                <div className="card-text">{notificationMsg.message}</div>
              </div>
            </div>
          ))}
        </dive>
      </Tabs>
    </Layout>
  );
};
