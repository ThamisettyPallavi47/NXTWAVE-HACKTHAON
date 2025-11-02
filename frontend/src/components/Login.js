// import React, { useState } from "react";
// import { login } from "../auth";
// import { useNavigate } from "react-router-dom";
// import "../styles/Login.css";

// export default function Login() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [role, setRole] = useState("user");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   // ---------- Register Handler ----------
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ fullName, email, password, role }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("Registered successfully! You can now login.");
//         setIsLogin(true);
//         setFullName("");
//         setEmail("");
//         setPassword("");
//       } else {
//         alert(data.error || "Registration failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       alert("Server not reachable. Check backend connection.");
//     }
//   };

//   // ---------- Login Handler ----------
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         const user = data.user;
//         login({ email: user.email, role: user.role });
//         alert(`Login successful! Welcome ${user.full_name} (${user.role})`);
//         setEmail("");
//         setPassword("");

//         if (user.role === "admin") navigate("/admin/dashboard");
//         else navigate("/marketplace");
//       } else {
//         alert(data.error || "Invalid email or password!");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("Server not reachable. Check backend connection.");
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="auth-container">
//         <div className="auth-card">
//           <div className="logo-section">
//             <h1>🪔 Artisan Hub</h1>
//             <p>Connecting Artisans & Buyers</p>
//           </div>

//           <div className="tabs">
//             <button
//               className={isLogin ? "active" : ""}
//               onClick={() => setIsLogin(true)}
//             >
//               Login
//             </button>
//             <button
//               className={!isLogin ? "active" : ""}
//               onClick={() => setIsLogin(false)}
//             >
//               Register
//             </button>
//           </div>

//           <form
//             className="auth-form"
//             onSubmit={isLogin ? handleLogin : handleRegister}
//           >
//             {!isLogin && (
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 required
//               />
//             )}
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {!isLogin && (
//               <select value={role} onChange={(e) => setRole(e.target.value)}>
//                 <option value="user">Customer (User)</option>
//                 <option value="admin">Local Artisan (Admin)</option>
//               </select>
//             )}

//             <button type="submit" className="auth-btn">
//               {isLogin ? "Login" : "Register"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { login } from "../auth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // ✅ small inline message
  const navigate = useNavigate();

  // ---------- Register Handler ----------
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, role }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Registered successfully! You can now login.");
        setIsLogin(true);
        setFullName("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.error || "Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("⚠️ Server not reachable. Check backend connection.");
    }
  };

  // ---------- Login Handler ----------
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        const user = data.user;
        login({ email: user.email, role: user.role });

        // ✅ Instead of alert, directly navigate
        if (user.role === "admin") navigate("/admin/dashboard");
        else navigate("/marketplace");
      } else {
        setMessage(data.error || "❌ Invalid email or password!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("⚠️ Server not reachable. Check backend connection.");
    }
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="logo-section">
            <h1>🪔 Artisan Hub</h1>
            <p>Connecting Artisans & Buyers</p>
          </div>

          <div className="tabs">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <form
            className="auth-form"
            onSubmit={isLogin ? handleLogin : handleRegister}
          >
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isLogin && (
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">Customer (User)</option>
                <option value="admin">Local Artisan (Admin)</option>
              </select>
            )}

            <button type="submit" className="auth-btn">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          {/* ✅ Inline message instead of alert */}
          {message && <p className="auth-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}
