import { BrowserRouter, Routes, Route } from "react-router-dom";



import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Home from "../pages/user/Home";
import MyTickets from "../pages/user/MyTickets";
import Payment from "../pages/user/Payment";
import Profile from "../pages/user/Profile";

import BranchDashboard from "../pages/branch/Dashboard";
import Revenue from "../pages/branch/Revenue";

import AdminDashboard from "../pages/admin/Dashboard";
import Flights from "../pages/admin/Flights";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/branch" element={<BranchDashboard />} />
        <Route path="/branch/revenue" element={<Revenue />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/flights" element={<Flights />} />
      </Routes>
    </BrowserRouter>
  );
}