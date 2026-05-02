import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Home from "../pages/user/Home";
import MyTickets from "../pages/user/MyTickets";
import Payment from "../pages/user/Payment";
import Profile from "../pages/user/Profile";
import ProfileEdit from "../pages/user/ProfileEdit";
import SeatBooking from "../pages/user/SeatBooking";

import PrivateRoute from "../guards/PrivateRoute";

import BranchDashboard from "../pages/branch/Dashboard";
import Revenue from "../pages/branch/Revenue";

import AdminDashboard from "../pages/admin/Dashboard";
import Flights from "../pages/admin/Flights";

/**
 * DEMO ACCOUNTS (use to test protected routes):
 * - user@demo.com / 123456
 * - branch@demo.com / 123456
 * - admin@demo.com / 123456
 */

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User Routes - Requires Login */}
        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <SeatBooking />
            </PrivateRoute>
          }
        />
        {/* <Router path="/bookings" element={<SeatBooking />} /> */}

        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />

        {/* <Router path="/payment" element={<Payment />} /> */}
        <Route
          path="/my-tickets"
          element={
            <PrivateRoute>
              <MyTickets />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <ProfileEdit />
            </PrivateRoute>
          }
        />

        {/* Branch Routes */}
        <Route
          path="/branch"
          element={
            <PrivateRoute>
              <BranchDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/branch/revenue"
          element={
            <PrivateRoute>
              <Revenue />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/flights"
          element={
            <PrivateRoute>
              <Flights />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
