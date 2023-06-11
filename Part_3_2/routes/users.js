const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/users");

// GET /api/v1/users (Get All Users)
router.get("/", getAllUsers);

// GET /api/v1/users/:id (Get User by ID)
router.get("/:id", getUserById);

// POST /api/v1/users (Add User)
router.post("/", addUser);

// PATCH /api/v1/users/:id (Update User by ID)
router.patch("/:id", updateUserById);

// DELETE /api/v1/users/:id (Delete User by ID) (Requires Valid AccessToken)
router.delete("/:id", requireAccessToken, deleteUserById);

module.exports = router;