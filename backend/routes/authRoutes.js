const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  forgotPassword,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.get("/me", protect, getCurrentUser);
router.put("/profile", protect, updateProfile);

module.exports = router;
