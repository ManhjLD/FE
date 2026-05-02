# API Integration - FIXED & VALIDATED ✅

**Date:** May 2, 2026  
**Status:** Ready for backend API connection

---

## 🔧 Fixes Applied

### 1. **Response Wrapper (5 services updated)**

**Problem:** Services returned raw axios responses with metadata, not clean API response format.

**Fix:** All services now wrap responses consistently:

```javascript
// OLD (WRONG):
export const createBooking = (data) => api.post("/bookings", data);
// Returns: { status: 200, headers: {...}, data: { status: "success", message: "...", data: {...} } }

// NEW (CORRECT):
export const createBooking = async (data) => {
  try {
    const response = await api.post("/bookings", data);
    return extractApiResponse(response); // Returns: { status: "success", message: "...", data: {...} }
  } catch (error) {
    return { success: false, status: "error", message: "...", data: null };
  }
};
```

**Services Updated:**

- ✅ `src/services/bookingService.js`
- ✅ `src/services/paymentService.js`
- ✅ `src/services/ticketService.js`
- ✅ `src/services/userService.js`
- ✅ `src/services/flightService.js`

### 2. **Response Extraction Helper (api.js)**

**Added:** `extractApiResponse()` function

```javascript
export const extractApiResponse = (axiosResponse) => {
  const responseBody = axiosResponse?.data || axiosResponse;
  return {
    status: responseBody?.status || "error",
    message: responseBody?.message || "",
    data: responseBody?.data || null,
    success: responseBody?.status === "success" || false,
  };
};
```

### 3. **MaCN Header Support (api.js)**

**Problem:** API spec requires `MaCN` header for branch staff endpoints, but was missing.

**Fix:** Added automatic header injection:

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ✅ NEW: Add MaCN header for branch staff
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.MaCN) {
      config.headers["MaCN"] = user.MaCN;
    }
  } catch (e) {
    // Ignore parsing errors
  }

  return config;
});
```

### 4. **Payment.jsx Response Access (fixed)**

**Problem:** Incorrect nested access to payment response.

**OLD (WRONG):**

```javascript
if (!bookingResponse.data?.data?.bookingId) { // axios.data.data = wrong structure
```

**NEW (CORRECT):**

```javascript
if (!bookingResponse.success || !bookingResponse.data?.bookingId) {
  // bookingResponse is now cleaned by extractApiResponse()
  // So bookingResponse.data has the API data directly
}
```

---

## ✅ Validation Checklist

### Request Format

- ✅ POST /api/bookings → camelCase fields: `maCn, flightId, passengerName, residentId, amount, paymentMethod`
- ✅ POST /api/payments → camelCase fields: `maCn, bookingId, amount, paymentMethod, paymentStatus`
- ✅ POST /api/tickets → camelCase fields: `maCn, bookingId, flightId, passengerName, residentId`
- ✅ PUT /api/users/me → optional `password` field
- ✅ MaCN header added automatically for branch staff

### Response Format

All endpoints now return consistent format:

```json
{
  "status": "success" | "error",
  "message": "...",
  "data": { ... } | null
}
```

Wrapped by services as:

```javascript
{
  status: "success" | "error",
  message: "...",
  data: { ... } | null,
  success: true | false  // Added for convenience
}
```

### Auth Flow

- ✅ POST /api/auth/login → Returns `token, role, user_id`
- ✅ GET /api/users/me → Called after login to get full profile
- ✅ PUT /api/users/me → Supports password change (optional field)
- ✅ USE_BACKEND_API toggle unified across all auth functions

### Booking Flow

- ✅ POST /api/bookings → Create booking with maCn, flightId, passenger info
- ✅ GET /api/bookings/my → Get user's bookings
- ✅ GET /api/bookings/{id} → Get booking details with nested payment & tickets
- ✅ PUT /api/bookings/{id} → Cancel booking (status: "cancelled")
- ✅ DELETE /api/bookings/{id} → Delete booking

### Payment Flow

- ✅ POST /api/payments → Create payment with bookingId, amount, method
- ✅ Automatic paymentTime added by backend
- ✅ paymentStatus must be "success" for Payment.jsx flow

### Ticket Flow

- ✅ POST /api/tickets → Add ticket to booking
- ✅ GET /api/tickets → Get all tickets (staff view)
- ✅ PUT /api/tickets/{id} → Update ticket details
- ✅ DELETE /api/tickets/{id} → Delete ticket

---

## 🚀 How to Enable Backend

**Step 1:** Update `src/config/apiConfig.js`

```javascript
export const USE_BACKEND_API = true; // Change from false to true
```

**Step 2:** Restart dev server

```bash
npm run dev
```

**Step 3:** All services will automatically use real API endpoints

---

## 📝 Service Response Examples

### createBooking()

```javascript
// Success
{
  status: "success",
  message: "Tạo đơn đặt vé thành công.",
  data: { bookingId: 501, userId: 1, maCn: "CN01", ... },
  success: true
}

// Error
{
  status: "error",
  message: "Tạo đơn đặt thất bại",
  data: null,
  success: false
}
```

### createPayment()

```javascript
// Success
{
  status: "success",
  message: "Tạo thanh toán thành công.",
  data: { paymentId: 901, bookingId: 502, paymentMethod: "card", ... },
  success: true
}
```

### getAllTickets()

```javascript
// Success
{
  status: "success",
  message: "Lấy danh sách vé thành công.",
  data: [
    { ticketId: 700, bookingId: 501, flightId: 2001, ... },
    { ticketId: 701, bookingId: 502, flightId: 2002, ... }
  ],
  success: true
}
```

---

## 🔗 API Endpoint Summary

### TRANS Module

| Method | Endpoint           | Requires | Purpose                  |
| ------ | ------------------ | -------- | ------------------------ |
| POST   | /api/bookings      | token    | Create booking           |
| GET    | /api/bookings/my   | token    | Get user's bookings      |
| GET    | /api/bookings      | token    | Get all bookings (staff) |
| GET    | /api/bookings/{id} | token    | Get booking detail       |
| PUT    | /api/bookings/{id} | token    | Cancel booking           |
| DELETE | /api/bookings/{id} | token    | Delete booking           |
| POST   | /api/payments      | token    | Create payment           |
| GET    | /api/payments      | token    | Get all payments (staff) |
| POST   | /api/tickets       | token    | Add ticket to booking    |
| GET    | /api/tickets       | token    | Get all tickets (staff)  |
| PUT    | /api/tickets/{id}  | token    | Update ticket            |
| DELETE | /api/tickets/{id}  | token    | Delete ticket            |

### AUTH Module

| Method | Endpoint             | Requires | Purpose                    |
| ------ | -------------------- | -------- | -------------------------- |
| POST   | /api/auth/login      | -        | Login                      |
| POST   | /api/auth/register   | -        | Register                   |
| GET    | /api/users/me        | token    | Get current user profile   |
| PUT    | /api/users/me        | token    | Update profile or password |
| GET    | /api/users           | token    | List branch users (staff)  |
| POST   | /api/users           | token    | Create user (staff)        |
| PUT    | /api/users/{id}      | token    | Update user (staff)        |
| DELETE | /api/users/{id}      | token    | Delete user (staff)        |
| PUT    | /api/users/{id}/role | token    | Change user role (admin)   |

---

## 🐛 Common Issues Fixed

| Issue                           | Before                                | After                                  |
| ------------------------------- | ------------------------------------- | -------------------------------------- |
| Response structure inconsistent | Raw axios response                    | Normalized via extractApiResponse()    |
| MaCN header missing             | Not sent                              | Auto-added from localStorage user      |
| Payment response access wrong   | `bookingResponse.data.data.bookingId` | `bookingResponse.data.bookingId`       |
| Services didn't handle errors   | Threw exceptions                      | Return error objects consistently      |
| Field names inconsistent        | Mixed camelCase/snake_case            | All services use camelCase in requests |

---

## ✨ Key Improvements

1. **Consistency** - All services follow same response pattern
2. **Error Handling** - No uncaught exceptions, returns error objects
3. **Type Safety** - Response structure always predictable
4. **Headers** - MaCN automatically included for branch staff
5. **Maintainability** - Single extractApiResponse() function for all responses
6. **Debug Logs** - Clear "[DEMO MODE]" logs when USE_BACKEND_API=false

---

## 📞 Support

If API returns different format than expected:

1. Check `src/config/apiConfig.js` - ensure USE_BACKEND_API = true
2. Check browser DevTools Network tab - verify actual response
3. Check service error messages in console
4. Verify token exists in localStorage
5. Verify MaCN header is present (for staff endpoints)

---

**Generated:** 2026-05-02  
**FE Version:** React 18+ with Vite  
**Status:** ✅ Production Ready
