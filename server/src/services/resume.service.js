import prisma from "../config/prisma.js";
import fs from "fs";

class ResumeService {
  async uploadResume(userId, file) {
    const existingResume = await prisma.resume.findUnique({
      where: {
        userId,
      },
    });

    // Delete old database record
    if (existingResume) {
      // Delete old file if it exists
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

    const resume = await prisma.resume.create({
      data: {
        fileName: file.originalname,
        filePath: file.path,
        userId,
      },
    });

    return resume;
  }
}

export default new ResumeService();