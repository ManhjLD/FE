const USERS_KEY = "vna.auth.users";
const SESSION_KEY = "vna.auth.session";
const VERSION_KEY = "vna.version"; // Track version for reset logic
const CURRENT_VERSION = "1.0"; // Increment when demo data changes

// Demo data lives in one file so it can be replaced with real API calls later.
const DEMO_USERS = [
  {
    user_id: "demo-user-001",
    name: "Demo User",
    email: "user@demo.com",
    phone: "0901000001",
    password: "123456",
    role: "user",
    MaCN: "",
  },
  {
    user_id: "demo-user-002",
    name: "Demo Branch",
    email: "branch@demo.com",
    phone: "0901000002",
    password: "123456",
    role: "staff",
    MaCN: "BR-001",
  },
  {
    user_id: "demo-user-003",
    name: "Demo Admin",
    email: "admin@demo.com",
    phone: "0901000003",
    password: "123456",
    role: "admin",
    MaCN: "HQ-001",
  },
];

// Demo data for Branch Management
export const DEMO_BRANCH_USERS = [
  {
    id: "br-user-001",
    fullName: "Nguyễn Văn A",
    email: "a@branch.com",
    phone: "0901111111",
    role: "staff",
    status: "active",
  },
  {
    id: "br-user-002",
    fullName: "Trần Thị B",
    email: "b@branch.com",
    phone: "0901111112",
    role: "staff",
    status: "active",
  },
  {
    id: "br-user-003",
    fullName: "Lê Văn C",
    email: "c@branch.com",
    phone: "0901111113",
    role: "staff",
    status: "active",
  },
];

export const DEMO_BRANCH_BOOKINGS = [
  {
    id: "BK001",
    departure: "HAN",
    arrival: "SGN",
    customerName: "Nguyễn Văn X",
    bookingDate: new Date(Date.now() - 86400000).toISOString(),
    amount: 1200000,
    status: "confirmed",
  },
  {
    id: "BK002",
    departure: "SGN",
    arrival: "PQC",
    customerName: "Trần Thị Y",
    bookingDate: new Date().toISOString(),
    amount: 2100000,
    status: "pending",
  },
  {
    id: "BK003",
    departure: "HAN",
    arrival: "DAD",
    customerName: "Lê Văn Z",
    bookingDate: new Date().toISOString(),
    amount: 850000,
    status: "confirmed",
  },
];

export const DEMO_BRANCH_REVENUE = {
  daily: {
    total: 4200000,
    bookingCount: 3,
  },
  monthly: {
    total: 128500000,
    bookingCount: 98,
  },
  summary: {
    totalRevenue: 1280500000,
    averageDailyRevenue: 42683333,
    totalBookings: 1024,
    routeCount: 8,
    newCustomersCount: 142,
    returnCustomerRate: 0.68,
    yearlyTotal: 1850000000,
    yearlyBookings: 1512,
  },
};

export const DEMO_BRANCH_DASHBOARD = {
  totalCustomers: 1245,
  todayTickets: 152,
  revenue: "320 triệu",
  totalFlights: 28,
  totalBookings: 4892,
  staffCount: 12,
};

// Demo data for Admin Management
export const DEMO_ADMIN_USERS = [
  {
    id: "admin-user-001",
    fullName: "Admin Tổng",
    email: "admin.general@airline.com",
    phone: "0905000001",
    role: "admin", // Updated to user role
    status: "active",
  },
  {
    id: "admin-user-003",
    fullName: "Nhân viên 1",
    email: "staff1@airline.com",
    phone: "0905000003",
    role: "staff",
    status: "active",
  },
  {
    id: "admin-user-004",
    fullName: "ngdung",
    email: "user@airline.com",
    phone: "0905000004",
    role: "user",
    status: "inactive",
  },
];

export const DEMO_ADMIN_FLIGHTS = [
  {
    id: "flight-001",
    code: "VN001",
    departure: "HAN",
    arrival: "SGN",
    departureTime: "08:00",
    duration: 120,
    price: 1200000,
    totalSeats: 180,
  },
  {
    id: "flight-002",
    code: "VN002",
    departure: "SGN",
    arrival: "DAD",
    departureTime: "14:30",
    duration: 60,
    price: 850000,
    totalSeats: 150,
  },
  {
    id: "flight-003",
    code: "VN003",
    departure: "HAN",
    arrival: "PQC",
    departureTime: "10:00",
    duration: 90,
    price: 950000,
    totalSeats: 120,
  },
];

export const DEMO_ADMIN_BRANCHES = [
  {
    id: "branch-001",
    code: "BR-001",
    name: "Chi nhánh Hà Nội",
    address: "123 Đường Lý Thường Kiệt",
    city: "Hà Nội",
    phone: "0243-9999-9999",
    email: "hanoi@airline.com",
  },
  {
    id: "branch-002",
    code: "BR-002",
    name: "Chi nhánh TP.HCM",
    address: "456 Nguyễn Hữu Cảnh",
    city: "TP.HCM",
    phone: "0283-8888-8888",
    email: "hcm@airline.com",
  },
  {
    id: "branch-003",
    code: "BR-003",
    name: "Chi nhánh Đà Nẵng",
    address: "789 Bạch Đằng",
    city: "Đà Nẵng",
    phone: "0236-7777-7777",
    email: "danang@airline.com",
  },
];

export const DEMO_ADMIN_DASHBOARD = {
  totalUsers: 25120,
  totalBranches: 18,
  totalAirports: 42,
  monthlyRevenue: "12 tỷ",
  totalFlights: 542,
  totalBookings: 48920,
};

export const DEMO_ADMIN_STATISTICS = {
  usersCount: 25120,
  branchesCount: 18,
  airportsCount: 42,
  monthlyRevenue: 12000000000,
  flightsCount: 542,
  bookingsCount: 48920,
};

export const DEMO_ADMIN_REPORTS = {
  revenue: [
    { branchName: "Hà Nội", totalRevenue: 4200000000, bookingCount: 3500 },
    { branchName: "TP.HCM", totalRevenue: 5100000000, bookingCount: 4200 },
    { branchName: "Đà Nẵng", totalRevenue: 2800000000, bookingCount: 2220 },
  ],
  users: {
    totalUsers: 25120,
    activeUsers: 23450,
    newUsers: 1250,
    adminCount: 45,
  },
  flights: {
    totalFlights: 542,
    todayFlights: 28,
    routeCount: 32,
    averageSeats: 165,
  },
  bookings: {
    totalBookings: 48920,
    confirmedBookings: 42350,
    pendingBookings: 4200,
    cancelledBookings: 2370,
  },
};

// Demo data for Airports
export const DEMO_AIRPORTS = [
  {
    id: "airport-001",
    code: "HAN",
    name: "Sân bay Quốc tế Nội Bài",
    city: "Hà Nội",
    country: "Việt Nam",
    status: "active",
  },
  {
    id: "airport-002",
    code: "SGN",
    name: "Sân bay Quốc tế Tân Sơn Nhất",
    city: "TP.HCM",
    country: "Việt Nam",
    status: "active",
  },
  {
    id: "airport-003",
    code: "DAD",
    name: "Sân bay Quốc tế Đà Nẵng",
    city: "Đà Nẵng",
    country: "Việt Nam",
    status: "active",
  },
  {
    id: "airport-004",
    code: "PQC",
    name: "Sân bay Quốc tế Phú Quốc",
    city: "Kiên Giang",
    country: "Việt Nam",
    status: "active",
  },
];

// Demo data for Aircrafts
export const DEMO_AIRCRAFTS = [
  {
    id: "aircraft-001",
    code: "B777-1",
    model: "Boeing 777",
    capacity: 300,
    manufacturer: "Boeing",
    status: "active",
    purchaseDate: "2015-03-15",
  },
  {
    id: "aircraft-002",
    code: "A320-1",
    model: "Airbus A320",
    capacity: 180,
    manufacturer: "Airbus",
    status: "active",
    purchaseDate: "2018-07-20",
  },
  {
    id: "aircraft-003",
    code: "A321-1",
    model: "Airbus A321",
    capacity: 220,
    manufacturer: "Airbus",
    status: "active",
    purchaseDate: "2019-11-10",
  },
];

// Demo data for Tickets
export const DEMO_TICKETS = [
  {
    id: "ticket-001",
    bookingId: "BK001",
    flightCode: "VN001",
    seatNumber: "1A",
    passengerName: "Nguyễn Văn X",
    price: 1200000,
    status: "issued",
    issueDate: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "ticket-002",
    bookingId: "BK002",
    flightCode: "VN002",
    seatNumber: "2B",
    passengerName: "Trần Thị Y",
    price: 2100000,
    status: "issued",
    issueDate: new Date().toISOString(),
  },
  {
    id: "ticket-003",
    bookingId: "BK003",
    flightCode: "VN001",
    seatNumber: "3C",
    passengerName: "Lê Văn Z",
    price: 850000,
    status: "issued",
    issueDate: new Date().toISOString(),
  },
];

// Demo data for Payments
export const DEMO_PAYMENTS = [
  {
    id: "payment-001",
    bookingId: "BK001",
    amount: 1200000,
    method: "credit_card",
    status: "completed",
    transactionId: "TXN001",
    paymentDate: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "payment-002",
    bookingId: "BK002",
    amount: 2100000,
    method: "bank_transfer",
    status: "pending",
    transactionId: "TXN002",
    paymentDate: new Date().toISOString(),
  },
  {
    id: "payment-003",
    bookingId: "BK003",
    amount: 850000,
    method: "credit_card",
    status: "completed",
    transactionId: "TXN003",
    paymentDate: new Date().toISOString(),
  },
];

// Demo data for Reports
export const DEMO_STAFF_REPORTS = {
  financial: {
    totalRevenue: 4200000000,
    totalPayments: 3980000000,
    completedTransactions: 3500,
    pendingTransactions: 150,
    failedTransactions: 28,
  },
  flights: {
    totalFlights: 542,
    onTimeFlights: 512,
    delayedFlights: 25,
    cancelledFlights: 5,
    totalPassengers: 98520,
  },
  sales: {
    totalBookings: 48920,
    soldTickets: 48500,
    revenue: 4200000000,
    averageTicketPrice: 86450,
  },
  customers: {
    totalCustomers: 25120,
    newCustomers: 1250,
    activeCustomers: 23450,
    loyalCustomers: 4500,
  },
};

function readJson(key, fallback) {
  const raw = localStorage.getItem(key);

  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function createUserId() {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createToken(userId) {
  return `local-token-${userId}`;
}

function publicUser(user) {
  if (!user) {
    return null;
  }

  const { password, ...safeUser } = user;
  return safeUser;
}

function ensureSeedUsers() {
  // Check version for reset logic
  const storedVersion = localStorage.getItem(VERSION_KEY);
  const users = readJson(USERS_KEY, []);

  // If version mismatch or no users, reset to demo
  if (storedVersion !== CURRENT_VERSION || users.length === 0) {
    console.log("🔄 Resetting demo users (version check)");
    writeJson(USERS_KEY, DEMO_USERS);
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    return DEMO_USERS;
  }

  return users;
}

function readUsers() {
  return ensureSeedUsers();
}

function writeUsers(users) {
  writeJson(USERS_KEY, users);
}

function readSession() {
  return readJson(SESSION_KEY, null);
}

function writeSession(session) {
  writeJson(SESSION_KEY, session);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function replaceStoredUser(updatedUser) {
  const users = readUsers();
  const nextUsers = users.map((user) =>
    user.user_id === updatedUser.user_id ? updatedUser : user,
  );

  writeUsers(nextUsers);
  writeSession({
    token: createToken(updatedUser.user_id),
    user: publicUser(updatedUser),
  });

  return publicUser(updatedUser);
}

export function getCurrentUser() {
    // Ensure only user, staff, and admin roles are returned
  return readSession()?.user ?? null;
}

export function loginLocalUser({ email, password }) {
  const users = readUsers();
  const normalizedInputEmail = normalizeEmail(email);

  console.log("🔐 Login attempt:");
  console.log("  Input email:", email, "→ normalized:", normalizedInputEmail);
  console.log("  Input password:", password);
  console.log(
    "  Available users:",
    users.map((u) => ({
      email: u.email,
      normalized: normalizeEmail(u.email),
      password: u.password,
    })),
  );

  const matchedUser = users.find(
    (user) =>
      normalizeEmail(user.email) === normalizedInputEmail &&
      user.password === password,
  );

  if (!matchedUser) {
    console.log("❌ Login failed - no matching user found");
    return {
      success: false,
      message: "Email hoặc mật khẩu không đúng.",
      data: null,
    };
  }

  console.log("✅ Login success - matched user:", matchedUser.email);
  const sessionUser = publicUser(matchedUser);
  const token = createToken(matchedUser.user_id);

  writeSession({ token, user: sessionUser });

  return {
    success: true,
    message: "Đăng nhập thành công.",
    data: { token, user: sessionUser },
  };
}

export function registerLocalUser(data) {
  const users = readUsers();
  const normalizedEmail = normalizeEmail(data.email);

  if (!data.name || !normalizedEmail || !data.password || !data.phone) {
    return {
      success: false,
      message: "Vui lòng nhập đầy đủ thông tin đăng ký.",
      data: null,
    };
  }

  if (users.some((user) => normalizeEmail(user.email) === normalizedEmail)) {
    return {
      success: false,
      message:
        "Email này đã được đăng ký trong hệ thống. Vui lòng sử dụng email khác hoặc đăng nhập.",
      data: null,
    };
  }

  const newUser = {
    user_id: createUserId(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    role: "user",
    MaCN: "",
  };

  writeUsers([...users, newUser]);

  return {
    success: true,
    message: "Đăng ký tài khoản thành công.",
    data: {
      user_id: newUser.user_id,
      email: newUser.email,
    },
  };
}

export function updateCurrentUser(data) {
  const session = readSession();

  if (!session?.user?.user_id) {
    return {
      success: false,
      message: "Chưa đăng nhập.",
      data: null,
    };
  }

  const users = readUsers();
  const currentUser = users.find(
    (user) => user.user_id === session.user.user_id,
  );

  if (!currentUser) {
    return {
      success: false,
      message: "Không tìm thấy tài khoản.",
      data: null,
    };
  }

  const normalizedEmail = normalizeEmail(data.email ?? currentUser.email);
  const emailTaken = users.some(
    (user) =>
      user.user_id !== currentUser.user_id &&
      normalizeEmail(user.email) === normalizedEmail,
  );

  if (emailTaken) {
    return {
      success: false,
      message: "Email đã tồn tại.",
      data: null,
    };
  }

  const updatedUser = {
    ...currentUser,
    name: data.name ?? currentUser.name,
    email: data.email ?? currentUser.email,
    phone: data.phone ?? currentUser.phone,
  };

  const nextUsers = users.map((user) =>
    user.user_id === updatedUser.user_id ? updatedUser : user,
  );

  writeUsers(nextUsers);
  writeSession({ token: session.token, user: publicUser(updatedUser) });

  return {
    success: true,
    message: "Thông tin tài khoản đã được cập nhật thành công.",
    data: publicUser(updatedUser),
  };
}

export function changeCurrentPassword(data) {
  const session = readSession();

  if (!session?.user?.user_id) {
    return {
      success: false,
      message: "Chưa đăng nhập.",
      data: null,
    };
  }

  const users = readUsers();
  const currentUser = users.find(
    (user) => user.user_id === session.user.user_id,
  );

  if (!currentUser) {
    return {
      success: false,
      message: "Không tìm thấy tài khoản.",
      data: null,
    };
  }

  if (currentUser.password !== data.currentPassword) {
    return {
      success: false,
      message: "Mật khẩu hiện tại không chính xác.",
      data: null,
    };
  }

  const updatedUser = {
    ...currentUser,
    password: data.newPassword,
  };

  const nextUsers = users.map((user) =>
    user.user_id === updatedUser.user_id ? updatedUser : user,
  );

  writeUsers(nextUsers);
  writeSession({ token: session.token, user: publicUser(updatedUser) });

  return {
    success: true,
    message: "Đổi mật khẩu thành công.",
    data: publicUser(updatedUser),
  };
}

export function logoutLocalUser() {
  clearSession();
}

export function getStoredToken() {
  return readSession()?.token ?? localStorage.getItem("token") ?? "";
}

/**
 * DEBUG FUNCTION - Reset demo data to defaults
 * Call this in browser console if login fails:
 * import { resetDemoData } from './services/authLocalStore.js'
 * resetDemoData()
 */
export function resetDemoData() {
  console.log("🔄 Resetting demo data to defaults...");
  localStorage.removeItem(VERSION_KEY);
  localStorage.removeItem(USERS_KEY);
  localStorage.removeItem(SESSION_KEY);
  ensureSeedUsers();
  console.log("✅ Demo data reset complete. Try logging in again.");
  console.log("Demo accounts:");
  console.log("  - user@demo.com / 123456");
  console.log("  - branch@demo.com / 123456");
  console.log("  - admin@demo.com / 123456");
}
