import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  hotelId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true, // use this to match logged-in user
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Review", reviewSchema);
