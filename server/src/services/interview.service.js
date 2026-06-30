import prisma from "../config/prisma.js";
import aiService from "./ai.service.js";
import ApiError from "../utils/apiError.js";

class InterviewService {
  async startInterview(userId, role, difficulty) {
    const resume = await prisma.resume.findUnique({
      where: {
        userId,
      },
    });

    if (!resume) {
      throw new ApiError(404, "Resume not found");
    }

    const questions = await aiService.generateQuestions({
      resume_text: resume.extractedText,
      role,
      difficulty,
    });

    const session = await prisma.interviewSession.create({
      data: {
        role,
        difficulty,
        userId,
      },
    });

    await prisma.interviewQuestion.createMany({
      data: questions.map((question) => ({
        question: question.question,
        type: question.type,
        difficulty,
        sessionId: session.id,
      })),
    });

    return await prisma.interviewSession.findUnique({
      where: {
        id: session.id,
      },
      include: {
        questions: true,
      },
    });
  }

  async submitAnswer(userId, questionId, answer) {
    const question = await prisma.interviewQuestion.findUnique({
      where: {
        id: questionId,
      },
      include: {
        session: true,
      },
    });

    if (!question) {
      throw new ApiError(404, "Question not found");
    }

    const resume = await prisma.resume.findUnique({
      where: {
        userId,
      },
    });

    if (!resume) {
      throw new ApiError(404, "Resume not found");
    }

    const evaluation = await aiService.evaluateAnswer({
      question: question.question,
      user_answer: answer,
      resume_text: resume.extractedText,
      role: question.session.role,
      difficulty: question.session.difficulty,
      question_type: question.type,
    });

    let interviewAnswer = await prisma.interviewAnswer.findUnique({
      where: {
        questionId,
      },
    });

    if (interviewAnswer) {
      interviewAnswer = await prisma.interviewAnswer.update({
        where: {
          questionId,
        },
        data: {
          answer,
          score: evaluation.score,
          feedback: evaluation.feedback,
          strongPoints: evaluation.strong_points.join("\n"),
          weakPoints: evaluation.weak_points.join("\n"),
        },
      });
    } else {
      interviewAnswer = await prisma.interviewAnswer.create({
        data: {
          answer,
          score: evaluation.score,
          feedback: evaluation.feedback,
          strongPoints: evaluation.strong_points.join("\n"),
          weakPoints: evaluation.weak_points.join("\n"),
          questionId,
        },
      });
    }

    // Calculate overall interview score
    const answers = await prisma.interviewAnswer.findMany({
      where: {
        question: {
          sessionId: question.session.id,
        },
      },
    });

    const totalScore = answers.reduce(
      (sum, item) => sum + (item.score || 0),
      0
    );

    const averageScore =
      answers.length > 0
        ? Number((totalScore / answers.length).toFixed(2))
        : 0;

    await prisma.interviewSession.update({
      where: {
        id: question.session.id,
      },
      data: {
        overallScore: averageScore,
        status:
          answers.length === 10
            ? "COMPLETED"
            : "IN_PROGRESS",
      },
    });

    return interviewAnswer;
  }

  async submitInterview(userId, sessionId, answers) {
    const session = await prisma.interviewSession.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        questions: true,
      },
    });

    if (!session) {
      throw new ApiError(404, "Interview session not found");
    }

    const results = [];

    for (const item of answers) {
      const result = await this.submitAnswer(
        userId,
        item.questionId,
        item.answer
      );

      results.push(result);
    }

    await this.updateUserStats(userId);

    return await prisma.interviewSession.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        questions: {
          include: {
            answer: true,
          },
        },
      },
    });
  }

  async updateUserStats(userId) {
    const sessions = await prisma.interviewSession.findMany({
      where: {
        userId,
        status: "COMPLETED",
        overallScore: {
          not: null,
        },
      },
      select: {
        overallScore: true,
      },
    });

    const totalInterviews = sessions.length;

    const averageScore =
      totalInterviews === 0
        ? 0
        : Number(
          (
            sessions.reduce(
              (sum, session) => sum + session.overallScore,
              0
            ) / totalInterviews
          ).toFixed(2)
        );

    const bestScore =
      totalInterviews === 0
        ? 0
        : Math.max(...sessions.map((s) => s.overallScore));

    await prisma.userStats.upsert({
      where: {
        userId,
      },
      update: {
        totalInterviews,
        averageScore,
        bestScore,
      },
      create: {
        userId,
        totalInterviews,
        averageScore,
        bestScore,
      },
    });
  }

  async getInterview(userId, interviewId) {
    const interview = await prisma.interviewSession.findFirst({
      where: {
        id: interviewId,
        userId,
      },
      include: {
        questions: {
          include: {
            answer: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    if (!interview) {
      throw new ApiError(404, "Interview not found");
    }

    return interview;
  }

  async finishInterview(userId, sessionId) {
    const session = await prisma.interviewSession.findFirst({
      where: {
        id: sessionId,
        userId,
      },
      include: {
        questions: {
          include: {
            answer: true,
          },
        },
      },
    });

    if (!session) {
      throw new ApiError(404, "Interview not found");
    }

    const answers = session.questions
      .map((question) => question.answer)
      .filter(Boolean);

    const totalScore = answers.reduce(
      (sum, answer) => sum + (answer.score || 0),
      0
    );

    const overallScore =
      answers.length > 0
        ? Number((totalScore / answers.length).toFixed(2))
        : 0;

    const updatedSession =
      await prisma.interviewSession.update({
        where: {
          id: sessionId,
        },
        data: {
          status: "COMPLETED",
          overallScore,
        },
        include: {
          questions: {
            include: {
              answer: true,
            },
          },
        },
      });

    await this.updateUserStats(userId);

    return updatedSession;
  }
}

export default new InterviewService();