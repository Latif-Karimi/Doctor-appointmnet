import React from "react";


export const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div className="navbar-brand ms-2 ">
              <h4>Doctor Appointment <i className="fa-solid fa-user-doctor"></i></h4>
            </div>
            <ul className="navbar-nav ms-5 mb-2 mb-lg-0">
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
