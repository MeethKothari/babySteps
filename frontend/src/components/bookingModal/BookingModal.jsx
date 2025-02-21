import Swal from "sweetalert2";
import apiUrl from "../../ipconfig"
import { useState } from "react";
import styles from "./bookingModal.module.css";
import {formatISO} from "date-fns";

const BookingModal = ({details, toggleModal, toggleSlotModal}) => {
  //console.log(details);
  const {doctor, date, slot} = details;

  const [formValue, setFormValue] = useState({
    doctorId: doctor._id,
    date: formatISO(new Date(`${date} ${slot}`)), // it will convert to ISO format
    duration: 30,
    appointmentType: "",
    patientName: "",
    notes: ""
  })
 
  console.log(formValue);

  const handleChanges = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handleBooking = async(e) => {
    e.preventDefault();
    //console.log(formValue);
    try{

      let response = await fetch(`${apiUrl}/appointments`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formValue)
      })
  
      if (response.status === 201){
        Swal.fire({
          icon: "success",
          title: "Booking Successful",
          text: "Your appointment has been booked successfully, check bookings section for more details"
        })
        toggleModal(null);
        toggleSlotModal(false);
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: "An error occured while booking your appointment, try again later"
        })
      }

    }
    catch(error){
      console.log(error);
    }
  }
  
  
  const handleClose = () => {
  toggleModal(null);
  }
 


  return (
    <>
      <form onSubmit={handleBooking} className={styles.bookingForm}>
      <h3> Additional details for booking with <span style={{color: "green", fontSize: "25px"}}>Dr.{doctor.name}</span>
      <br/> 
       for slot <span style={{color: "green", fontSize: "25px"}}>{date} - {slot}</span>👇</h3>
        <input 
          type="text" 
          placeholder="Patient Name *" 
          required={true}
          className={styles.input}
          name="patientName"
          value = {formValue.patientName}
          onChange={handleChanges}
        />
        <input 
          type="text" 
          placeholder="Appointment Type *" 
          required={true}
          className={styles.input}
          name="appointmentType"
          value = {formValue.appointmentType}
          onChange={handleChanges}
        />
        <input 
          type="text" 
          placeholder="Notes (optional)" 
          className={styles.input}
          name="notes"
          value = {formValue.notes}
          onChange={handleChanges}
        />
        <button 
          type="submit"
          className={styles.formButton}>
          Confirm Booking
        </button>
      <button onClick={handleClose} className={styles.closeButton}>Close Booking Tab</button>
      </form>
    </>
  )
}

export default BookingModal


// handl booking
// useEffect(() => {
//   // post request to create a new appointment
//   const booking = async () => {
//     const response = await fetch(`${apiUrl}/appointments`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(details)
//     })
//   }
// }, [])