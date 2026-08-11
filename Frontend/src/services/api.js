import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// ==========================================
// REFRESH TOKEN CONTROL
// ==========================================

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Only handle 401
    if (
      error.response?.status !== 401 ||
      originalRequest?._retry
    ) {
      return Promise.reject(error);
    }

    // ==========================================
    // DO NOT AUTO REFRESH AUTH ROUTES
    // AuthContext handles /me and refresh manually.
    // ==========================================

    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/me") ||
      originalRequest.url?.includes("/auth/refresh-token") ||
      originalRequest.url?.includes("/auth/logout")
    ) {
      return Promise.reject(error);
    }

    // ==========================================
    // MARK REQUEST AS RETRIED
    // ==========================================

    originalRequest._retry = true;

    // ==========================================
    // IF REFRESH IS ALREADY RUNNING
    // ==========================================

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => {
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    // ==========================================
    // START REFRESH
    // ==========================================

    isRefreshing = true;

    try {
      await api.post("/auth/refresh-token");

      // Refresh successful
      processQueue(null);

      // Retry original request
      return api(originalRequest);

    } catch (refreshError) {
      // Refresh failed
      processQueue(refreshError);

      return Promise.reject(refreshError);

    } finally {
      isRefreshing = false;
    }
  }
);

export default api;