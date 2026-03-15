import { useState } from "react";
import { HeartPulse } from "lucide-react";
import { login } from "../services/authService";

export function LoginPage({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    try {

      const user = await login(email, password);

      onLogin(user);

    } catch (err) {

      setError("Invalid username or password");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex items-center justify-center p-4">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* Hospital Logo */}

          <div className="text-center mb-8">

            <div className="inline-flex items-center justify-center w-20 h-20 
            bg-gradient-to-br from-blue-700 to-teal-600 rounded-full mb-4">

              <HeartPulse className="w-10 h-10 text-white" />

            </div>

            <h1 className="text-2xl font-semibold text-slate-900">
              Faris Hospital
            </h1>

            <p className="text-slate-600 text-sm">
              Hospital Management System
            </p>

          </div>

          {/* Welcome Message */}

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">

            <p className="text-slate-700 text-center text-sm">

              Welcome back! Please sign in to access the
              hospital management dashboard.

            </p>

          </div>

          {/* Error */}

          {error && (

            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">

              {error}

            </div>

          )}

          {/* Login Form */}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>

              <label className="block text-slate-700 mb-2">
                Username
              </label>

              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 
                rounded-lg text-slate-900 placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-blue-700 
                focus:border-transparent transition-all"
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
                rounded-lg text-slate-900
                focus:outline-none focus:ring-2 focus:ring-blue-700 
                focus:border-transparent transition-all"
                required
              />

            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-teal-600 
              text-white py-3 rounded-lg 
              hover:shadow-lg hover:scale-[1.02] 
              transition-all duration-200 mt-6"
            >

              Sign In

            </button>

          </form>

          {/* Footer */}

          <p className="text-slate-400 text-center text-xs mt-6">

            Secure Hospital Portal • Authorized Medical Staff Only

          </p>

        </div>

      </div>

    </div>

  );

}