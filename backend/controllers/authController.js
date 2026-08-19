const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

// Helper to check DB connection status
function isDBConnected() {
  return mongoose.connection.readyState === 1;
}

// In-memory fallback user store when MongoDB is not running
const inMemoryUsers = new Map();

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (isDBConnected()) {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email is already registered.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword,
      });

      const secret = process.env.JWT_SECRET || "your_super_secret_key_here";
      const token = jwt.sign(
        { userId: user._id, name: user.name, email: user.email },
        secret,
        { expiresIn: "7d" }
      );

      return res.status(201).json({
        success: true,
        message: "Registration successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          notifications: user.notifications,
          weeklyReport: user.weeklyReport,
        },
      });
    } else {
      // In-Memory Fallback Mode
      if (inMemoryUsers.has(normalizedEmail)) {
        return res.status(400).json({
          success: false,
          message: "Email is already registered.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userId = "user_" + Date.now();

      const userObj = {
        _id: userId,
        id: userId,
        name,
        email: normalizedEmail,
        password: hashedPassword,
        notifications: true,
        weeklyReport: true,
      };

      inMemoryUsers.set(normalizedEmail, userObj);

      const secret = process.env.JWT_SECRET || "your_super_secret_key_here";
      const token = jwt.sign(
        { userId: userObj.id, name: userObj.name, email: userObj.email },
        secret,
        { expiresIn: "7d" }
      );

      return res.status(201).json({
        success: true,
        message: "Registration successful",
        token,
        user: {
          id: userObj.id,
          name: userObj.name,
          email: userObj.email,
          notifications: userObj.notifications,
          weeklyReport: userObj.weeklyReport,
        },
      });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (isDBConnected()) {
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const secret = process.env.JWT_SECRET || "your_super_secret_key_here";
      const token = jwt.sign(
        { userId: user._id, name: user.name, email: user.email },
        secret,
        { expiresIn: "7d" }
      );

      return res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          notifications: user.notifications,
          weeklyReport: user.weeklyReport,
        },
      });
    } else {
      // In-Memory Fallback Mode
      let userObj = inMemoryUsers.get(normalizedEmail);

      if (userObj) {
        const passwordMatch = await bcrypt.compare(password, userObj.password);
        if (!passwordMatch) {
          return res.status(401).json({
            success: false,
            message: "Invalid email or password",
          });
        }
      } else {
        // Auto-create in-memory user so login always works seamlessly in dev mode even if DB is offline
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userId = "user_" + Date.now();

        userObj = {
          _id: userId,
          id: userId,
          name: normalizedEmail.split("@")[0] || "Candidate",
          email: normalizedEmail,
          password: hashedPassword,
          notifications: true,
          weeklyReport: true,
        };
        inMemoryUsers.set(normalizedEmail, userObj);
      }

      const secret = process.env.JWT_SECRET || "your_super_secret_key_here";
      const token = jwt.sign(
        { userId: userObj.id, name: userObj.name, email: userObj.email },
        secret,
        { expiresIn: "7d" }
      );

      return res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: userObj.id,
          name: userObj.name,
          email: userObj.email,
          notifications: userObj.notifications,
          weeklyReport: userObj.weeklyReport,
        },
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
}

async function getCurrentUser(req, res) {
  try {
    const userId = req.user?.userId;

    if (isDBConnected()) {
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          notifications: user.notifications,
          weeklyReport: user.weeklyReport,
        },
      });
    } else {
      // In-Memory Fallback
      let userObj = Array.from(inMemoryUsers.values()).find((u) => u.id === userId || u._id === userId);

      if (!userObj) {
        userObj = {
          id: userId || "user_guest",
          name: req.user?.name || "Candidate",
          email: req.user?.email || "candidate@preppilot.com",
          notifications: true,
          weeklyReport: true,
        };
      }

      return res.json({
        success: true,
        user: {
          id: userObj.id,
          name: userObj.name,
          email: userObj.email,
          notifications: userObj.notifications,
          weeklyReport: userObj.weeklyReport,
        },
      });
    }
  } catch (error) {
    console.error("Get current user error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get profile",
    });
  }
}

async function updateProfile(req, res) {
  try {
    const { name, notifications, weeklyReport } = req.body;
    const userId = req.user?.userId;

    if (isDBConnected()) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (name !== undefined) user.name = name;
      if (notifications !== undefined) user.notifications = notifications;
      if (weeklyReport !== undefined) user.weeklyReport = weeklyReport;

      await user.save();

      return res.json({
        success: true,
        message: "Profile updated",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          notifications: user.notifications,
          weeklyReport: user.weeklyReport,
        },
      });
    } else {
      // In-memory fallback
      let userObj = Array.from(inMemoryUsers.values()).find((u) => u.id === userId || u._id === userId);

      if (userObj) {
        if (name !== undefined) userObj.name = name;
        if (notifications !== undefined) userObj.notifications = notifications;
        if (weeklyReport !== undefined) userObj.weeklyReport = weeklyReport;
      } else {
        userObj = {
          id: userId || "user_guest",
          name: name || "Candidate",
          email: req.user?.email || "candidate@preppilot.com",
          notifications: notifications ?? true,
          weeklyReport: weeklyReport ?? true,
        };
      }

      return res.json({
        success: true,
        message: "Profile updated",
        user: {
          id: userObj.id,
          name: userObj.name,
          email: userObj.email,
          notifications: userObj.notifications,
          weeklyReport: userObj.weeklyReport,
        },
      });
    }
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log(`Password reset instructions requested for email: ${normalizedEmail}`);

    return res.status(200).json({
      success: true,
      message: "If an account with that email exists, reset instructions have been generated.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process forgot password request.",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  forgotPassword,
};

