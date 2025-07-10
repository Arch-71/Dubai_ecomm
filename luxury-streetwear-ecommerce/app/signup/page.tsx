"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<'signup' | 'otp'>('signup');
  const [otp, setOtp] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName, phone, gender }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed");
      } else {
        setStep('otp'); // Move to OTP step
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Invalid OTP");
      } else {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        window.location.href = "/";
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="backdrop-blur-xl bg-black/60 border border-white/10 shadow-2xl rounded-3xl max-w-md w-full p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-gradient-to-tr from-cyan-400/20 via-pink-500/20 to-transparent w-full h-full blur-2xl opacity-70 animate-pulse" />
        </div>
        {step === 'signup' ? (
          <>
            <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent text-center tracking-wider drop-shadow-lg">
              Create Account
            </h2>
            <form className="space-y-5" onSubmit={handleSignup}>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/><path d="M12 14v7m0 0H6a2 2 0 0 1-2-2v-1a6 6 0 0 1 12 0v1a2 2 0 0 1-2 2h-6Z"/></svg>
            </span>
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
              className="pl-12 bg-black/60 border border-cyan-500/30 focus:border-pink-400 text-white placeholder-cyan-300 rounded-full py-4 text-lg shadow-lg focus:ring-2 focus:ring-pink-400/30 transition-all"
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/><path d="M12 14v7m0 0H6a2 2 0 0 1-2-2v-1a6 6 0 0 1 12 0v1a2 2 0 0 1-2 2h-6Z"/></svg>
            </span>
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
              className="pl-12 bg-black/60 border border-pink-500/30 focus:border-cyan-400 text-white placeholder-pink-300 rounded-full py-4 text-lg shadow-lg focus:ring-2 focus:ring-cyan-400/30 transition-all"
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/><path d="M12 14v7m0 0H6a2 2 0 0 1-2-2v-1a6 6 0 0 1 12 0v1a2 2 0 0 1-2 2h-6Z"/></svg>
            </span>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="pl-12 bg-black/60 border border-cyan-500/30 focus:border-pink-400 text-white placeholder-cyan-300 rounded-full py-4 text-lg shadow-lg focus:ring-2 focus:ring-pink-400/30 transition-all"
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"/><path d="M7 12v7m0 0H3a2 2 0 0 1-2-2v-1a6 6 0 0 1 12 0v1a2 2 0 0 1-2 2h-6Z"/></svg>
            </span>
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              className="pl-12 bg-black/60 border border-pink-500/30 focus:border-cyan-400 text-white placeholder-pink-300 rounded-full py-4 text-lg shadow-lg focus:ring-2 focus:ring-cyan-400/30 transition-all"
            />
          </div>
          <select
            value={gender}
            onChange={e => setGender(e.target.value)}
            required
            className="bg-black/60 border border-cyan-500/30 focus:border-pink-400 text-white placeholder-cyan-300 w-full p-4 rounded-full shadow-lg focus:ring-2 focus:ring-pink-400/30 transition-all text-lg mb-2"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17v-2a4 4 0 1 1 8 0v2"/><rect width="20" height="12" x="2" y="7" rx="2"/><path d="M6 7V5a6 6 0 0 1 12 0v2"/></svg>
            </span>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="pl-12 bg-black/60 border border-cyan-500/30 focus:border-pink-400 text-white placeholder-cyan-300 rounded-full py-4 text-lg shadow-lg focus:ring-2 focus:ring-pink-400/30 transition-all"
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17v-2a4 4 0 1 1 8 0v2"/><rect width="20" height="12" x="2" y="7" rx="2"/><path d="M6 7V5a6 6 0 0 1 12 0v2"/></svg>
            </span>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="pl-12 bg-black/60 border border-pink-500/30 focus:border-cyan-400 text-white placeholder-pink-300 rounded-full py-4 text-lg shadow-lg focus:ring-2 focus:ring-cyan-400/30 transition-all"
            />
          </div>
          {error && <div className="text-pink-500 text-sm text-center font-semibold animate-pulse">{error}</div>}
          <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-extrabold py-4 rounded-full shadow-xl hover:scale-105 hover:from-pink-500 hover:to-cyan-500 transition-transform text-lg tracking-wider" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
            <p className="text-cyan-300 text-sm mt-8 text-center">
              Already have an account?{' '}
              <Link href="/login" className="text-pink-400 font-semibold hover:underline">Login</Link>
            </p>
          </>
        ) : (
          // OTP Verification Step
          <>
            <h2 className="text-3xl font-extrabold mb-8 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent text-center tracking-wider drop-shadow-lg">
              Verify Your Email
            </h2>
            <form className="space-y-5" onSubmit={handleVerifyOtp}>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2l4-4"/></svg>
                </span>
                <Input
                  type="text"
                  placeholder="Enter OTP sent to your email"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                  className="pl-12 bg-black/60 border border-cyan-500/30 focus:border-pink-400 text-white placeholder-cyan-300 rounded-full py-4 text-lg shadow-lg focus:ring-2 focus:ring-pink-400/30 transition-all"
                />
              </div>
              {error && <div className="text-pink-500 text-sm text-center font-semibold animate-pulse">{error}</div>}
              <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-extrabold py-4 rounded-full shadow-xl hover:scale-105 hover:from-pink-500 hover:to-cyan-500 transition-transform text-lg tracking-wider" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
