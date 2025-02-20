const express = require("express");
const router = express.Router();
const {Doctors} = require("../models/doctor.model");
const {Appointments} = require("../models/appointment.model");
const {parseISO, startOfDay, endOfDay, format} = require("date-fns");


// get all doctors 
router.get("/", async(req, res)=>{
    try{
        const doctors = await Doctors.find();
        if (!doctors.length) {
            return res.status(404).send({ message: "No doctors found" });
        }
        else {
            return res.status(200).send(doctors);
        }
    }
    catch(error){
        return res.status(500).send({
            message: error.message
        })
    }
})




//get doctor by id and their available slots
router.get("/:id/slots", async(req, res) => {
    let id = req.params.id;
    let date = req.query.date; // format: "YYYY-MM-DD"
    
    try{
        const doctor = await Doctors.findById(id);
        console.log('doctor', doctor);
        if (!doctor) {
            return res.status(404).send({ message: "Doctor not found" });
        }
        if (!date) {
            return res.status(400).send({ message: "Date is required in query parameter" });
        }
        

        // parsing date
        const parsedDate = parseISO(date);
        const start = startOfDay(parsedDate);
        const end = endOfDay(parsedDate);


        const startTime = doctor.workingHours.start;
        const endTime = doctor.workingHours.end;
        const allSlots = generateAllSlots(startTime, endTime);


        let existingAppointments = await Appointments.find({
          doctorId: id,
          date: {$gte: start, $lte: end}
        });
       
       
        // slots that are already booked 
        let existingSlots = existingAppointments.map((appointment) => {
           return format(new Date(appointment.date), "HH:mm"); // Extracts the HH:mm from ISO string
        });


        // filter out available slots after excluding booked slots (existingSlots)    
        let availableSlots = allSlots.filter((slot) => !existingSlots.includes(slot));
        if (availableSlots.length === 0){
            return res.status(404).send({message: "No slots available, check for other dates" });
        }
        //console.log('availableSlots', availableSlots);

        return res.status(200).send({
            doctor: doctor,
            availableSlots: availableSlots
        });
    }
    catch(error){
        return res.status(500).send({
            message: error.message
        })  
    }
});

const generateAllSlots = (startTime, endTime) => {
    let slots = [];
    let [startHour, startMinute] = startTime.split(":").map(Number);
    let [endHour, endMinute] = endTime.split(":").map(Number);


    while(startHour < endHour || (startHour === endHour && startMinute < endMinute)){
        let timeSlot = `${String(startHour).padStart(2, "0")}:${String(startMinute).padEnd(2, "0")}`;
        slots.push(timeSlot);

        startMinute = startMinute + 30;
        if (startMinute >= 60){
           startHour = startHour + 1;
           startMinute = 0;
        }
    }

    return slots;
}


module.exports = router;