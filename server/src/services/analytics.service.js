import prisma from "../config/prisma.js";

class AnalyticsService {
  async getAnalytics(userId) {
    const sessions = await prisma.interviewSession.findMany({
      where: {
        userId,
      },
      select: {
        role: true,
        difficulty: true,
        status: true,
        overallScore: true,
      },
    });

    const completed = sessions.filter(
      (item) =>
        item.status === "COMPLETED" &&
        item.overallScore !== null
    );

    const totalInterviews = sessions.length;

    const completedInterviews =
      completed.length;

    const inProgressInterviews =
      sessions.filter(
        (item) => item.status === "IN_PROGRESS"
      ).length;

    const averageScore =
      completed.length === 0
        ? 0
        : Number(
            (
              completed.reduce(
                (sum, item) =>
                  sum + item.overallScore,
                0
              ) / completed.length
            ).toFixed(2)
          );

    const bestScore =
      completed.length === 0
        ? 0
        : Math.max(
            ...completed.map(
              (item) => item.overallScore
            )
          );

    const roleStats = [];

    [...new Set(completed.map((s) => s.role))]
      .forEach((role) => {
        const roleSessions =
          completed.filter(
            (s) => s.role === role
          );

        roleStats.push({
          role,
          interviews:
            roleSessions.length,
          averageScore: Number(
            (
              roleSessions.reduce(
                (sum, s) =>
                  sum + s.overallScore,
                0
              ) / roleSessions.length
            ).toFixed(2)
          ),
        });
      });

    const difficultyStats = [];

    ["EASY", "MEDIUM", "HARD"].forEach(
      (difficulty) => {
        const items =
          completed.filter(
            (s) =>
              s.difficulty === difficulty
          );

        difficultyStats.push({
          difficulty,
          interviews: items.length,
          averageScore:
            items.length === 0
              ? 0
              : Number(
                  (
                    items.reduce(
                      (sum, s) =>
                        sum + s.overallScore,
                      0
                    ) / items.length
                  ).toFixed(2)
                ),
        });
      }
    );

    return {
      totalInterviews,
      completedInterviews,
      inProgressInterviews,
      averageScore,
      bestScore,
      roleStats,
      difficultyStats,
    };
  }
}

export default new AnalyticsService();