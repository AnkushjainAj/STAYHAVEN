
import express from "express";
import { createReview, getReviewsByHotel,updateReview,deleteReview } from "../controller/Review.js";

const router = express.Router();

router.post("/", createReview); // create reviews
router.get("/:hotelId", getReviewsByHotel); // get revirew

router.put("/:reviewId", updateReview); // Edit review
router.delete("/:reviewId", deleteReview); // Delete review


export default router;
