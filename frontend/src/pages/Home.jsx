import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import api from "../ApiInterceptor";
import { AppData } from "../context/AppContext";
import { 
  Shield,
  LogOut,
  User,
  Key,
  CheckCircle,
  Clock,
  Activity
} from "lucide-react";

const Home = () => {
  const { setIsAuth, setUser, user } = AppData();

  const handleLogout = async () => {
    try {
      const { data } = await api.post("api/logout");
      toast.success(data.message);
      setIsAuth(false);
      setUser(null);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-200 h-100 bg-linear-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/5 blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-indigo-500/10 blur-[120px]" />

      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#030712]/80 border-b border-white/10 flex items-center justify-between px-6 py-4">

        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-linear-to-br from-cyan-500 via-indigo-500 to-purple-600 rounded-xl">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black">
            Auth<span className="text-cyan-400">Shield</span>
          </span>
        </div>

        <div className="flex items-center gap-3">

          {user?.role === "admin" && (
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition text-sm"
            >
              Admin Panel
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 transition text-sm flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>

        </div>
      </nav>

      <main className="max-w-6xl mx-auto w-full px-6 py-10 space-y-8 relative z-10">

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, <span className="text-cyan-400">{user?.name || "User"}</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Your authentication system is active and securely managing your session.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" />
              Profile
            </h3>

            <div className="space-y-2 text-sm text-slate-400">
              <p><span className="text-slate-200">Name:</span> {user?.name}</p>
              <p><span className="text-slate-200">Role:</span> {user?.role}</p>
              <p><span className="text-slate-200">Status:</span> Active</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-400" />
              Security
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>JWT Auth</span>
                <span className="text-emerald-400">Active</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Refresh Token</span>
                <span className="text-emerald-400">Enabled</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CSRF Protection</span>
                <span className="text-emerald-400">On</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Rate Limit</span>
                <span className="text-emerald-400">Active</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              Session
            </h3>

            <div className="space-y-2 text-sm text-slate-400">
              <p>Type: Secure Cookie</p>
              <p>Access Token: 15 min</p>
              <p>Refresh: Rotating</p>
              <p>Device: Trusted</p>
            </div>
          </div>

        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            Recent Activity
          </h3>

          <div className="space-y-3 text-sm text-slate-400">

            <div className="flex justify-between">
              <span>Login Successful</span>
              <span className="text-slate-500">Just now</span>
            </div>

            <div className="flex justify-between">
              <span>Token Refreshed</span>
              <span className="text-slate-500">2 min ago</span>
            </div>

            <div className="flex justify-between">
              <span>Security Validation Passed</span>
              <span className="text-slate-500">5 min ago</span>
            </div>

          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-linear-to-r from-cyan-500/5 to-indigo-500/5 flex flex-col md:flex-row justify-between items-center gap-4">

          <div>
            <h3 className="font-semibold">System Status</h3>
            <p className="text-sm text-slate-400">All authentication systems operational</p>
          </div>

          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            Secure Connection Active
          </div>

        </div>

      </main>

      <footer className="text-center py-6 text-xs text-slate-600 border-t border-white/5">
        © 2026 AuthShield • Secure Authentication System
      </footer>

    </div>
  );
};

export default Home;