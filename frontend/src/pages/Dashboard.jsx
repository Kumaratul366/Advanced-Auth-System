import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../ApiInterceptor";
import { toast } from "react-toastify";
import { AppData } from "../context/AppContext";
import {
  ShieldAlert,
  Terminal,
  ArrowLeft,
  CheckCircle,
  Activity,
  Database,
  Server,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  const [content, setContent] = useState("");
  const { user } = AppData();

  async function fetchAdminData() {
    try {
      const { data } = await api.get("/api/admin", {
        withCredentials: true,
      });

      setContent(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col relative overflow-hidden font-sans">

      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-200 h-100 bg-purple-500/10 blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-cyan-500/10 blur-[120px]" />

      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#030712]/80 border-b border-white/10 flex items-center justify-between px-6 py-4">

        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-linear-to-br from-purple-500 via-indigo-600 to-cyan-500 rounded-xl">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>

          <span className="text-xl font-black">
            Auth<span className="text-purple-400">Shield</span>
            <span className="ml-2 text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
              ADMIN
            </span>
          </span>
        </div>

        <Link
          to="/home"
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>

      </nav>


      <main className="max-w-6xl mx-auto w-full px-6 py-10 space-y-8 relative z-10">

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
          <h1 className="text-2xl md:text-3xl font-black">
            Admin Control Center
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Manage authentication, monitor system health, and control user access.
          </p>
        </div>


        <div className="grid md:grid-cols-4 gap-4">

          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <p className="text-xs text-slate-500">API Status</p>
            <p className="text-emerald-400 font-bold mt-1">Operational</p>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <p className="text-xs text-slate-500">Auth System</p>
            <p className="text-emerald-400 font-bold mt-1">Secure</p>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <p className="text-xs text-slate-500">Session Layer</p>
            <p className="text-emerald-400 font-bold mt-1">Active</p>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <p className="text-xs text-slate-500">Threat Level</p>
            <p className="text-emerald-400 font-bold mt-1">Low</p>
          </div>

        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
          <h2 className="font-bold mb-4">Admin Actions</h2>

          <div className="flex flex-wrap gap-3">

            <button className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 text-sm">
              View Users
            </button>

            <button className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20 text-sm">
              Session Logs
            </button>

            <button className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 text-sm">
              Manage Roles
            </button>

            <button className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 text-sm">
              Revoke Access
            </button>

          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">

          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-4 h-4 text-purple-400" />
            <h2 className="font-bold">Backend Response</h2>
          </div>

          <div className="p-5 rounded-xl bg-black/30 border border-white/10 min-h-30 flex items-center justify-center text-center">

            {content ? (
              <p className="text-purple-300 font-semibold">
                {content}
              </p>
            ) : (
              <p className="text-slate-500 text-sm animate-pulse">
                Waiting for admin API response...
              </p>
            )}

          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">

          <h2 className="font-bold mb-4">Security Activity Log</h2>

          <div className="space-y-3 text-sm text-slate-400">

            <div className="flex justify-between">
              <span>Admin login verified</span>
              <span className="text-slate-500">Just now</span>
            </div>

            <div className="flex justify-between">
              <span>JWT validation passed</span>
              <span className="text-slate-500">2 min ago</span>
            </div>

            <div className="flex justify-between">
              <span>Redis session confirmed</span>
              <span className="text-slate-500">5 min ago</span>
            </div>

          </div>
        </div>

        <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/5 text-xs text-slate-400">
          <span className="text-red-300 font-semibold">Security Notice:</span>
          {' '}All admin actions are logged. Unauthorized access attempts are automatically blocked and recorded.
        </div>

      </main>

      <footer className="text-center py-6 text-xs text-slate-600 border-t border-white/5">
        © 2026 AuthShield Admin Panel • Secure System Control Layer
      </footer>

    </div>
  );
};

export default Dashboard;