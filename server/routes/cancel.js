const router = require("express").Router();
const Booking = require("../models/Booking");

/* DELETE BOOKING */
router.post("/cancel/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (deletedBooking) {
      res.status(200).json({ message: "Booking successfully canceled", deletedBooking });
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error canceling booking", error: err.message });
  }
});

module.exports = router;

