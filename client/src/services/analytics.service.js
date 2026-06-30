import api from "../api/axios";

class AnalyticsService {
  async getAnalytics() {
    const response = await api.get("/analytics");

    return response.data;
  }
}

export default new AnalyticsService();