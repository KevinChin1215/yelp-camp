const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const Review = require("../models/review");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const Campground = require("../models/campground");
const reviews = require("../controllers/reviews");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete("/:reviewID", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
