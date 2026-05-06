const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// ================= MONGODB CONNECT =================
mongoose.connect("mongodb://sakshipal2303_db_user:highskyinn2303@ac-v0fauul-shard-00-00.iggkpub.mongodb.net:27017,ac-v0fauul-shard-00-01.iggkpub.mongodb.net:27017,ac-v0fauul-shard-00-02.iggkpub.mongodb.net:27017/?ssl=true&replicaSet=atlas-kcieeq-shard-0&authSource=admin&appName=Cluster0");

mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
    console.log("MongoDB Connection Error:", err);
});


// ================= BOOKING SCHEMA =================
const bookingSchema = new mongoose.Schema({
    name: String,
    room: String,
    checkin: String,
    checkout: String
});

const Booking = mongoose.model("Booking", bookingSchema);


// ================= HOME ROUTE =================
app.get("/", (req, res) => {
    res.send("Server Running");
});


// ================= SAVE BOOKING WITH CHECK =================
app.post("/booking", async (req, res) => {

    try {

        const { room, checkin, checkout } = req.body;

        // 🔥 CHECK EXISTING BOOKING (DATE CLASH)
        const existing = await Booking.findOne({
            room: room,
            $or: [
                {
                    checkin: { $lte: checkout },
                    checkout: { $gte: checkin }
                }
            ]
        });

        // ❌ IF ROOM ALREADY BOOKED
        if(existing){
            return res.send("❌ Room already booked for these dates");
        }

        // ✅ SAVE BOOKING
        const newBooking = new Booking(req.body);
        await newBooking.save();

        res.send("✅ Booking Successful");

    } catch (error) {
        console.log(error);
        res.status(500).send("Error saving booking");
    }

});


// ================= GET ALL BOOKINGS =================
app.get("/all-bookings", async (req, res) => {

    try {
        const data = await Booking.find();
        res.json(data);
    } catch (error) {
        res.status(500).send("Error fetching bookings");
    }

});


// ================= DELETE BOOKING =================
app.delete("/delete-booking/:id", async (req, res) => {

    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.send("Booking Deleted");
    } catch (error) {
        res.status(500).send("Error deleting booking");
    }

});


// ================= SERVER START =================
app.listen(5000, () => {
    console.log("Server Started on Port 5000");
});