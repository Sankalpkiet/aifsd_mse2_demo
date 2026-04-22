import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation (prevents backend crash)
    if (!form.name || !form.email || !form.password || !form.course) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/register", form);

      alert("Registered Successfully ✅");

      // clear form (good practice)
      setForm({
        name: "",
        email: "",
        password: "",
        course: ""
      });

      navigate("/login");

    } catch (err) {
      console.log("FULL ERROR:", err);

      if (!err.response) {
        alert("Backend not running or connection error ❌");
      } else {
        alert(
          err.response.data?.message ||
          err.response.data?.error ||
          "Something went wrong"
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          placeholder="Course"
          value={form.course}
          onChange={(e) =>
            setForm({ ...form, course: e.target.value })
          }
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

      </form>
    </div>
  );
}

export default Register;