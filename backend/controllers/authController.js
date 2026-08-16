async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    const user = {
      id: Date.now().toString(),
      name,
      email,
      role: "Candidate",
      createdAt: new Date().toISOString(),
    };

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user,
      token: "preppilot_mock_jwt_token_" + user.id,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration.",
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = {
      id: "user_123",
      name: email.split("@")[0] || "User",
      email,
      role: "Candidate",
    };

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      user,
      token: "preppilot_mock_jwt_token_123",
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
}

async function getCurrentUser(req, res) {
  return res.status(200).json({
    success: true,
    user: {
      id: "user_123",
      name: "Candidate Pro",
      email: "candidate@preppilot.ai",
      role: "Candidate",
    },
  });
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
