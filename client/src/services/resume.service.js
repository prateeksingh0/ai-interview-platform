import api from "../api/axios";

class ResumeService {
  async uploadResume(file) {
    const formData = new FormData();

    formData.append("resume", file);

    const response = await api.post(
      "/resume/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  }
}

export default new ResumeService();