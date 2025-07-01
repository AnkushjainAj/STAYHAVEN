import Review from "../models/Review.js";

// Add a new review
export const createReview = async (req, res) => {
  try {
    const { hotelId, username, userEmail, comment, rating } = req.body;

    const review = new Review({ hotelId, username, userEmail, comment, rating });
    await review.save();

    res.status(201).json({ message: "Review added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding review", error: err.message });
  }
};

// Get all reviews for a hotel + average rating
export const getReviewsByHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;

    const reviews = await Review.find({ hotelId }).sort({ date: -1 });
    const averageRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

    res.json({ reviews, averageRating: averageRating.toFixed(1) });
  } catch (err) {
    console.error("Update Review Error:", err);
    res.status(500).json({ message: "Error fetching reviews", error: err.message });
  }
};

// Update review (only if userEmail matches)
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { username, comment, rating, userEmail } = req.body;

    // console.log(rating);

    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.userEmail !== userEmail)
      return res.status(403).json({ message: "Unauthorized" });

    console.log("✅ Authorized. Updating review...");

  
    review.comment = comment;
    review.rating = rating;

    await review.save();  // ✅ THIS IS THE CORRECT SAVE

    console.log("✅ Saved successfully");

    res.json({ message: "Review updated" });
  } catch (err) {
    console.error("❌ Error in updateReview:", err);
    res.status(500).json({ message: "Error updating review", error: err.message });
  }
};


// Delete review (only if userEmail matches)
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { userEmail } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.userEmail !== userEmail)
      return res.status(403).json({ message: "Unauthorized" });

    await Review.findByIdAndDelete(reviewId);

    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting review", error: err.message });
  }
};
