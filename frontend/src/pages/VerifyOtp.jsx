import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { server } from '../main';
import { toast } from 'react-toastify';
import { AppData } from '../context/AppContext';
import api from '../ApiInterceptor';
import { ShieldAlert, KeyRound, Loader2, ArrowLeft } from 'lucide-react';

const VerifyOtp = () => {
  
  const { setIsAuth, setUser } = AppData();
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    otp: ""
  });


  const handleChange = (e) =>{
      const {name, value} = e.target;

      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (e) =>{
      setBtnLoading(true);
      e.preventDefault();
      try {
        const email = localStorage.getItem("email");
        const { data } = await api.post("/api/verify-otp", {otp: formData.otp, email});

        toast.success(data.message);

        localStorage.removeItem("email");

        setFormData({
          otp: ""
        });

        setIsAuth(true);
        setUser(data.user);
        navigate("/home");

      } catch (error) {
        toast.error(error.response.data.message);
      }finally{
        setBtnLoading(false);
      }

    };


  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-150 h-100 bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <header className="px-6 md:px-16 py-6 border-b border-slate-900/80 bg-[#030712]/40 backdrop-blur-md relative z-10">
        <Link to="/login" className="inline-flex items-center gap-2 group text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Login
        </Link>
      </header>

      <section className="flex-1 flex items-center justify-center px-5 py-12 relative z-10 max-w-6xl mx-auto w-full">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Explainer Column */}
          <div className="md:w-1/2 lg:w-3/5 text-center md:text-left">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <div className="p-2 bg-linear-to-br from-cyan-500 to-indigo-600 rounded-xl shadow-lg ring-1 ring-white/10">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                Auth<span className="text-cyan-400">Shield</span> Verification
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Two-Factor <br />
              <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Authentication Gate
              </span>
            </h1>
            
            <p className="leading-relaxed mt-5 text-slate-400 text-sm md:text-base max-w-lg mx-auto md:mx-0">
              A temporary code has been transmitted directly to your email inbox. 
              Please enter the code on the right to complete secure identity validation.
            </p>
          </div>

          {/* Right Form Card Column */}
          <div className="w-full md:w-1/2 lg:w-2/5 relative">
            <form 
              className="w-full bg-linear-to-b from-slate-900/90 to-slate-950 rounded-2xl p-8 flex flex-col border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-sm" 
              onSubmit={handleSubmit}
            >
              <h2 className="text-xl font-bold text-slate-100 mb-2 tracking-tight">
                Verify OTP
              </h2>
              <p className="text-xs text-slate-500 mb-6 font-medium">
                Enter your 6-digit session confirmation code
              </p>
              
              {/* OTP Code Field */}
              <div className="relative mb-6">
                <label htmlFor="otp" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  One-Time Security Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input 
                    type="number" 
                    id="otp" 
                    name="otp" 
                    className="w-full bg-slate-950 rounded-xl border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 text-sm outline-none text-slate-200 pl-10 pr-4 py-3 transition-all duration-200 placeholder-000000 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none font-mono tracking-[0.25em]" 
                    placeholder="000000"
                    value={formData.otp} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              {/* Action Trigger Button */}
              <button 
                type="submit"
                disabled={btnLoading}
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 py-3.5 px-8 rounded-xl hover:opacity-95 active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none ring-1 ring-cyan-400/20 shadow-lg shadow-blue-500/10"
              >
                {btnLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    Checking Code Token...
                  </>
                ) : (
                  "Confirm Verification"
                )}
              </button>
             
              {/* Secondary Redirect Context Link */}
              <div className="mt-6 pt-5 border-t border-slate-900 text-center">
                <Link to={"/login"} className="text-xs font-medium text-slate-500 hover:text-cyan-400 transition-colors">
                  Didn't receive a token or link timed out? <span className="underline underline-offset-4 font-semibold text-slate-300">Return to sign in</span>
                </Link>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* Global Interface Base Footer */}
      <footer className="border-t border-slate-950 bg-[#020610] py-6 px-6 relative z-10 text-center text-[11px] text-slate-600">
        &copy; 2026 AuthShield Portal. Secured identity gateway transmission node.
      </footer>
    </div>
  )
}

export default VerifyOtp;