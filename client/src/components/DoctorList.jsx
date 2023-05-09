import React from "react";
import { useNavigate } from "react-router-dom";

export const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <div className="card-header "style={{backgroundColor:"gray",color:'white',fontWeight: "900"}}>
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specailization</b> {doctor.specailization}
          </p>
          <p>
            <b>Experience</b> {doctor.experience} years
          </p>
          <p>
            <b>Fess Per Consultation</b> ${doctor.fessPerConsultation}
          </p>
          <p>
            <b>Timings</b> {doctor.timings} 
          </p>
        </div>
      </div>
    </>
  );
};
