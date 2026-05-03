API_DETAIL

AUTH	Đăng nhập	Tất cả	user	Hệ thống định tuyến tới máy chủ tổng để kiểm tra mảnh thông tin xác thực. Hợp lệ trả về JWT.	POST /api/auth/login
	Đăng ký khách hàng	Public	user	Nhân bản: Ghi thông tin xác thực và thông tin hồ sơ vào máy chủ tổng.	POST /api/auth/register
	Xem hồ sơ cá nhân	Tất cả	user	Nhân bản: Trích xuất ID, định tuyến kết nối tới máy chủ tổng để truy vấn và trả về hồ sơ.	GET /api/users/me
	Khách tự sửa hồ sơ	User	user	Nhân bản: Định tuyến kết nối tới máy chủ tổng để thực hiện cập nhật trường Name, Phone.	PUT /api/users/me
	Danh sách người dùng	Staff/Admin	user	Nhân viên máy trạm lọc danh sách tại trạm ( những user đặt chuyến bay tại trạm ); Quản lý máy chủ tổng truy xuất toàn hệ thống.	GET /api/users
	Admin phân quyền	Admin	user	Nhân bản: Quản lý tại máy chủ tổng thực hiện lệnh cập nhật Role tại dữ lệu bảng user trong máy chủ tổng.	PUT /api/users/{id}/role
CATALOG	Tìm kiếm chuyến bay	Tất cả	flight	Nhân bản: Định tuyến trực tiếp vào máy trạm cục bộ để truy vấn dữ liệu nhanh chóng. ( Truy vấn theo 3 trường dữ liệu là điểm xuất phát, điểm đến và thời gian. Luôn phải có điểm xuất phát và điểm đến, thời gian chọn thêm thì sẽ được lọc thêm )	GET /api/flights
	Thêm chuyến bay	Admin	flight	Nhân bản: Thêm tại máy chủ tổng, dữ liệu tự động nhân bản đồng bộ xuống toàn bộ máy trạm.	POST /api/flights
	Sửa chuyến bay	Admin	flight	Nhân bản: Mọi cập nhật thực hiện tại máy chủ tổng sẽ được đồng bộ xuống các máy trạm.	PUT /api/flights/{id}
	Xóa chuyến bay	Admin	flight	Nhân bản: Lệnh xóa từ máy chủ tổng sẽ đồng bộ hóa để xóa bản ghi tại tất cả máy trạm.	DELETE /api/flights/{id}
	DS sân bay	Tất cả	airport	Nhân bản: Truy xuất dữ liệu danh mục sân bay trực tiếp từ máy trạm.	GET /api/airports
	Thêm sân bay	Admin	airport	Nhân bản: Ghi tại máy chủ tổng, đồng bộ dữ liệu tới các máy trạm.	POST /api/airports
	Sửa sân bay	Admin	airport	Nhân bản: Cập nhật thông tin tại máy chủ tổng và đồng bộ dữ liệu tới các máy trạm.	PUT /api/airports/{id}
	Xóa sân bay	Admin	airport	Nhân bản: Thực hiện xóa tại máy chủ tổng và đồng bộ lệnh xóa xuống máy trạm.	DELETE /api/airports/{id}
	DS máy bay	Staff/Admin	aircraft	Nhân bản: Đọc dữ liệu máy bay trực tiếp tại máy trạm nội bộ.	GET /api/aircrafts
	Thêm máy bay	Admin	aircraft	Nhân bản: Ghi tại máy chủ tổng, sau đó nhân bản xuống các máy trạm.	POST /api/aircrafts
	Sửa máy bay	Admin	aircraft	Nhân bản: Cập nhật tại máy chủ tổng và đồng bộ xuống hệ thống máy trạm.	PUT /api/aircrafts/{id}
	Xóa máy bay	Admin	aircraft	Nhân bản: Xóa tại máy chủ tổng và đồng bộ lệnh xóa xuống các máy trạm.	DELETE /api/aircrafts/{id}
	DS chi nhánh	Admin	branch	Nhân bản: Truy xuất thông tin chi nhánh trực tiếp tại máy trạm.	GET /api/branches
					
					
					
TRANS	Đặt vé mới	User	booking	Phân mảnh ngang: Định tuyến và ghi trực tiếp vào DB phân mảnh tại máy trạm của chi nhánh. Khi đặt vé sẽ phải thanh toán ngay lập tức	POST /api/bookings
	Lịch sử đặt vé	User	booking	Phân mảnh ngang: Truy vấn tại các máy trạm chi nhánh nơi người dùng đã thực hiện đặt vé để gom lịch sử.	GET /api/bookings/my
	DS đơn đặt vé	Staff/Admin	booking	Phân mảnh ngang: Staff xem tại máy trạm; Admin dùng Linked Server quét từ máy chủ tổng.	GET /api/bookings
	Chi tiết đơn đặt	Tất cả	booking	Phân mảnh dẫn xuất: Định tuyến tới đúng máy trạm để thực hiện Join cục bộ Booking-Ticket-Payment.	GET /api/bookings/{id}
	Hủy đơn	User	booking	Phân mảnh ngang: Định tuyến tới máy trạm tương ứng để cập nhật trạng thái đơn đặt.	PUT /api/bookings/{id}
	Xóa đơn đặt vé	Staff/Admin	booking	Phân mảnh ngang: Thực hiện xóa vật lý bản ghi trực tiếp tại máy trạm chi nhánh quản lý.	DELETE /api/bookings/{id}
	Thanh toán mới	User/Staff	payment	Phân mảnh dẫn xuất: Ghi bản ghi hóa đơn mới vào mảnh Payment tại máy trạm tương ứng đơn đặt.	POST /api/payments
					
					
	DS vé đã xuất	Staff/Admin	ticket	Phân mảnh dẫn xuất: Staff xem tại máy trạm; Admin dùng Master Server quét mảnh Ticket.	GET /api/tickets
	Thêm vé thủ công	Staff	ticket	Phân mảnh dẫn xuất: Ghi thông tin hành khách vào mảnh Ticket tại máy trạm chi nhánh.	POST /api/tickets
	Sửa thông tin vé	Staff	ticket	Phân mảnh dẫn xuất: Định tuyến tới máy trạm để cập nhật thông tin hành khách trên vé.	PUT /api/tickets/{id}
	Xóa vé	Staff	ticket	Phân mảnh dẫn xuất: Xóa vật lý bản ghi vé máy bay trực tiếp tại máy trạm chi nhánh quản lý.	DELETE /api/tickets/{id}
REPORT	Thống kê Tài chính	Admin/Staff	payment	Thống kê tổng bộ: Truy vấn qua Distributed View (dùng Linked Server) tại máy chủ Tổng. Thống kê từng trạm: Chuyển hướng kết nối và tính tổng doanh thu trực tiếp trên mảnh Payment tại DB cục bộ của trạm. Thống kê ra thông tin doanh tổng doanh thu ( của trạm và tổng cả ) cũng như thống kê theo tháng, quý	GET /api/reports/financial
	Thống kê Chuyến bay	Admin	flight	Tổng hợp: Gom dữ liệu chuyến bay và vé từ các mảnh tại máy chủ tổng để tính hiệu suất.	GET /api/reports/flights
	Thống kê Bán hàng	Admin/Staff	booking	Thống kê tổng bộ: Gom dữ liệu từ các mảnh Booking thông qua Distributed View tại máy chủ Tổng. Thống kê từng trạm: Chuyển hướng kết nối và đếm số lượng đơn/vé trực tiếp trên mảnh Booking tại DB cục bộ của trạm.(chỉ thống kê những vé đã thanh toán và không bị hủy)	GET /api/reports/sales
	DS Khách hàng	Admin	user	Tổng hợp: Lấy dữ liệu hồ sơ từ máy chủ tổng và số lượng giao dịch từ máy trạm.	GET /api/reports/customers
API_RESPONSE

====================
AUTH MODULE
====================

1) POST /api/auth/login
Request:
{
  "email": "...",
  "password": "..."
}
Success (200):
{
  "status": "success",
  "message": "Ðăng nhập thành công.",
  "data": {
    "token": "...",
    "role": "...",
    "user_id": 1
  }
}
Error (401):
{
  "status": "error",
  "message": "Email hoặc mật khẩu không chính xác.",
  "data": null
}

2) POST /api/auth/register
Request:
{
  "name": "...",
  "email": "...",
  "password": "...",
  "phone": "..."
}
Success (201):
{
  "status": "success",
  "message": "Ðăng ký tài khoản thành công.",
  "data": {
    "user_id": 2,
    "email": "..."
  }
}
Error (400 - duplicate email):
{
  "status": "error",
  "message": "Email này đã được đăng ký trong hệ thống.“
  "data": null
}

3) GET /api/users/me
Header: Authorization: Bearer <token>
Success (200):
{
  "status": "success",
  "message": "Lấy thông tin hồ sơ thành công.",
  "data": {
    "user_id": 1,
    "name": "...",
    "phone": "..."
  }
}
Error (401):
{
  "status": "error",
  "message": "Missing Authorization header.",
  "data": null
}

4) PUT /api/users/me
Header: Authorization: Bearer <token>
Request:
{
  "name": "...",
  "email": "...",
  "phone": "...",
  "password": "..."
}
Success (200):
{
  "status": "success",
  "message": "Cập nhật thành công.",
  "data": {
    "user_id": 1,
    "name": "...",
    "email": "...",
    "phone": "..."
  }
}
Error (400):
{
  "status": "error",
  "message": "Cập nhật thất bại.",
  "data": null
}

5) GET /api/users
Header: Authorization: Bearer <token>
Quyền: br_staff (hoặc admin)
Success (200):
{
  "status": "success",
  "message": "Lấy danh sách khách hàng tại chi nhánh thành công.",
  "data": [
    {
      "user_id": 10,
      "email": "a@x.com",
      "role": "customer"
    },
    {
      "user_id": 11,
      "email": "b@x.com",
      "role": "customer"
    }
  ]
}
Error (403):
{
  "status": "error",
  "message": "Không có quyền xem danh sách người dùng.",
  "data": null
}

6) POST /api/users
Header: Authorization: Bearer <token>
Quyền: br_staff
Request:
{
  "name": "...",
  "email": "...",
  "password": "...",
  "phone": "...",
  "role": "customer"
}
Success (201):
{
  "status": "success",
  "message": "Ðã tạo tài khoản người dùng mới thành công.",
  "data": {
    "user_id": 12,
    "email": "...",
    "role": "customer"
  }
}
Error (400):
{
  "status": "error",
  "message": "Tài khoản đã tồn tại.",
  "data": null
}

7) PUT /api/users/{id}
Header: Authorization: Bearer <token>
Quyền: br_staff
Request:
{
  "name": "...",
  "email": "...",
  "phone": "...",
  "password": "...",
  "role": "..."
}
Success (200):
{
  "status": "success",
  "message": "Cập nhật thành công.",
  "data": {
    "user_id": 12,
    "name": "...",
    "email": "...",
    "phone": "...",
    "role": "..."
  }
}
Error (400):
{
  "status": "error",
  "message": "Không thể cập nhật",
  "data": null
}

8) DELETE /api/users/{id}
Header: Authorization: Bearer <token>
Quyền: br_staff
Success (200):
{
  "status": "success",
  "message": "Xóa tài khoản người dùng thành công.",
  "data": null
}
Error (400):
{
  "status": "error",
  "message": "Không thể xóa tài khoản.“
  "data": null
}


9) PUT /api/users/{id}/role
Header: Authorization: Bearer <token>
Quyền: admin
Request:
{
  "role": "br_staff"
}
Success (200):
{
  "status": "success",
  "message": "Cập nhật thành công.",
  "data": {
    "user_id": 12,
    "role": "br_staff"
  }
}
Error (403):
{
  "status": "error",
  "message": "Chỉ admin được phân quyền.",
  "data": null
}


Tìm chuyến bay (/api/flights )
Request
Quyền hạn: Tất cả
GET /api/flights

Response
HTTP Status: 200 OK
{
  "status": "success",
  "message": "Lấy danh sách chuyến bay thành công.",
  "data": [
    {
      "flight_id": "...",
      "flight_code": "...",
      "departure_airport": "...",
      "arrival_airport": "...",
      "aircraft_id": "..."
    }
  ]
}

Thêm chuyến bay (/api/flights)
Request
Quyền hạn: Admin 
Headers:
Authorization: Bearer <token>
Content-Type: application/json 
{
  "MaCN": "...",
  "aircraft_id": "...",
  "departure_airport": "...",
  "arrival_airport": "...",
  "departure_time": "...",
  "arrival_time": "...",
  "base_price": "..."
}
Response
TH1: Thành công (HTTP Status: 201 Created)
{
  "status": "success",
  "message": "Thêm chuyến bay thành công.",
  "data": {
    "flight_id": "...",
    "MaCN": "...",
    "aircraft_id": "...",
    "departure_airport": "...",
    "arrival_airport": "...",
    "departure_time": "...",
    "arrival_time": "...",
    "base_price": "..."
  }
}

TH2: Thất bại (HTTP Status: 404 Bad Request)
{
  "status": "error",
  "message": "Không thể thêm chuyến bay.",
  "data": null
}
Sửa chuyến bay (/api/flights/{id})
Request
Quyền hạn: Admin 
Headers:
Authorization: Bearer <token>
Content-Type: application/json 
{
  "MaCN": "...",
  "aircraft_id": "...",
  "departure_airport": "...",
  "arrival_airport": "...",
  "departure_time": "...",
  "arrival_time": "...",
  "base_price": "..."
}

Response

TH1: Thành công (HTTP Status: 200 OK)
{
  "status": "success",
  "message": "Cập nhật chuyến bay thành công.",
  "data": {
    "flight_id": "...",
    "MaCN": "...",
    "aircraft_id": "...",
    "departure_airport": "...",
    "arrival_airport": "...",
    "departure_time": "...",
    "arrival_time": "...",
    "base_price": "..."
  }
}

TH2: Thất bại (HTTP Status: 400 Bad Request)
{
  "status": "error",
  "message": "Không thể cập nhật chuyến bay.",
  "data": null
}
Xóa chuyến bay (/api/flights/{id})
Request
Quyền hạn: Admin
Headers:
Authorization: Bearer <token> 
Response
TH1: Thành công (HTTP Status: 200 OK) 
{
  "status": "success",
  "message": "Xóa chuyến bay thành công.",
  "data": null
}
TH2: Thất bại (HTTP Status: 400 Bad Request)
{
  "status": "error",
  "message": "Không thể xóa chuyến bay.",
  "data": null
}

Xem danh sách sân bay.
Request
Response
HTTP Status: 200 OK
{
  "status": "success",
  "message": "Lấy danh sách sân bay thành công.",
  "data": [
    {
      "airport_id": "...",
      "name": "...",
      "city": "..."
    }
  ]
}

Thêm sân bay mới.
Request
Quyền hạn: Admin
Headers:
Authorization: Bearer <token>
Content-Type: application/json 
{
  "name": "...",
  "city": "..."
}
Response
TH1: Thành công (HTTP Status: 201 Created)
{
  "status": "success",
  "message": "Thêm sân bay thành công.",
  "data": {
    "airport_id": "...",
    "name": "...",
    "city": "..."
  }
}
TH2: Thất bại (HTTP Status: 400 Bad Request) 
{
  "status": "error",
  "message": "Không thể thêm sân bay.",
  "data": null
}

Sửa thông tin sân bay.
Request

Xóa sân bay.
Xem danh sách máy bay.
Thêm máy bay mới.
Sửa thông tin máy bay.
Xóa máy bay.
Xem danh sách chi nhánh.
Thêm chi nhánh mới.
Sửa thông tin chi nhánh.
Xóa chi nhánh.

====================
TRANS MODULE
====================

1) POST /api/bookings
Header: Authorization: Bearer <token>
Request:
{
  "maCn": "CN01",
  "flightId": 2001,
  "passengerName": "...",
  "residentId": "...",
  "amount": 1500000,
  "paymentMethod": "card"
}
Success (200):
{
  "status": "success",
  "message": "Tạo đơn đặt vé thành công.",
  "data": {
    "bookingId": 501,
    "userId": 1,
    "maCn": "CN01",
    "bookingDate": "2026-05-02T13:00:00",
    "status": "confirmed"
  }
}
Error (400/403):
{
  "status": "error",
  "message": "...",
  "data": null
}

2) GET /api/bookings/my
Header: Authorization: Bearer <token>
Success (200):
{
  "status": "success",
  "message": "Lấy lịch sử đạt vé thành công.",
  "data": [
    {
      "bookingId": 501,
      "userId": 1,
      "maCn": "CN01",
      "bookingDate": "2026-05-02T13:00:00",
      "status": "confirmed"
    }
  ]
}

3) GET /api/bookings
Header: Authorization: Bearer <token>
Header thêm (nếu br_staff): MaCN: CN01
Success (200):
{
  "status": "success",
  "message": "Lấy danh sách đơn đặt vé thành công.",
  "data": [ ... ]
}

4) GET /api/bookings/{id}
Header: Authorization: Bearer <token>
Header: MaCN: CN01
Success (200):
{
  "status": "success",
  "message": "Lấy chi tiết đơn đặt vé thành công.",
  "data": {
    "bookingId": 501,
    "userId": 1,
    "maCn": "CN01",
    "bookingDate": "2026-05-02T13:00:00",
    "status": "confirmed",
    "payment": {
      "paymentId": 900,
      "bookingId": 501,
      "amount": 1500000,
      "paymentMethod": "card",
      "paymentStatus": "success",
      "paymentTime": "2026-05-02T13:00:05"
    },
    "tickets": [
      {
        "ticketId": 700,
        "bookingId": 501,
        "flightId": 2001,
        "passengerName": "...",
        "residentId": "..."
      }
    ],
    "totalTickets": 1
  }
}

5) PUT /api/bookings/{id}
Header: Authorization: Bearer <token>
Header: MaCN: CN01
Success (200):
{
  "status": "success",
  "message": "Hủy đơn đặt vé thành công.",
  "data": {
    "bookingId": 501,
    "userId": 1,
    "maCn": "CN01",
    "bookingDate": "2026-05-02T13:00:00",
    "status": "cancelled"
  }
}

6) DELETE /api/bookings/{id}
Header: Authorization: Bearer <token>
Header: MaCN: CN01
Success (200):
{
  "status": "success",
  "message": "Xóa đơn đặt vé thành công.",
  "data": null
}

7) POST /api/payments
Header: Authorization: Bearer <token>
Request:
{
  "maCn": "CN01",
  "bookingId": 502,
  "amount": 1800000,
  "paymentMethod": "cash",
  "paymentStatus": "success"
}
Success (200):
{
  "status": "success",
  "message": "Tạo thanh toán thành công.",
  "data": {
    "paymentId": 901,
    "bookingId": 502,
    "amount": 1800000,
    "paymentMethod": "cash",
    "paymentStatus": "success",
    "paymentTime": "2026-05-02T13:20:00"
  }
}

8) GET /api/tickets
Header: Authorization: Bearer <token>
Header them (neu br_staff): MaCN: CN01
Success (200):
{
  "status": "success",
  "message": "Lấy danh sách vé thành công.",
  "data": [
    {
      "ticketId": 700,
      "bookingId": 501,
      "flightId": 2001,
      "passengerName": "...",
      "residentId": "..."
    }
  ]
}

9) POST /api/tickets
Header: Authorization: Bearer <token>
Request:
{
  "maCn": "CN01",
  "bookingId": 501,
  "flightId": 2001,
  "passengerName": "...",
  "residentId": "..."
}
Success (200):
{
  "status": "success",
  "message": "Thêm vé thành công.",
  "data": {
    "ticketId": 701,
    "bookingId": 501,
    "flightId": 2001,
    "passengerName": "...",
    "residentId": "..."
  }
}

10) PUT /api/tickets/{id}
Header: Authorization: Bearer <token>
Header: MaCN: CN01
Request:
{
  "flightId": 2002,
  "passengerName": "...",
  "residentId": "..."
}
Success (200):
{
  "status": "success",
  "message": "Cập nhật vé thành công.",
  "data": {
    "ticketId": 701,
    "bookingId": 501,
    "flightId": 2002,
    "passengerName": "...",
    "residentId": "..."
  }
}

11) DELETE /api/tickets/{id}
Header: Authorization: Bearer <token>
Header: MaCN: CN01
Success (200):
{
  "status": "success",
  "message": "Xóa vé thành công.",
  "data": null
}


