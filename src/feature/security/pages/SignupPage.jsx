import { useState } from "react";
import { HeartPulse } from "lucide-react";
import { useNavigate } from "react-router";
import { signup } from "../services/authService";

export function SignupPage() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");
    setSuccess("");

    try {

      await signup({
        username,
        email,
        password,
        role: "ADMIN",
        active: true
      });

      setSuccess("Account created successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Account creation failed. Please try again."
      );

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex items-center justify-center p-4 text-slate-900">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* Logo */}

          <div className="text-center mb-8">

            <div className="inline-flex items-center justify-center w-20 h-20 
            bg-gradient-to-br from-blue-700 to-teal-600 rounded-full mb-4">

              <HeartPulse className="w-10 h-10 text-white" />

            </div>

            <h1 className="text-2xl font-semibold text-slate-900">
              Faris Hospital
            </h1>

            <p className="text-slate-600 text-sm">
              Create Staff Account
            </p>

          </div>

          {/* Error */}

          {error && (

            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">

              {error}

            </div>

          )}

          {/* Success */}

          {success && (

            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3 mb-4">

              {success}

            </div>

          )}

          {/* Form */}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>

              <label className="block text-slate-700 mb-2">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 
                rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                required
              />

            </div>

            <div>

              <label className="block text-slate-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@hospital.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 
                rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                required
              />

            </div>

            <div>

              <label className="block text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 
                rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                required
              />

            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-teal-600 
              text-white py-3 rounded-lg hover:shadow-lg transition"
            >

              Create Account

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}