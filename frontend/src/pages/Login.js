import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("student", JSON.stringify(res.data.student));

      navigate("/dashboard");

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;