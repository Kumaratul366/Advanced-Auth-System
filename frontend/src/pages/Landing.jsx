import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Lock,
  Key,
  UserCheck,
  Zap,
  Cookie,
  Database,
  CheckCircle2,
  Server,
  Fingerprint,
  RefreshCw
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 relative overflow-hidden font-sans">

        <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-225 h-125 bg-indigo-600/20 blur-[140px]" />
        <div className="absolute top-[20%] right-[-10%] w-150 h-15 bg-cyan-500/10 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-175 h-175 bg-blue-500/10 blur-[160px]" />
      </div>


      <nav className="relative z-10 backdrop-blur-xl bg-[#070A12]/70 border-b border-white/5">
  <div className="w-full flex items-center justify-between px-6 py-4">

    <div className="flex items-center gap-3">
      <div className="p-2.5 rounded-xl bg-linear-to-br from-indigo-500 via-blue-500 to-cyan-400 shadow-lg shadow-indigo-500/20">
        <Shield className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-black tracking-tight">
        Auth<span className="text-cyan-400">Shield</span>
      </span>
    </div>


    <div className="hidden md:flex items-center gap-8 text-lg text-slate-300 ml-auto">
      <Link to="/login" className="hover:text-white">Login</Link>

      <Link
        to="/register"
        className="px-4 py-2 rounded-xl bg-linear-to-r from-indigo-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition"
      >
        Get Started
      </Link>
    </div>

  </div>
</nav>


      <section className="relative max-w-6xl mx-auto px-6 pt-28 pb-20 text-center">

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-cyan-300 text-xs font-semibold mb-8">
          <Shield className="w-3.5 h-3.5" />
          Advanced Authentication System
        </div>

        <h1 className="text-4xl md:text-6xl font-black leading-tight">
          Secure Authentication
          <br />
          <span className="bg-linear-to-r from-indigo-400 via-cyan-400 to-blue-400 text-transparent bg-clip-text">
            Built for Modern Systems
          </span>
        </h1>

        <p className="mt-6 text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
          Production-ready authentication architecture with JWT, refresh token rotation,
          Redis sessions, RBAC authorization, and hardened backend security layers.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="px-7 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/10 hover:opacity-90 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-7 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            View Docs
          </Link>
        </div>
      </section>

     

<section id="features" className="max-w-6xl mx-auto px-6 py-20">

  <div className="text-center mb-14">
    <h2 className="text-3xl md:text-4xl font-bold">
      Security Features
    </h2>
    <p className="text-slate-400 mt-3">
      Production-grade authentication and protection mechanisms
    </p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    {[
      {
        title: "Secure User Registration & Login",
        desc: "Fully validated authentication flow ensuring only legitimate users can create accounts and securely access the system."
      },
      {
        title: "Password Hashing with Bcrypt",
        desc: "Passwords are hashed using bcrypt with salt rounds, making them computationally infeasible to reverse or crack."
      },
      {
        title: "JWT Access & Refresh Tokens",
        desc: "Short-lived access tokens with rotating refresh tokens ensure seamless sessions while minimizing token compromise risk."
      },
      {
        title: "Protected Routes (Frontend & Backend)",
        desc: "Routes are secured using middleware and client-side guards to prevent unauthorized access across the application."
      },
      {
        title: "Role-Based Authorization",
        desc: "Access control system differentiates Admin and User roles, restricting sensitive actions based on permissions."
      },
      {
        title: "Two-Factor Authentication (2FA/MFA)",
        desc: "Adds an extra security layer using OTP-based verification to confirm user identity during login or sensitive actions."
      },
      {
        title: "IP & Email Rate Limiting",
        desc: "Prevents brute-force attacks by limiting repeated login attempts per IP address and email within a time window."
      },
      {
        title: "CSRF Protection",
        desc: "Protects against cross-site request forgery to validate legitimate requests."
      },
      {
        title: "Secure Cookie Management",
        desc: "Uses httpOnly, secure, and sameSite flags to protect authentication cookies from XSS and unauthorized access."
      }
    ].map((item, i) => (
      <div
        key={i}
        className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition"
      >
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-cyan-500 mb-4 flex items-center justify-center text-white font-bold">
          {String(i + 1).padStart(2, "0")}
        </div>

        <h3 className="font-semibold mb-2 text-slate-100">
          {item.title}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed">
          {item.desc}
        </p>
      </div>
    ))}

  </div>
</section>




<section className="max-w-6xl mx-auto px-6 py-20">

  <div className="text-center mb-14">
    <h2 className="text-3xl md:text-4xl font-bold">
      System Architecture
    </h2>
    <p className="text-slate-400 mt-3">
      High-level view of how authentication flows through the system
    </p>
  </div>

  <div className="relative">

    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
      <div className="w-150 h-75 bg-indigo-500/10 blur-[120px]" />
    </div>

    <div className="grid md:grid-cols-3 gap-6 relative z-10">

      <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
        <div className="text-cyan-400 font-semibold mb-2">Frontend (React)</div>
        <p className="text-sm text-slate-400 leading-relaxed">
          Handles authentication UI, login/register forms, protected routes,
          and stores session state securely via cookies (httpOnly + sameSite).
        </p>

        <div className="mt-4 text-xs text-slate-500">
          Login → Register → Protected Pages → Token Refresh Call
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
        <div className="text-indigo-400 font-semibold mb-2">Backend API (Node/Express)</div>
        <p className="text-sm text-slate-400 leading-relaxed">
          Validates credentials, issues JWT access & refresh tokens,
          enforces RBAC, CSRF checks, and rate limiting middleware.
        </p>

        <div className="mt-4 text-xs text-slate-500">
          Auth Routes → Middleware → Token Generation → Response
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
        <div className="text-blue-400 font-semibold mb-2">Data Layer</div>
        <p className="text-sm text-slate-400 leading-relaxed">
          MongoDB stores user data securely while Redis manages sessions,
          refresh tokens, and instant logout capabilities.
        </p>

        <div className="mt-4 text-xs text-slate-500">
          MongoDB → Users | Redis → Sessions & Token Store
        </div>
      </div>

    </div>

    <div className="hidden md:flex justify-between items-center mt-10 text-xs text-slate-500 px-10">
      <span>Client Request</span>
      <span>Secure API Processing</span>
      <span>Validated Response</span>
    </div>

  </div>
</section>
      


<section className="relative py-28 px-6 text-center overflow-hidden">

  
  <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
    <div className="w-175 h-100 bg-cyan-500/10 blur-[140px]" />
    <div className="w-125 h-75 bg-indigo-500/10 blur-[120px] absolute top-10" />
  </div>

  
  <div className="relative max-w-3xl mx-auto p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl shadow-cyan-500/10">

   
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-cyan-300 text-xs font-semibold mb-6">
      🚀 Production Ready Authentication System
    </div>

  
    <h2 className="text-3xl md:text-4xl font-black leading-tight">
      Build Secure Systems
      <br />
      <span className="bg-linear-to-r from-indigo-400 via-cyan-400 to-blue-400 text-transparent bg-clip-text">
        Faster & Smarter
      </span>
    </h2>

    <p className="text-slate-300 mt-5 leading-relaxed text-sm md:text-base">
      A complete authentication architecture with JWT, refresh rotation,
      RBAC, Redis sessions, CSRF protection, and enterprise-grade security patterns
      ready for real-world scaling.
    </p>

    <div className="mt-5 text-xs text-slate-500">
      Built with production-grade security practices used in modern SaaS platforms
    </div>

    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

      <Link
        to="/register"
        className="px-7 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/20 hover:opacity-90 transition"
      >
        Start Building Now
      </Link>

      <Link
        to="/login"
        className="px-7 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-slate-200"
      >
        View Dashboard
      </Link>

    </div>

  </div>
</section>


      <footer className="border-t border-white/10 py-10 text-center text-sm text-slate-500">
        © 2026 AuthShield. Secure authentication infrastructure for modern apps.
      </footer>

    </div>
  );
};

export default Landing;