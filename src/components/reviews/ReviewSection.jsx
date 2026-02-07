import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import * as reviewsApi from "../../lib/api/reviews";
import { toast } from "react-toastify";
import "./ReviewSection.css";

const STAR_OPTIONS = [1, 2, 3, 4, 5];

export const ReviewSection = ({ productId }) => {
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const fetchReviews = useCallback(async () => {
    try {
      const data = await reviewsApi.getReviews(productId);
      setReviews(data);
    } catch (error) {
      console.error("[Reviews] Failed to fetch:", error.message);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.warn("Please write a review");
      return;
    }
    setSubmitting(true);
    try {
      await reviewsApi.addReview({
        productId,
        rating,
        comment: comment.trim(),
      });
      setComment("");
      setRating(5);
      toast.success("Review submitted");
      await fetchReviews();
    } catch (error) {
      console.error("[Reviews] Failed to submit:", error.message);
      toast.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await reviewsApi.deleteReview(reviewId, productId);
      toast.success("Review deleted");
      await fetchReviews();
    } catch (error) {
      console.error("[Reviews] Failed to delete:", error.message);
      toast.error("Failed to delete review");
    }
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  const userHasReview = reviews.some((r) => r.userId === user?.id);

  return (
    <div className="review-section">
      <h2>
        Reviews ({reviews.length}){" "}
        {reviews.length > 0 && (
          <span className="average-rating">
            {"★".repeat(Math.round(Number(averageRating)))}
            {"☆".repeat(5 - Math.round(Number(averageRating)))} {averageRating}
          </span>
        )}
      </h2>

      {isAuthenticated && !userHasReview && (
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="star-rating">
            <label>Your Rating:</label>
            <div className="stars">
              {STAR_OPTIONS.map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-button ${
                    star <= (hoveredStar || rating) ? "active" : ""
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                >
                  {star <= (hoveredStar || rating) ? "★" : "☆"}
                </button>
              ))}
            </div>
          </div>
          <textarea
            className="review-textarea"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            required
          />
          <button
            className="button review-submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      {!isAuthenticated && (
        <p className="login-prompt">Log in to leave a review.</p>
      )}

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="no-reviews">No reviews yet. Be the first to review!</p>
      ) : (
        <ul className="reviews-list">
          {reviews.map((review) => (
            <li key={review.id} className="review-card">
              <div className="review-header">
                <div className="review-author">
                  <strong>
                    {review.author.firstName} {review.author.lastName}
                  </strong>
                  <span className="review-stars">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </div>
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="review-comment">{review.comment}</p>
              {review.userId === user?.id && (
                <button
                  className="review-delete"
                  onClick={() => handleDelete(review.id)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
