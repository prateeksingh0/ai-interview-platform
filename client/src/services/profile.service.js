import api from "../api/axios";

class ProfileService {
  async getProfile() {
    const response = await api.get("/profile");

    return response.data;
  }

  async updateProfile(data) {
    const response = await api.put(
      "/profile",
      data
    );

    return response.data;
  }

  async deleteResume() {
    const response = await api.delete(
      "/profile/resume"
    );

    return response.data;
  }
}

export default new ProfileService();