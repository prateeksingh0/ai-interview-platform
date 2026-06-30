import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import interviewService from "../../services/interview.service";

import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";

export default function Interview() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [interview, setInterview] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});

  useEffect(() => {
    loadInterview();
  }, [id]);

  async function loadInterview() {
    try {
      const response =
        await interviewService.getInterview(id);

      setInterview(response.data);
    } finally {
      setLoading(false);
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
              setAnswers({
                ...answers,
                [question.id]:
                  e.target.value,
              })
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

            <Button
              disabled={
                currentQuestion ===
                interview.questions.length - 1
              }
              onClick={() =>
                setCurrentQuestion(
                  currentQuestion + 1
                )
              }
            >
              Next
            </Button>

          </div>

        </CardContent>

      </Card>

    </DashboardLayout>
  );
}