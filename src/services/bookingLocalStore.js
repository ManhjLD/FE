/**
 * Booking Local Store - Manages booking data flow from SeatBooking to Payment
 * Stores booking session data in localStorage
 * TODO: Replace with API calls when backend is ready
 */

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

    const ticketRecord = {
      ticket_id: `${booking.booking_id}-${Date.now()}`,
      booking_id: booking.booking_id,
      user_id: userId || booking.user_id,
      status: "paid",
      payment_status: "success",
      payment_method: payment.payment_method,
      payment_time: payment.payment_time,
      total_amount: booking.total_amount,
      from_code: booking.from_code,
      to_code: booking.to_code,
      departure_date: booking.departure_date,
      departure_time: booking.departure_time,
      departure_datetime:
        booking.departure_datetime ||
        buildDepartureDateTime(
          booking.departure_date,
          booking.departure_time,
        ) ||
        booking.booking_date,
      flight_duration: booking.flight_duration || booking.flightDuration || 0, // minutes
      arrival_datetime:
        booking.arrival_datetime ||
        addMinutesToIsoString(
          booking.departure_datetime ||
            buildDepartureDateTime(
              booking.departure_date,
              booking.departure_time,
            ) ||
            booking.booking_date,
          booking.flight_duration || booking.flightDuration || 0,
        ),
      booking_date: booking.booking_date,
      selected_seats: booking.selected_seats || [],
      passenger_name: booking.passengers?.[0]?.passenger_name || "",
      passenger_email: booking.passengerEmail || "",
      passenger_phone: booking.passengerPhone || "",
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

  return tickets.filter((ticket) => ticket.user_id === userId);
};

export const getTicketsByUser = (userId) => {
  const tickets = readJson(MY_TICKETS_KEY, []);
  if (!userId) {
    return [];
  }

  return tickets.filter((ticket) => ticket.user_id === userId);
};

export const cancelTicketById = ({ ticketId, userId }) => {
  try {
    const tickets = readJson(MY_TICKETS_KEY, []);
    const nextTickets = tickets.filter(
      (t) => !(t.ticket_id === ticketId && t.user_id === userId),
    );

    writeJson(MY_TICKETS_KEY, nextTickets);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Simulates API booking creation based on DB schema:
 * dbo.booking: booking_id, user_id, booking_date, status, MaCN
 * dbo.ticket: ticket_id, booking_id, flight_id, passenger_name, resident_id
 *
 * TODO: Replace with actual POST /api/bookings when backend ready
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
  branchCode = "CN01", // Default branch
  flightDuration = 0,
}) => {
  const bookingId = Math.floor(Math.random() * 1000000); // Simulate DB auto-increment

  const bookingData = {
    booking_id: bookingId,
    user_id: userId,
    flight_id: flightId,
    status: "pending", // pending, confirmed, cancelled
    booking_date: new Date().toISOString(),
    MaCN: branchCode,

    // Flight info
    from_code: fromCode,
    to_code: toCode,
    departure_date: departureDate,
    departure_time: departureTime,
    departure_datetime: buildDepartureDateTime(departureDate, departureTime),
    flight_duration: flightDuration,
    arrival_datetime: buildDepartureDateTime(departureDate, departureTime)
      ? addMinutesToIsoString(
          buildDepartureDateTime(departureDate, departureTime),
          flightDuration,
        )
      : null,

    // Seats & Passengers
    selected_seats: selectedSeats,
    passengers: passengers.map((p) => ({
      passenger_name: p.passengerName,
      resident_id: p.residentId,
    })),

    // Payment info
    total_amount: totalAmount,
    seat_price_per_seat: 500000,
    base_ticket_price: 2150000,
  };

  return bookingData;
};

/**
 * Simulates API payment creation based on DB schema:
 * dbo.payment: payment_id, booking_id, amount, payment_method, payment_status, payment_time
 *
 * TODO: Replace with actual POST /api/payments when backend ready
 */
export const createPaymentData = (
  bookingId,
  amount,
  paymentMethod = "qr_code",
) => {
  const paymentId = Math.floor(Math.random() * 1000000); // Simulate DB auto-increment

  const paymentData = {
    payment_id: paymentId,
    booking_id: bookingId,
    amount: amount,
    payment_method: paymentMethod, // qr_code, credit_card, bank_transfer
    payment_status: "pending", // pending, success, failed
    payment_time: new Date().toISOString(),
  };

  return paymentData;
};
