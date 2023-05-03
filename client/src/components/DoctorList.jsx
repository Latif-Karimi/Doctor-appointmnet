import React from 'react'
import { useNavigate } from 'react-router-dom'

export const DoctorList = ({doctor}) => {
    const navigate = useNavigate()
  return (
    <>
        <div className='card m-2'style={{cursor:'pointer'}} onClick={()=> navigate(`/book-appointment/${doctor._id}`)}>
            <div className='card-header'>
                Dr. {doctor.firstName} {doctor.lastName}
            </div>
            <div className="card-body">
                <p>
                    <b>Specailization</b> {doctor.specailization}
                </p>
                <p>
                    <b>Experience</b> {doctor.experience}
                </p>
                <p>
                    <b>Fess Per Consultation</b> {doctor.fessPerConsultation}
                </p>
                <p>
                    <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
                </p>
            </div>
        </div>
    </>
  )
}
