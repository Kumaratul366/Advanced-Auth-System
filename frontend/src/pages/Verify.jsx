import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { server } from '../main';
import Loading from '../Loading';
import { ShieldCheck, ShieldX, ArrowRight } from 'lucide-react';

const Verify = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading]  = useState(true);

  const params = useParams();

  async function verifyUser() {
    try {
      const {data} = await axios.post(`${server}/api/verify/${params.token}`)

      setSuccessMessage(data.message);

    } catch (error) {
      setErrorMessage(error.response.data.message);
    }finally{
      setLoading(false);
    }
    
  }

  useEffect(()=>{
    verifyUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center px-5 relative overflow-hidden font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-100 bg-linear-to-r from-cyan-500/5 via-purple-500/5 to-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {loading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-md bg-linear-to-b from-slate-900/90 to-slate-950 rounded-2xl p-8 border border-slate-800 shadow-2xl overflow-hidden text-center backdrop-blur-sm relative z-10 animate-fade-in">
          
          {/* SUCCESS STATE WINDOW */}
          {successMessage && (
            <>
              {/* Outer Vibrant Ring Indicator */}
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-black tracking-tight text-white mb-3">
                Account Verified
              </h2>

              <p className="text-slate-400 text-sm leading-relaxed mb-8 px-2">
                {successMessage}
              </p>

              {/* Redirect Navigation Component */}
              <Link
                to="/login"
                className="w-full group inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-950 bg-white py-3.5 px-6 rounded-xl hover:bg-slate-200 active:scale-[0.99] transition-all duration-150 shadow-lg shadow-white/5"
              >
                Go to Login
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </>
          )}

          {/* FAILURE STATE WINDOW */}
          {errorMessage && (
            <>
              <div className="mx-auto w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
                <ShieldX className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-black tracking-tight text-white mb-3">
                Verification Failed
              </h2>

              <p className="text-slate-400 text-sm leading-relaxed mb-8 px-2">
                {errorMessage || "The security token provided is invalid or has reached its expiration threshold."}
              </p>

              <Link
                to="/login"
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-300 bg-slate-900 border border-slate-800 py-3.5 px-6 rounded-xl hover:bg-slate-800 hover:text-white active:scale-[0.99] transition-all duration-150"
              >
                Back to Login Portal
              </Link>
            </>
          )}

        </div>
      )}
    </div>
  )
}

export default Verify