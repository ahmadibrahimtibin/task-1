// POST /api/v1/auth/login (Login User)
exports.loginUser = async (req, res) => {
    try {
      // Logic to handle user login
      const { username, password } = req.body;
  
      // Check if the username and password match in the database
      // Example logic:
      const user = await User.findOne({ username });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid username or password." });
      }
  
      // Generate and send the access token upon successful login
      const accessToken = generateAccessToken(user);
      res.status(200).json({ accessToken });
    } catch (error) {
      res.status(500).json({ error: "Failed to login." });
    }
  };
  
  // Helper function to generate access token
  function generateAccessToken(user) {
    // Generate and return the access token here
  }
  