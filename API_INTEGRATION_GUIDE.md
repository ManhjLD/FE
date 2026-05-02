# API Integration Guide

## Mode Switch Configuration

Để toggle giữa Backend API và Local Demo Mode, chỉnh sửa file:

```
src/config/apiConfig.js
```

### Chế độ Demo (Local)

```javascript
export const USE_BACKEND_API = false; // ← Dùng localStorage để test
```

- Dữ liệu lưu trong localStorage
- Không gọi API backend
- Dùng `DEMO_FLIGHTS` trong SearchFlights.jsx
- Dùng `DEMO_BOOKINGS` trong bookingLocalStore.js

### Chế độ Backend

```javascript
export const USE_BACKEND_API = true; // ← Gọi thực API backend
```

- Gọi tất cả endpoints API
- Dữ liệu từ backend
- Services sẽ uncomment API calls

---

## API Field Mapping

Tất cả components đã được cập nhật để support cả:

- **camelCase** (API style): `bookingId`, `userId`, `paymentMethod`
- **snake_case** (local style): `booking_id`, `user_id`, `payment_method`

### Booking Fields

| API (camelCase) | Local (snake_case) | Notes                         |
| --------------- | ------------------ | ----------------------------- |
| bookingId       | booking_id         | Mã đơn đặt vé                 |
| userId          | user_id            | ID khách hàng                 |
| flightId        | flight_id          | ID chuyến bay                 |
| maCn            | MaCN               | Mã chi nhánh                  |
| bookingDate     | booking_date       | Ngày đặt                      |
| status          | status             | pending, confirmed, cancelled |
| totalAmount     | total_amount       | Tổng tiền                     |
| departureDate   | departure_date     | Ngày cất cánh                 |
| departureTime   | departure_time     | Giờ cất cánh                  |
| selectedSeats   | selected_seats     | Ghế đã chọn                   |

### Payment Fields

| API (camelCase) | Local (snake_case) |
| --------------- | ------------------ |
| paymentId       | payment_id         |
| bookingId       | booking_id         |
| paymentMethod   | payment_method     |
| paymentStatus   | payment_status     |
| paymentTime     | payment_time       |

### Ticket Fields

| API (camelCase) | Local (snake_case) |
| --------------- | ------------------ |
| ticketId        | ticket_id          |
| bookingId       | booking_id         |
| flightId        | flight_id          |
| passengerName   | passenger_name     |
| residentId      | resident_id        |

---

## Services Updated

### bookingService.js

- Thêm `USE_BACKEND_API` check
- Khi `false`: in log "[DEMO MODE]"
- Khi `true`: gọi API

```javascript
export const createBooking = (bookingData) => {
  if (!USE_BACKEND_API) {
    console.log("[DEMO MODE] POST /api/bookings", bookingData);
    return Promise.resolve({ success: false });
  }
  return api.post("/bookings", bookingData);
};
```

### paymentService.js, ticketService.js

- Tương tự với bookingService.js

### bookingLocalStore.js

- `createBookingData()`: trả về camelCase fields
- `createPaymentData()`: trả về camelCase fields
- `savePaidTicket()`: support cả camelCase + snake_case
- `getTicketsByUser()`: support cả field style

---

## Components Updated

### Payment.jsx

- ✅ Import `USE_BACKEND_API`, `createPayment`, `createBooking`
- ✅ paymentMethod default: `"card"` (thay vì `"qr_code"`)
- ✅ `handlePayment()` logic:
  - Nếu `USE_BACKEND_API = true`: gọi POST /api/bookings rồi POST /api/payments
  - Nếu `USE_BACKEND_API = false`: dùng local store
- ✅ Support cả camelCase + snake_case fields

### MyTickets.jsx

- ✅ Import `USE_BACKEND_API`
- ✅ `getDepartureDateTime()`: support camelCase + snake_case
- ✅ `getArrivalDateTime()`: support camelCase + snake_case
- ✅ `upcomingList.map()`: dùng variables có support field styles
- ✅ `completedList.map()`: dùng variables có support field styles

### SearchFlights.jsx

- ✅ DEMO_FLIGHTS mảng dữ liệu mẫu
- ✅ `filterDemoFlights()` lọc dữ liệu
- ✅ Mode toggle (demo vs API - đã có sẵn)

---

## Test Checklist

### Local Demo Mode (USE_BACKEND_API = false)

- [ ] SearchFlights: Chọn chi nhánh + ngày → hiển thị DEMO_FLIGHTS
- [ ] SeatBooking: Đặt chỗ → lưu session
- [ ] Payment: Thanh toán → lưu vé vào localStorage
- [ ] MyTickets: Hiển thị vé từ localStorage
  - [ ] Vé sắp bay (future flights)
  - [ ] Vé đã bay (past flights)
  - [ ] Hủy vé → update refresh key

### Backend API Mode (USE_BACKEND_API = true)

- [ ] Payment: Gọi POST /api/bookings + POST /api/payments
- [ ] MyTickets: Gọi GET /api/bookings/my khi cần
- [ ] Xem console logs để verify API calls

---

## Quick Start

1. **Set Mode**:

   ```javascript
   // src/config/apiConfig.js
   export const USE_BACKEND_API = false; // Thay thành true để dùng API
   ```

2. **Test Demo Mode**:

   ```
   SearchFlights → Chọn departure + arrival + date → Xem DEMO_FLIGHTS
   ```

3. **Switch to Backend**:
   ```javascript
   export const USE_BACKEND_API = true;
   ```
   Verify backend endpoints running on port mà api.js config

---

## Notes

- Tất cả comment `// ============ API MODE ============` giữ nguyên để dễ uncomment sau
- `[DEMO MODE]` logs in console khi ở local mode
- Components backward compatible - hỗ trợ cả format cũ lẫn mới
