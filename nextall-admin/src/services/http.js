import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', // Set your backend URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally add interceptors for auth token
// TODO: Replace this placeholder with your actual admin JWT for development
const ADMIN_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJTT01FX0FETUlOX0lEIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUxOTA5MzkxLCJleHAiOjE3NTI1MTQxOTF9.8eF-oeLj5yL4Vp0_47D2XKyggsaVSE4ZwtB5bMecoz0';
http.interceptors.request.use((config) => {
  // Always use the hardcoded admin JWT for all requests
  config.headers.Authorization = `Bearer ${ADMIN_JWT}`;
  return config;
});

export default http;