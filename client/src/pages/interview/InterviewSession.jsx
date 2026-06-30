import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import interviewService from "../../services/interview.service";


import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";



export default function InterviewSession() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [interview, setInterview] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(() => {
    return Number(localStorage.getItem("currentQuestion")) || 0;
  });

  const [answers, setAnswers] = useState({});

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadInterview();
  }, [id]);

  useEffect(() => {
    localStorage.setItem(
      "currentQuestion",
      currentQuestion
    );
  }, [currentQuestion]);

  async function loadInterview() {
    try {
      const response =
        await interviewService.getInterview(id);

      const data = response.data;

      setInterview(data);

      const existingAnswers = {};

      data.questions.forEach((question) => {
        if (question.answer) {
          existingAnswers[question.id] = question.answer.answer;
        }
      });

      setAnswers(existingAnswers);
    } finally {
      setLoading(false);
    }
  }
  async function handleNext() {
    const question = interview.questions[currentQuestion];

    const answer = answers[question.id]?.trim();

    if (!answer) {
      toast.error("Please answer the question before continuing.");
      return;
    }

    try {
      setSaving(true);

      await interviewService.submitAnswer({
        questionId: question.id,
        answer: answers[question.id] || "",
      });

      setCurrentQuestion((prev) => prev + 1);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to save answer."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleFinish() {
    const question = interview.questions[currentQuestion];

    try {
      setSaving(true);

      await interviewService.submitAnswer({
        questionId: question.id,
        answer: answers[question.id] || "",
      });

      await interviewService.finishInterview(interview.id);

      localStorage.removeItem("currentQuestion");

      toast.success("Interview completed!");

      navigate(`/results/${interview.id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to finish interview."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  const question =
    interview.questions[currentQuestion];

  return (
    <DashboardLayout>

      <h1 className="mb-2 text-3xl font-bold">
        Interview
      </h1>

      <p className="mb-6 text-muted-foreground">
        Question {currentQuestion + 1} of{" "}
        {interview.questions.length}
      </p>

      <Card>

        <CardContent className="space-y-6 p-6">

          <h2 className="text-xl font-semibold">
            {question.question}
          </h2>

          <Textarea
            rows={10}
            placeholder="Write your answer here..."
            value={
              answers[question.id] || ""
            }
            onChange={(e) =>
              setAnswers((prev) => ({
                ...prev,
                [question.id]: e.target.value,
              }))
            }
          />

          <div className="flex justify-between">

            <Button
              variant="outline"
              disabled={currentQuestion === 0}
              onClick={() =>
                setCurrentQuestion(
                  currentQuestion - 1
                )
              }
            >
              Previous
            </Button>

            {currentQuestion === interview.questions.length - 1 ? (
              <Button
                disabled={
                  saving ||
                  !answers[question.id]?.trim()
                }
                onClick={handleFinish}
              >
                {saving ? "Finishing..." : "Finish Interview"}
              </Button>
            ) : (
              <Button
                disabled={
                  saving ||
                  !answers[question.id]?.trim()
                }
                onClick={handleNext}
              >
                {saving ? "Saving..." : "Next"}
              </Button>
            )}

          </div>

        </CardContent>

      </Card>

    </DashboardLayout>
  );

}