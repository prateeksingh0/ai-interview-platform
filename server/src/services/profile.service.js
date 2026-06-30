import prisma from "../config/prisma.js";
import ApiError from "../utils/apiError.js";

class ProfileService {
  async getProfile(userId) {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,

        resume: {
          select: {
            id: true,
            fileName: true,
            uploadedAt: true,
          },
        },
      },
    });
  }

  async updateProfile(userId, name) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async deleteResume(userId) {
    const resume = await prisma.resume.findUnique({
      where: {
        userId,
      },
    });

    if (!resume) {
      throw new ApiError(404, "Resume not found");
    }

    await prisma.resume.delete({
      where: {
        userId,
      },
    });

    return {
      message: "Resume deleted successfully",
    };
  }
}

export default new ProfileService();