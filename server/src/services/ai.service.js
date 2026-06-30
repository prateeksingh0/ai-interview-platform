import axios from "axios";
import FormData from "form-data";
import fs from "fs";

class AIService {
  async extractResume(filePath) {
    const form = new FormData();

    form.append("file", fs.createReadStream(filePath));

    const response = await axios.post(
      `${process.env.AI_SERVICE_URL}/resume/extract`,
      form,
      {
        headers: form.getHeaders(),
      }
    );

    return response.data.text;
  }

  async generateQuestions(data) {

    console.log("A. About to call FastAPI");
    const response = await axios.post(
      `${process.env.AI_SERVICE_URL}/interview/questions`,
      data
    );

    console.log("B. FastAPI returned");
    return response.data.data.questions;
  }

  async evaluateAnswer(data) {
    const response = await axios.post(
      `${process.env.AI_SERVICE_URL}/interview/evaluate`,
      data
    );

    return response.data.data;
  }
}

export default new AIService();