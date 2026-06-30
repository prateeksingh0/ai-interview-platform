import api from "../api/axios";

class InterviewService {
    async startInterview(data) {
        const response = await api.post(
            "/interview/start",
            data
        );

        return response.data;
    }

    async getInterview(id) {
        const response = await api.get(`/interview/${id}`);

        return response.data;
    }
}

export default new InterviewService();