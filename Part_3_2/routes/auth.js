const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/auth");

// POST /api/v1/auth/login (Login User)
router.post("/login", loginUser);

module.exports = router;
