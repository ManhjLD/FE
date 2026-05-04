import { createContext, useContext, useState } from "react";
import { flushSync } from "react-dom";
import { USE_BACKEND_API } from "../config/apiConfig";
import {
  changeCurrentPassword as changeCurrentPasswordLocal,
  getCurrentUser as getCurrentUserLocal,
  loginLocalUser,
  logoutLocalUser,
  registerLocalUser,
  updateCurrentUser as updateCurrentUserLocal,
} from "../services/authLocalStore";
import {
  getCurrentUserApi,
  loginApi,
  registerApi,
  updateCurrentUserApi,
} from "../services/authService";

const AuthContext = createContext();

const SESSION_KEY = "vna.auth.session";

// const SESSION_KEY = "vna.auth.session";

const readStoredSessionUser = () => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw)?.user ?? null;
  } catch {
    return null;
  }
};

const writeStoredSession = ({ token, user }) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ token, user }));
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

const clearStoredSession = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    USE_BACKEND_API ? readStoredSessionUser() : getCurrentUserLocal(),
  );

  const persistUser = (nextUser) => {
    setUser(nextUser);
    const token = localStorage.getItem("token") || "";
    if (token) {
      writeStoredSession({ token, user: nextUser });
    } else {
      localStorage.setItem("user", JSON.stringify(nextUser));
    }
    return nextUser;
  };

  const login = async (email, password) => {
    // DEMO MODE: đổi sang `loginLocalUser({ email, password })` khi muốn chạy local.
    const result = USE_BACKEND_API
      ? await loginApi({ email, password })
      : loginLocalUser({ email, password });

    console.log("🔑 AuthContext.login - auth result:", result);

    if (!result.success) {
      return result;
    }

    flushSync(() => {
      if (USE_BACKEND_API) {
        writeStoredSession(result.data);
      } else {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.user));
      }
      setUser(result.data.user);
    });

    console.log("✅ AuthContext.login - state updated");
    console.log("✅ AuthContext.login - returning user:", result.data.user);
    console.log("✅ User role:", result.data.user?.role);
    console.log("✅ Full user object:", JSON.stringify(result.data.user, null, 2));
    if (USE_BACKEND_API) {
      writeStoredSession(result.data);
      persistUser(result.data.user);
    } else {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      persistUser(result.data.user);
    }

    return {
      success: true,
      user: result.data.user,
      message: result.message,
    };
  };

  const register = async (data) => {
    // DEMO MODE: đổi sang `registerLocalUser(data)` khi muốn chạy local.
    const result = USE_BACKEND_API
      ? await registerApi(data)
      : registerLocalUser(data);

    return result;
  };

  const updateUser = async (nextData) => {
    const token = localStorage.getItem("token") || "";
    // DEMO MODE: đổi sang `updateCurrentUserLocal(nextData)` khi muốn chạy local.
    const result = USE_BACKEND_API
      ? await updateCurrentUserApi(nextData, token)
      : updateCurrentUserLocal(nextData);

    if (!result.success) {
      return result;
    }

    const nextUser = {
      ...(user || {}),
      ...result.data,
    };

    persistUser(nextUser);

    return {
      ...result,
      user: nextUser,
    };
  };

  const changePassword = ({ currentPassword, newPassword }) => {
    // Hiện backend chưa có endpoint đổi mật khẩu trong spec bạn gửi,
    // nên chỗ này vẫn giữ demo local để không phá flow đang chạy.
    return changeCurrentPasswordLocal({ currentPassword, newPassword });
  };

  const logout = () => {
    setUser(null);
    if (USE_BACKEND_API) {
      clearStoredSession();
    } else {
      logoutLocalUser();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  const syncCurrentUser = async () => {
    // Demo local: đọc từ localStorage. Backend: gọi /api/users/me bằng token.
    if (!USE_BACKEND_API) {
      const nextUser = getCurrentUserLocal();
      setUser(nextUser);
      return nextUser;
    }

    const token = localStorage.getItem("token") || "";
    if (!token) {
      const nextUser = readStoredSessionUser();
      setUser(nextUser);
      return nextUser;
    }

    const result = await getCurrentUserApi(token);
    if (!result.success) {
      return readStoredSessionUser();
    }

    const nextUser = {
      ...(readStoredSessionUser() || {}),
      ...result.data,
    };

    persistUser(nextUser);
    return nextUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        register,
        updateUser,
        changePassword,
        syncCurrentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
