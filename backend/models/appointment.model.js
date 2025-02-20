const mongoose = require("mongoose");


const appointmentSchema = new mongoose.Schema({
    doctorId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true,
    },
    appointmentType: {
        type: String,
        required: true,
        // enum: ["Routine Check-Up", "Ultrasound"]
    },
    patientName: {
        type: String,
        required: true  
    },
    notes: {
        type: String
    }
})



const Appointments = mongoose.model("appointments", appointmentSchema);
module.exports = {Appointments};