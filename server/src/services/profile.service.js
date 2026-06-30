import prisma from "../config/prisma.js";

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
}

export default new ProfileService();