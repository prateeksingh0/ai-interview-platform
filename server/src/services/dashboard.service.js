import prisma from "../config/prisma.js";

class DashboardService {
  async getDashboard(userId) {
    const [user, stats, resume, recentInterviews] =
      await Promise.all([
        prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        }),

        prisma.userStats.findUnique({
          where: {
            userId,
          },
        }),

        prisma.resume.findUnique({
          where: {
            userId,
          },
          select: {
            id: true,
            fileName: true,
            uploadedAt: true,
          },
        }),

        prisma.interviewSession.findMany({
          where: {
            userId,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
          select: {
            id: true,
            role: true,
            difficulty: true,
            overallScore: true,
            status: true,
            createdAt: true,
          },
        }),
      ]);

    return {
      user,

      stats: stats ?? {
        totalInterviews: 0,
        averageScore: 0,
        bestScore: 0,
      },

      resumeUploaded: !!resume,

      resume,

      recentInterviews,
    };
  }
}

export default new DashboardService();