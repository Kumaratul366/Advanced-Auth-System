import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { server } from '../main';
import { toast } from 'react-toastify';
import axios from 'axios'
import api from '../ApiInterceptor';
import { Shield, User, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';

const Register = () => {

  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: ""
    });

    const handleChange = (e) => {
      const {name, value} = e.target;

      setFormData({
        ...formData,
        [name]: value,
      });
    }

    const handleSubmit = async (e) => {
      setBtnLoading(true);
      e.preventDefault();

     try {

      const {data} = await api.post("/api/register", formData)
      toast.success(data.message);
      
      setFormData({
        name: "",
        email: "",
        password: ""
      });

     } catch (error) {
      toast.error(error.response.data.message);
     } finally {
      setBtnLoading(false);
     }
    };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-200 h-100 bg-linear-to-r from-purple-500/10 via-cyan-500/10 to-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-100 h-100 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Navigation */}
      <header className="px-6 md:px-16 py-6 border-b border-slate-900/80 bg-[#030712]/40 backdrop-blur-md relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 group text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>
      </header>

      <section className="flex-1 flex items-center justify-center px-5 py-12 relative z-10 max-w-6xl mx-auto w-full">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          <div className="md:w-1/2 lg:w-3/5 text-center md:text-left">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <div className="p-2 bg-linear-to-br from-cyan-500 to-indigo-600 rounded-xl shadow-lg ring-1 ring-white/10">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                Auth<span className="text-cyan-400">Shield</span> Environment
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Create a Secured <br />
              <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Developer Identity
              </span>
            </h1>
            
            <p className="leading-relaxed mt-5 text-slate-400 text-sm md:text-base max-w-lg mx-auto md:mx-0">
              Register a new account locally to examine token configurations. All credentials 
              submitted here are instantly safely salted and hashed before entering the database instance.
            </p>
          </div>

          <div className="w-full md:w-1/2 lg:w-2/5 relative">
            <form 
              className="w-full bg-linear-to-b from-slate-900/90 to-slate-950 rounded-2xl p-8 flex flex-col border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-sm" 
              onSubmit={handleSubmit}
            >
              <h2 className="text-xl font-bold text-slate-100 mb-6 tracking-tight">
                New Registration
              </h2>
              
              <div className="relative mb-4">
                <label htmlFor="name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="w-full bg-slate-950 rounded-xl border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 text-sm outline-none text-slate-200 pl-10 pr-4 py-3 transition-all duration-200 placeholder-Alex Carter" 
                    placeholder="Alex Carter"
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="relative mb-4">
                <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="w-full bg-slate-950 rounded-xl border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 text-sm outline-none text-slate-200 pl-10 pr-4 py-3 transition-all duration-200 placeholder-name@example.com" 
                    placeholder="name@example.com"
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="relative mb-6">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Account Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    className="w-full bg-slate-950 rounded-xl border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 text-sm outline-none text-slate-200 pl-10 pr-4 py-3 transition-all duration-200 placeholder-••••••••" 
                    placeholder="••••••••"
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={btnLoading}
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 py-3.5 px-8 rounded-xl hover:opacity-95 active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none ring-1 ring-cyan-400/20 shadow-lg shadow-blue-500/10"
              >
                {btnLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    Saving Identity Model...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
             
              <div className="mt-6 pt-5 border-t border-slate-900 text-center">
                <Link to={"/login"} className="text-xs font-medium text-slate-500 hover:text-cyan-400 transition-colors">
                  Already have an active user profile? <span className="underline underline-offset-4 font-semibold text-slate-300">Click here to sign in</span>
                </Link>
              </div>
            </form>
          </div>

        </div>
      </section>

      <footer className="border-t border-slate-950 bg-[#020610] py-6 px-6 relative z-10 text-center text-[11px] text-slate-600">
        &copy; 2026 AuthShield Portal. Secured identity gateway transmission node.
      </footer>
    </div>
  )
}

export default Register;