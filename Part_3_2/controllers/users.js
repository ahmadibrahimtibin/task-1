const User = require("../models/user");

// GET /api/v1/users (Get All Users)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users." });
  }
};

// GET /api/v1/users/:id (Get User by ID)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user." });
  }
};

// POST /api/v1/users (Add User)
exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to add user." });
  }
};

// PATCH /api/v1/users/:id (Update User by ID)
exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user." });
  }
};

// DELETE /api/v1/users/:id (Delete User by ID) (Requires Valid AccessToken)
exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user." });
  }
};