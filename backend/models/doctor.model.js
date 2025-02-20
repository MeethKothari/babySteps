const mongoose = require("mongoose");


const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    workingHours: {
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true
        }
    },
    specialization: {
        type: String,
        required: true
    }
})


const Doctors = mongoose.model("doctors", doctorSchema);
module.exports = {Doctors};