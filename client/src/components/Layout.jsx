import React from "react";
import "../styles/Layout.css";
import { adminMenu, userMenu } from "../data/Data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  //Logout
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully!");
    navigate("/login");
  };
  // Docter Menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house fa-beat",
    },
    {
      name: "Appointment",
      path: "/appointment",
      icon: "fa-solid fa-list fa-beat",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-sharp fa-solid fa-user-tie fa-beat",
    },
  ];
  //Menu list
  const sidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>Doctor Appointment</h6>
            </div>
            <hr />
            <div className="menu">
              {sidebarMenu.map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={index}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}

              <div className={"menu-item"} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket fa-beat"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user?.notification.length}
                  onClick={() => navigate("/notification")}
                >
                  <i className="fa-solid fa-bell fa-beat"></i>
                </Badge>

                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
