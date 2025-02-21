import { useEffect, useState } from "react";
import styles from "./doctorCard.module.css";
import apiUrl from "../../ipconfig";
import BookingModal from "../bookingModal/BookingModal";

const DoctorCard = ({ doctor }) => {
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDoctorSlots, setAvailableDoctorSlots] = useState([]);
  const [patientModal, setPatientModal] = useState(null);




  // toggle the booking modal
  const handleOpenBooking = () => {
    setOpenBooking(!openBooking);
  };




  // fetch available slots for the selected date
  const fetchAppointment = async (doctorId, date) => {
    //console.log(date)
    try{
      const response = await fetch(`${apiUrl}/doctors/${doctorId}/slots?date=${date}`);
      const data = await response.json();
      // console.log('API response:', data);
      if (response.ok) {
        setAvailableDoctorSlots(data);
      } else {
        console.error("Error fetching slots:", data.message);
        setAvailableDoctorSlots([]);
      }
    }
    catch (error){
      console.log("Error fetching appointments", error)
    }
  }
  useEffect(() => {
  },[availableDoctorSlots]);
  //console.log('availableDoctorSlots', availableDoctorSlots);
  
  




  // post request for slot booking 
  const handleBooking = (date, slot, doctor) => {
    // date and slot are in string format
    //console.log("SelectedSlot :", `${date} ${slot}`, "doctor-details :", doctor);
    setPatientModal({date, slot, doctor});
  }





  // next 7 days from today 
  const getNext7Days = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date.toISOString().split("T")[0]); // Correctly formatted as "YYYY-MM-DD"
    }

    return days;
  };

  const weekDays = getNext7Days();




  return (
    <div style={{marginBottom: "20px"}}>

      {/* doctor card  */}
      <div className={styles.doctorCard}>
      <div className={styles.docCardAndBookingModal}>
        <section>
        <img
          className={styles.doctorImage}
          src="https://static.vecteezy.com/system/resources/previews/024/585/326/non_2x/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-png.png"
          alt="Doctor"
        />
        <h2 className={styles.doctorName}>{doctor.name}</h2>
        <p className={styles.doctorSpecialization}>
          <strong>Specialization:</strong> {doctor.specialization}
        </p>
        <p className={styles.doctorHours}>
          <strong>Working Hours:</strong> {doctor.workingHours.start} - {doctor.workingHours.end}
        </p>
        <button 
            className={`${styles.doctorButtonOpen} ${openBooking === false ? styles.doctorButtonOpen : styles.doctorButtonClose}`} 
            onClick={() => {handleOpenBooking(doctor)}}
        >
          {openBooking ? "Close Booking Section?" : "Opne Booking Section?"}
        </button>
        </section>

        <section>
        {patientModal && <BookingModal details={patientModal} toggleModal={setPatientModal} toggleSlotModal={handleOpenBooking}/>}
        </section>

      </div>
      
      </div>



      {/* booking modal */}
      <div className={styles.modal}>
      {openBooking && (
      <div className={styles.bookingModal}>
          <h2>Select a date..</h2>
          <div className={styles.dateSelection}>
            {weekDays.map((date) => (
              <button 
              key={date} 
              className={styles.dateButton}
              onClick={() => {
                setSelectedDate(date);
                fetchAppointment(doctor._id, date);
              }}
              >
              {date}
              </button>
            ))}
          </div>


          
          {/* slot selection */}
          {selectedDate && (
            <>
              <h2> Slots available for {selectedDate} </h2>
              <div className={styles.slotSelection}>
            
              {availableDoctorSlots.length === 0 ? <p>No slots available</p> : 
              (availableDoctorSlots.availableSlots.map((slot) => (
                  <button 
                    key={slot}
                    className={styles.slotButton}
                    onClick={() => {
                      setSelectedSlot(slot);
                      handleBooking(selectedDate, slot, doctor);
                    }}
                    >
                    {slot}
                    </button>
                  ))) 
              }
            </div>
            </>
          )}

      </div>
      )}
      </div>
    </div>
  );
};

export default DoctorCard;



// import { useEffect, useState } from "react";
// import styles from "./doctorCard.module.css";
// import apiUrl from "../../ipconfig";
// import BookingModal from "../bookingModal/BookingModal";

// const DoctorCard = ({ doctor }) => {
//   const [openBooking, setOpenBooking] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [availableDoctorSlots, setAvailableDoctorSlots] = useState([]);

//   // toggle the booking modal
//   const handleOpenBooking = () => {
//     setOpenBooking(!openBooking);
//   };


//   // handle slot booking 
//   const handleBooking = (day, slot, doctor) => {
//     console.log("SelectedSlot :", `${day} ${slot}`, "doctor-details :", doctor);
//     setSelectedSlot(`${day} ${slot}`);
//   }

//   useEffect(() => {
//     // fetch any existing appointments for the selected slot
//     const fetchAppointment = async () => {
//       const response = await fetch(`${apiUrl}/appointments/${doctor._id}/slots?date=${day}}`);
//       const data = await response.json();
//       if (data.length) {
//         console.log("Existing Appointments: ", data);
//         setAvailableDoctorSlots(data);
//       }
//       else {
//         setAvailableDoctorSlots([]);
//       }
//     }
    
//     fetchAppointment();
//   }, [availableDoctorSlots]);




//   // Generate time slots between start and end time for an half an hour interval
//   const generateTimeSlots = (start, end) => {
//     const slots = [];
//     let [startHour, startMinute] = start.split(":").map(Number);
//     let [endHour, endMinute] = end.split(":").map(Number);

//     while (startHour < endHour || (startHour === endHour && startMinute < endMinute)) {
//       let timeSlot = `${String(startHour).padStart(2, "0")}:${String(startMinute).padEnd(2, "0")}`;
//       slots.push(timeSlot);

//       startMinute += 30;
//       if (startMinute >= 60) {
//         startHour += 1;
//         startMinute = 0;
//       }
//     }

//     return slots;
//   };



//   // next 7 days from today 
//   const getNext7Days = () => {
//     const days = [];
//     const today = new Date();

//     for (let i = 0; i < 7; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
//       days.push(date.toLocaleDateString()); // Format: "YYYY-MM-DD"
//     }

//     return days;
//   };

//   const availableSlots = generateTimeSlots(doctor.workingHours.start, doctor.workingHours.end);
//   const weekDays = getNext7Days();



//   return (
//     <div>
//       <div className={styles.doctorCard}>
//         <img
//           className={styles.doctorImage}
//           src="https://static.vecteezy.com/system/resources/previews/024/585/326/non_2x/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-png.png"
//           alt="Doctor"
//         />
//         <h2 className={styles.doctorName}>{doctor.name}</h2>
//         <p className={styles.doctorSpecialization}>
//           <strong>Specialization:</strong> {doctor.specialization}
//         </p>
//         <p className={styles.doctorHours}>
//           <strong>Working Hours:</strong> {doctor.workingHours.start} - {doctor.workingHours.end}
//         </p>
//         <button className={styles.doctorButton} onClick={handleOpenBooking}>
//           {openBooking ? "Close Booking" : "Book an Appointment"}
//         </button>
//       </div>

//       {openBooking && (
//         <div className={styles.bookingModal}>
//           <h3>Select a Slot</h3>
//           <div className={styles.bookingGrid}>
//             {weekDays.map((day) => (
//               <div key={day} className={styles.bookingDay}>
//                 <h4>{day}</h4>
//                 {availableSlots.map((slot) => (
//                   <button
//                     key={slot}
//                     className={`${styles.timeSlot} ${selectedSlot === `${day} ${slot}` ? styles.selected : ""}`}
//                     onClick={() => (handleBooking(day, slot, doctor))}
//                   >
//                     {slot}
//                   </button>
//                 ))}
//               </div>
//             ))}
//           </div>
//         {selectedSlot && <p className={styles.confirmation}><strong>Selected Slot: </strong>{selectedSlot}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorCard;