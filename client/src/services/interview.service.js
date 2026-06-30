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

    async submitAnswer(data) {
        const response = await api.post(
            "/interview/answer",
            data
        );

        return response.data;
    }

    async finishInterview(sessionId) {
        const response = await api.post(
            "/interview/finish",
            {
                sessionId,
            }
        );

        return response.data;
    }

    async getHistory() {
        const response = await api.get("/interview/history");

        return response.data;
    }
}

export default new InterviewService();