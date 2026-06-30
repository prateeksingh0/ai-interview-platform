import api from "../api/axios";

class AuthService {
  async register(data) {
    const response = await api.post("/auth/register", data);
    return response.data;
  }

  async login(data) {
    const response = await api.post("/auth/login", data);

    return response.data;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

export default new AuthService();