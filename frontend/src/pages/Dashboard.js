import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });

  // 🔥 check login + load data
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      const data = JSON.parse(localStorage.getItem("student"));
      setStudent(data);
    }
  }, [navigate]);

  // 🔥 update course
  const updateCourse = async () => {
    try {
      const res = await API.put("/update-course", { course });

      // update UI + storage
      setStudent(res.data.student);
      localStorage.setItem("student", JSON.stringify(res.data.student));

      alert("Course updated ✅");
    } catch (err) {
      alert("Error updating course ❌");
    }
  };

  // 🔥 update password
  const updatePassword = async () => {
    try {
      await API.put("/update-password", passwords);

      alert("Password updated ✅");

      // clear inputs
      setPasswords({
        oldPassword: "",
        newPassword: ""
      });

    } catch (err) {
      alert("Wrong old password ❌");
    }
  };

  // 🔥 logout
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Student Info */}
      {student && (
        <div>
          <p><b>Name:</b> {student.name}</p>
          <p><b>Email:</b> {student.email}</p>
          <p><b>Course:</b> {student.course}</p>
        </div>
      )}

      <hr />

      {/* Update Course */}
      <h3>Update Course</h3>
      <input
        placeholder="New Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <button onClick={updateCourse}>Update Course</button>

      <hr />

      {/* Update Password */}
      <h3>Update Password</h3>
      <input
        type="password"
        placeholder="Old Password"
        value={passwords.oldPassword}
        onChange={(e) =>
          setPasswords({ ...passwords, oldPassword: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="New Password"
        value={passwords.newPassword}
        onChange={(e) =>
          setPasswords({ ...passwords, newPassword: e.target.value })
        }
      />
      <button onClick={updatePassword}>Update Password</button>

      <hr />

      {/* Logout */}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;