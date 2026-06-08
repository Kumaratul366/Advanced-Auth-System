import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl" />

      <nav className="relative z-10 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/70 px-6 py-4 backdrop-blur-md md:px-10">
        <Link to="/" className="text-lg font-bold tracking-tight">
          Auth<span className="saas-gradient-text">Shield</span>
        </Link>
        <Link to="/" className="text-sm text-slate-400 transition hover:text-white">
          Back to home
        </Link>
      </nav>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-65px)] max-w-6xl flex-col items-center justify-center gap-12 px-6 py-16 lg:flex-row lg:gap-20">
        <div className="max-w-lg text-center lg:text-left">
          <p className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            Enterprise-grade security
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">
            Secure access for{" "}
            <span className="saas-gradient-text">modern apps</span>
          </h1>
          <p className="mt-4 text-slate-400">
            {subtitle ||
              "JWT authentication, OTP verification, and role-based access — built for production workflows."}
          </p>
          <ul className="mt-8 hidden space-y-3 text-sm text-slate-400 lg:block">
            <li className="flex items-center gap-2">
              <span className="text-blue-400">✓</span> Encrypted sessions & refresh tokens
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-400">✓</span> Two-factor OTP verification
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-400">✓</span> CSRF & rate-limit protection
            </li>
          </ul>
        </div>

        <div className="saas-card w-full max-w-md p-8 shadow-2xl shadow-black/20">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-slate-400">
            Enter your details to continue
          </p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
