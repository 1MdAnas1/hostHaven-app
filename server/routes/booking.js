const router = require("express").Router()

const Booking = require("../models/Booking")

/* CREATE BOOKING */
router.post("/create", async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body
    const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice })
    await newBooking.save()
    res.status(200).json(newBooking)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "Fail to create a new Booking!", error: err.message })
  }
})



/* DELETE BOOKING */
router.delete("/user/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    console.log(bookingId)
    // const book=await Booking.findOne({_id:bookingId})
    await Booking.findByIdAndDelete(bookingId); 
    res.status(200).json({ message: "Booking successfully canceled" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error canceling booking", error: err.message });
  }
});

module.exports = router