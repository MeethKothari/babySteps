import { useEffect, useState } from "react";
import styles from "./bookings.module.css";
import apiUrl from "../../ipconfig";
import Swal from "sweetalert2";
import { format } from "date-fns";


const Bookings = () => {
  const [allAppointments, setAllAppointments] = useState([]);


  useEffect(() => {
    const fetchAllAppointments = async () => {
      try{
      let response = await fetch(`${apiUrl}/appointments`);
      let data = await response.json();
      if (response.status === 200){
        setAllAppointments(data);
      }
      else{
        console.log("error fetching appointments");    
      }
    } 
    catch (error){
      console.log("error fetching appointments", error);
    }
  }

  fetchAllAppointments();
  },[allAppointments])



// Edit function 
const handleEdit = () => {
  console.log("Edit button clicked");
}



// Delete function
const handleDelete = async(doctorId) => {
  //console.log(doctorId)
  try {
    let response = await fetch(`${apiUrl}/appointments/${doctorId}`, {
      method: "DELETE",
    })
    if (response.status === 200){
      Swal.fire({
        icon: "success",
        title: "Appointment deleted successfully",
      })
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Error deleting appointment",
      })
    }
  } catch (error) {
    console.log("Error deleting appointment", error);
    Swal.fire({
      icon: "error",
      title: "Error deleting appointment",
    })
  }
}
  

function formatDate(date) {
  return format(new Date(date), "MM/dd/yyyy");
}

  return (
    <div className={styles.container}>
      <h1>Bookings</h1>
      

      {allAppointments.length > 0 ? allAppointments.map((app, index) => (
        <>
        <div className={styles.doctorCard} key={index}>
          <img
            className={styles.doctorImage}
            src="https://thumbs.dreamstime.com/b/chibi-cartoon-doctor-examining-patient-highlights-cute-playful-healthcare-scene-exaggerated-adorable-features-336339826.jpg"
            alt="Doctor"
          />
          <section>
            <p className={styles.patinetName}>
              <strong>Patinet Name:</strong> {app.patientName}
            </p>
            
            <p className={styles.doctorSpecialization}>
              <strong>Appointment Type:</strong> {app.appointmentType}
            </p>

            <p className={styles.dateAndTime}>
              <strong>Date and Time:</strong> {formatDate(app.date)}
            </p>
          </section>

          
          <section className={styles.buttons}>
            <button 
              onClick={handleEdit}
              className={styles.editButton}>Edit</button>
            <button 
              onClick={() => {handleDelete(app._id)}}
              className={styles.deleteButton}>Delete</button>
          </section>
      </div>
        </>
        )) 
        : 
        <h1>Fetching your appointments.....</h1>}
  
    </div>
  )
}

export default Bookings