const express = require("express");
const router = express.Router();

const {
  register,
  login,
  updatePassword,
  updateCourse
} = require("../controllers/control");

const auth = require("../middleware/middle");

router.get("/test", (req, res) => {
  res.send("Aut route working");
});

// PUBLIC
router.post("/register", register);
router.post("/login", login);

// PROTECTED
router.put("/update-password", auth, updatePassword);
router.put("/update-course", auth, updateCourse);

module.exports = router;