const express = require("express");
const router = express.Router();
const {Appointments} = require("../models/appointment.model");


router.get("/", async(req, res) => {
    const appointments = await Appointments.find();

    try {
        if (!appointments){
            return res.status(404).send({ message: "Appointments not found" });
        }
        else {
            return res.status(200).send(appointments);
        }   
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})






router.get("/:id", async(req, res) => {
    const id = req.params.id;
    const appointment = await Appointments.findById(id);

    try {
        if (!appointment){
            return res.status(404).send({ message: "Appointment not found" });
        }
        else {
            return res.status(200).send(appointment);
        }   
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})




router.post("/", async(req, res) => {
    const newAppointment = req.body;
    try {
        const appointment = await Appointments.create(newAppointment);
        if (!appointment){
            return res.status(404).send({ message: "error creating appointment" });
        }
        else{
            return res.status(201).send(appointment);
        }
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})






router.put("/:id", async(req, res) => {
    const id = req.params.id;
    const updatedAppointment = req.body;
    try {
        const appointment = await Appointments.findByIdAndUpdate(id, updatedAppointment, {
            new: true
        });
        if (appointment === false){
            return res.status(404).send({ message: "error updating appointment" });
        }
        else{
            return res.status(201).send(appointment);
        }
    }
    catch(error){
        return res.status(500).send({
            message: error.message
        })
    }
});





router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    try {
        const appointment = await Appointments.findByIdAndDelete(id);
        if (!appointment){
            return res.status(404).send({ message: "error deleting appointment" });
        }
        else{
            return res.status(200).send(appointment);
        }
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})


module.exports = router;