import api from "./api";

const extractMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

const buildSuccess = (message, data) => ({
  success: true,
  message,
  data,
});

const buildError = (message, data = null) => ({
  success: false,
  message,
  data,
});

const normalizeSessionUser = ({ loginData = {}, profileData = {}, email }) => ({
  token: loginData.token || "",
  role: loginData.role || profileData.role || "user",
  user_id: loginData.user_id || profileData.user_id || "",
  MaCN: loginData.MaCN || profileData.MaCN || "",
  name: profileData.name || loginData.name || "",
  phone: profileData.phone || loginData.phone || "",
  email: profileData.email || email || loginData.email || "",
});

export const loginApi = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    const loginData = response.data?.data || response.data || {};

    const profileResponse = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${loginData.token}`,
      },
    });

    const profileData =
      profileResponse.data?.data || profileResponse.data || {};
    const user = normalizeSessionUser({
      loginData,
      profileData,
      email: data.email,
    });

    return buildSuccess(response.data?.message || "Đăng nhập thành công.", {
      token: user.token,
      user,
    });
  } catch (error) {
    return buildError(
      extractMessage(error, "Email hoặc mật khẩu không chính xác."),
      null,
    );
  }
};

export const registerApi = async (data) => {
  try {
    const response = await api.post("/auth/register", data);
    return buildSuccess(
      response.data?.message || "Đăng ký tài khoản thành công.",
      response.data?.data || response.data || null,
    );
  } catch (error) {
    return buildError(
      extractMessage(
        error,
        "Email này đã được đăng ký trong hệ thống. Vui lòng sử dụng email khác hoặc đăng nhập.",
      ),
      null,
    );
  }
};

export const getCurrentUserApi = async (token) => {
  try {
    const response = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return buildSuccess(
      response.data?.message || "Lấy thông tin hồ sơ thành công.",
      response.data?.data || response.data || null,
    );
  } catch (error) {
    return buildError(extractMessage(error, "Không thể lấy thông tin hồ sơ."));
  }
};

export const updateCurrentUserApi = async (data, token) => {
  try {
    const response = await api.put("/users/me", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return buildSuccess(
      response.data?.message ||
        "Thông tin tài khoản và hồ sơ đã được cập nhật thành công.",
      response.data?.data || response.data || null,
    );
  } catch (error) {
    return buildError(extractMessage(error, "Cập nhật thất bại."));
  }
};
