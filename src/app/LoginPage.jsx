import { useState } from "react";
import logo from "../assets/anchorageKarachi.jpg";
import { MOCK_USERS } from "../mocks/users";

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-900 to-teal-600 rounded-full mb-4">
              <img
                src={logo}
                alt="Anchorage Karachi"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <h1 className="text-slate-900 mb-2">Anchorage Karachi</h1>
            <p className="text-slate-600">Karachi Office</p>
          </div>

          {/* Welcome Message */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-4 mb-6">
            <p className="text-slate-700 text-center text-sm">
              Welcome back! Please sign in to access your dashboard
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
              <label htmlFor="email" className="block text-slate-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ak.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg 
                           text-slate-900 placeholder-slate-400
                           focus:outline-none focus:ring-2 focus:ring-blue-900 
                           focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="123"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 
                           rounded-lg focus:outline-none focus:ring-2 
                           focus:ring-blue-900 focus:border-transparent 
                           transition-all text-slate-900"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-900 to-teal-700 
                         text-white py-3 rounded-lg 
                         hover:shadow-lg hover:scale-[1.02] 
                         transition-all duration-200 mt-6"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="text-slate-500 text-center text-sm mt-6">
            Authorized access only • Secure portal
          </p>
        </div>
      </div>
    </div>
  );
}
