/**
 * Booking Local Store - Demo mode for testing without backend
 * When USE_BACKEND_API = true, these functions won't be used
 *
 * API Fields (camelCase):
 * - bookingId, userId, maCn, bookingDate, status
 * - paymentMethod, paymentStatus, paymentTime, amount
 * - ticketId, flightId, passengerName, residentId
 */

import { USE_BACKEND_API } from "../config/apiConfig";

const BOOKING_SESSION_KEY = "bookingSession";
const MY_TICKETS_KEY = "vna.myTickets";

const readJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const buildDepartureDateTime = (departureDate, departureTime) => {
  if (!departureDate) {
    return null;
  }

  const safeTime = departureTime || "00:00";
  return new Date(`${departureDate}T${safeTime}:00`).toISOString();
};

const addMinutesToIsoString = (isoString, minutes) => {
  if (!isoString) return null;

  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return null;
  d.setMinutes(d.getMinutes() + Number(minutes || 0));
  return d.toISOString();
};

export const saveBookingSession = (bookingData) => {
  try {
    writeJson(BOOKING_SESSION_KEY, bookingData);
    return { success: true, data: bookingData };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getBookingSession = () => {
  try {
    return readJson(BOOKING_SESSION_KEY, null);
  } catch (error) {
    console.error("Error getting booking session:", error);
    return null;
  }
};

export const clearBookingSession = () => {
  try {
    localStorage.removeItem(BOOKING_SESSION_KEY);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const savePaidTicket = ({ booking, payment, userId }) => {
  try {
    const tickets = readJson(MY_TICKETS_KEY, []);

    // Align with API field names (camelCase)
    const ticketRecord = {
      ticketId: `${booking.bookingId || booking.booking_id}-${Date.now()}`,
      bookingId: booking.bookingId || booking.booking_id,
      userId: userId || booking.userId || booking.user_id,
      status: "paid",
      paymentStatus:
        payment.paymentStatus || payment.payment_status || "success",
      paymentMethod: payment.paymentMethod || payment.payment_method,
      paymentTime: payment.paymentTime || payment.payment_time,
      amount: booking.totalAmount || booking.total_amount,
      flightId: booking.flightId || booking.flight_id,

      // Flight route
      fromCode: booking.fromCode || booking.from_code,
      toCode: booking.toCode || booking.to_code,
      departureDate: booking.departureDate || booking.departure_date,
      departureTime: booking.departureTime || booking.departure_time,
      departureDatetime:
        booking.departureDatetime ||
        booking.departure_datetime ||
        buildDepartureDateTime(
          booking.departureDate || booking.departure_date,
          booking.departureTime || booking.departure_time,
        ) ||
        booking.bookingDate ||
        booking.booking_date,
      flightDuration: booking.flightDuration || booking.flight_duration || 0,
      arrivalDatetime:
        booking.arrivalDatetime ||
        booking.arrival_datetime ||
        addMinutesToIsoString(
          booking.departureDatetime ||
            booking.departure_datetime ||
            buildDepartureDateTime(
              booking.departureDate || booking.departure_date,
              booking.departureTime || booking.departure_time,
            ) ||
            booking.bookingDate ||
            booking.booking_date,
          booking.flightDuration || booking.flight_duration || 0,
        ),
      bookingDate: booking.bookingDate || booking.booking_date,

      // Passenger info
      selectedSeats: booking.selectedSeats || booking.selected_seats || [],
      passengerName:
        booking.passengers?.[0]?.passengerName ||
        booking.passengers?.[0]?.passenger_name ||
        "",
      residentId:
        booking.passengers?.[0]?.residentId ||
        booking.passengers?.[0]?.resident_id ||
        "",
      passengerEmail: booking.passengerEmail || "",
      passengerPhone: booking.passengerPhone || "",

      // Branch
      maCn: booking.maCn || booking.MaCN || "CN01",
    };

    writeJson(MY_TICKETS_KEY, [ticketRecord, ...tickets]);
    return { success: true, data: ticketRecord };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getPaidTicketsByUser = (userId) => {
  const tickets = readJson(MY_TICKETS_KEY, []);
  if (!userId) {
    return [];
  }

  return tickets.filter(
    (ticket) => ticket.userId === userId || ticket.user_id === userId,
  );
};

export const getTicketsByUser = (userId) => {
  const tickets = readJson(MY_TICKETS_KEY, []);
  if (!userId) {
    return [];
  }

  return tickets.filter(
    (ticket) => ticket.userId === userId || ticket.user_id === userId,
  );
};

export const cancelTicketById = ({ ticketId, userId }) => {
  try {
    const tickets = readJson(MY_TICKETS_KEY, []);
    const nextTickets = tickets.filter(
      (t) =>
        !(
          (t.ticketId === ticketId || t.ticket_id === ticketId) &&
          (t.userId === userId || t.user_id === userId)
        ),
    );

    writeJson(MY_TICKETS_KEY, nextTickets);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Simulates API booking creation (demo mode)
 * API: POST /api/bookings
 * Fields: bookingId, userId, maCn, bookingDate, status
 */
export const createBookingData = ({
  userId,
  flightId,
  fromCode,
  toCode,
  departureDate,
  departureTime,
  passengers = [],
  selectedSeats = [],
  totalAmount = 0,
  maCn = "CN01",
  flightDuration = 0,
}) => {
  const bookingId = Math.floor(Math.random() * 1000000);

  const bookingData = {
    bookingId: bookingId,
    userId: userId,
    flightId: flightId,
    status: "confirmed",
    bookingDate: new Date().toISOString(),
    maCn: maCn,

    // Flight info (camelCase)
    fromCode: fromCode,
    toCode: toCode,
    departureDate: departureDate,
    departureTime: departureTime,
    departureDatetime: buildDepartureDateTime(departureDate, departureTime),
    flightDuration: flightDuration,
    arrivalDatetime: buildDepartureDateTime(departureDate, departureTime)
      ? addMinutesToIsoString(
          buildDepartureDateTime(departureDate, departureTime),
          flightDuration,
        )
      : null,

    // Seats & Passengers (camelCase)
    selectedSeats: selectedSeats,
    passengers: passengers.map((p) => ({
      passengerName: p.passengerName,
      residentId: p.residentId,
    })),

    totalAmount: totalAmount,
  };

  return bookingData;
};

/**
 * Simulates API payment creation based on API spec:
 * API: POST /api/payments
 * Fields: paymentId, bookingId, amount, paymentMethod, paymentStatus, paymentTime
 */
export const createPaymentData = (
  bookingId,
  amount,
  paymentMethod = "card",
) => {
  const paymentId = Math.floor(Math.random() * 1000000);

  const paymentData = {
    paymentId: paymentId,
    bookingId: bookingId,
    amount: amount,
    paymentMethod: paymentMethod, // card, cash
    paymentStatus: "success", // success, failed
    paymentTime: new Date().toISOString(),
  };

  return paymentData;
};
