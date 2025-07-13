"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
   
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          isAdmin // Send admin flag to backend
        }),
      });
     
      const data = await res.json();
     
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user data
      if (data.token) {
        localStorage.setItem('token', data.token);
        if (data.user?.role) {
          localStorage.setItem('userRole', data.user.role);
        }
      }

      // Redirect based on user role
      if (isAdmin) {
        if (data.user?.role === 'admin' || data.user?.role === 'super admin') {
          // Redirect to admin panel
          window.location.href = "http://localhost:3000";
          return; // Stop further execution
        } else {
          throw new Error("You don't have admin privileges");
        }
      } else {
        // Regular user redirect
        window.location.href = "/";
      }
     
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
      // Clear any stored data on error
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="backdrop-blur-xl bg-black/60 border border-white/10 shadow-2xl rounded-3xl max-w-md w-full p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-gradient-to-tr from-pink-500/20 via-cyan-400/20 to-transparent w-full h-full blur-2xl opacity-70 animate-pulse" />
        </div>
        <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent text-center tracking-wider drop-shadow-lg">
          {isAdmin ? "Admin Login" : "Welcome Back"}
        </h2>
        <form className="space-y-6" onSubmit={handleLogin}>
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
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17v-2a4 4 0 1 1 8 0v2"/><rect width="20" height="12" x="2" y="7" rx="2"/><path d="M6 7V5a6 6 0 0 1 12 0v2"/></svg>
            </span>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="pl-12 bg-black/60 border border-pink-500/30 focus:border-cyan-400 text-white placeholder-pink-300 rounded-full py-4 text-lg shadow-lg focus:ring-2 focus:ring-cyan-400/30 transition-all"
            />
          </div>
          {/* Admin/User toggle button below password input */}
          <div className="mt-2 flex justify-start">
            {isAdmin ? (
              <Button
                variant="outline"
                className="text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all font-bold px-6 py-2 rounded-full shadow-lg"
                onClick={() => setIsAdmin(false)}
                type="button"
              >
                User
              </Button>
            ) : (
              <Button
                variant="outline"
                className="text-pink-400 border-pink-400 hover:bg-pink-400 hover:text-black transition-all font-bold px-6 py-2 rounded-full shadow-lg"
                onClick={() => setIsAdmin(true)}
                type="button"
              >
                Admin
              </Button>
            )}
          </div>
          {error && <div className="text-pink-500 text-sm text-center font-semibold animate-pulse">{error}</div>}
          <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-extrabold py-4 rounded-full shadow-xl hover:scale-105 hover:from-cyan-500 hover:to-pink-500 transition-transform text-lg tracking-wider" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="text-cyan-300 text-sm mt-8 text-center">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-pink-400 font-semibold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
