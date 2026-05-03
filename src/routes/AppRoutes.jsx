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

import BranchLayout from "../layouts/BranchLayout";
import BranchDashboard from "../pages/branch/Dashboard";
import BranchBookings from "../pages/branch/Bookings";
import BranchUsers from "../pages/branch/Users";
import BranchRevenue from "../pages/branch/Revenue";
import BranchTickets from "../pages/branch/Tickets";
import BranchPayments from "../pages/branch/Payments";

import HQLayout from "../layouts/HQLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import Flights from "../pages/admin/Flights";
import Branches from "../pages/admin/Branches";
import Users from "../pages/admin/Users";
import Reports from "../pages/admin/Reports";
import Airports from "../pages/admin/Airports";
import Aircrafts from "../pages/admin/Aircrafts";
import Tickets from "../pages/admin/Tickets";
import Payments from "../pages/admin/Payments";

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
            <PrivateRoute requiredRoles={["user"]}>
              <SeatBooking />
            </PrivateRoute>
          }
        />
        {/* <Router path="/bookings" element={<SeatBooking />} /> */}

        <Route
          path="/payment"
          element={
            <PrivateRoute requiredRoles={["user"]}>
              <Payment />
            </PrivateRoute>
          }
        />

        {/* <Router path="/payment" element={<Payment />} /> */}
        <Route
          path="/my-tickets"
          element={
            <PrivateRoute requiredRoles={["user"]}>
              <MyTickets />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute requiredRoles={["user"]}>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <PrivateRoute requiredRoles={["user"]}>
              <ProfileEdit />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/change-password"
          element={
            <PrivateRoute requiredRoles={["user"]}>
              <ChangePassword />
            </PrivateRoute>
          }
        />

        {/* Branch Routes */}
        <Route
          path="/branch"
          element={
            <PrivateRoute requiredRoles={["staff"]}>
              <BranchLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<BranchDashboard />} />
          <Route path="bookings" element={<BranchBookings />} />
          <Route path="users" element={<BranchUsers />} />
          <Route path="revenue" element={<BranchRevenue />} />
          <Route path="tickets" element={<BranchTickets />} />
          <Route path="payments" element={<BranchPayments />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRoles={["admin"]}>
              <HQLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="flights" element={<Flights />} />
          <Route path="branches" element={<Branches />} />
          <Route path="users" element={<Users />} />
          <Route path="reports" element={<Reports />} />
          <Route path="airports" element={<Airports />} />
          <Route path="aircrafts" element={<Aircrafts />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="payments" element={<Payments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
