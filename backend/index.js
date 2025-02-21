require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const doctorRoutes = require("./routes/doctor.routes");
const appointmentRoutes = require("./routes/appointment.routes");


// port and express initialization
const port = process.env.PORT || 8080;
const app = express();



// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("connected to mongoDB !!"))
.catch((err) => console.log(err));



// CORS Middleware
const corsOptions = {
    origin: [ // Frontend URL
        "http://localhost:5173",  // local development url
        "https://baby-steps-woad.vercel.app/", // vercel provided url
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};


// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);





app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})