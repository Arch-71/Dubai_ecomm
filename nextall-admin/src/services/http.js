import axios from 'axios';

// Create an axios instance
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the JWT token to every request if present
http.interceptors.request.use((config) => {
  // Try to get the token from localStorage (preferred)
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  // Fallback to hardcoded token if needed (for testing)
  if (!token) {
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJTT01FX0FETUlOX0lEIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUyMjMxODc4LCJleHAiOjE3NTI4MzY2Nzh9.mjPiFeidencitC5jb-UQil5TMDZExtf59PBp5MRhjfc";
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;