import fs from "fs";

import prisma from "../config/prisma.js";
import aiService from "./ai.service.js";

class ResumeService {
  async uploadResume(userId, file) {
    const existingResume =
      await prisma.resume.findUnique({
        where: {
          userId,
        },
      });

    if (existingResume) {
      if (
        existingResume.filePath &&
        fs.existsSync(existingResume.filePath)
      ) {
        fs.unlinkSync(existingResume.filePath);
      }

      await prisma.resume.delete({
        where: {
          userId,
        },
      });
    }

    const extractedText =
      await aiService.extractResume(file.path);

    const resume =
      await prisma.resume.create({
        data: {
          fileName: file.originalname,
          filePath: file.path,
          extractedText,
          userId,
        },
      });

    return resume;
  }
}

export default new ResumeService();