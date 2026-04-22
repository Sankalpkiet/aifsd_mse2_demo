const Student = require("../models/stud");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    // ✅ VALIDATION (VERY IMPORTANT)
    if (!name || !email || !password || !course) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await Student.create({
      name,
      email,
      password: hashed,
      course
    });

    res.status(201).json({ message: "Registered successfully" });

  } catch (err) {
    console.error("REGISTER ERROR:", err); // 👈 ADD THIS
    res.status(500).json({ error: err.message });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      student: {
        name: student.name,
        email: student.email,
        course: student.course
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE PASSWORD
exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const student = await Student.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong old password" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    student.password = hashed;

    await student.save();

    res.json({ message: "Password updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE COURSE
exports.updateCourse = async (req, res) => {
  try {
    const { course } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.user.id,
      { course },
      { new: true }
    );

    res.json({ message: "Course updated", student });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};