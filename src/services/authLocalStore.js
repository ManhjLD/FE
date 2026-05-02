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
    role: "br_staff",
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
    password: data.password ?? currentUser.password,
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
