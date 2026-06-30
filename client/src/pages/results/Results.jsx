import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import interviewService from "../../services/interview.service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function Results() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState(null);

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

  if (
    !loading &&
    interview?.status !== "COMPLETED"
  ) {
    return (
      <DashboardLayout>
        <h1 className="text-2xl font-bold">
          Interview Not Completed
        </h1>

        <p className="mt-4 text-muted-foreground">
          Complete the interview before viewing the results.
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <h1 className="mb-6 text-3xl font-bold">
        Interview Results
      </h1>

      <Card className="mb-6">

        <CardHeader>
          <CardTitle>
            Overall Result
          </CardTitle>
        </CardHeader>

        <CardContent>

          <p>
            <strong>Role:</strong>{" "}
            {interview.role}
          </p>

          <p>
            <strong>Difficulty:</strong>{" "}
            {interview.difficulty}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {interview.status}
          </p>

          <p className="text-2xl font-bold mt-4">
            Overall Score:
            {" "}
            {interview.overallScore}/10
          </p>

        </CardContent>

      </Card>

      <div className="space-y-6">

        {interview.questions.map(
          (question, index) => (

            <Card key={question.id}>

              <CardHeader>

                <CardTitle>
                  Question {index + 1}
                </CardTitle>

              </CardHeader>

              <CardContent className="space-y-3">

                <p>
                  <strong>Question:</strong>
                </p>

                <p>{question.question}</p>

                <p>
                  <strong>Your Answer:</strong>
                </p>

                <p>
                  {question.answer?.answer}
                </p>

                <p>
                  <strong>Score:</strong>{" "}
                  {question.answer?.score}/10
                </p>

                <p>
                  <strong>Feedback:</strong>
                </p>

                <p>
                  {question.answer?.feedback}
                </p>

                <p>
                  <strong>Strong Points</strong>
                </p>

                <pre>
                  {question.answer?.strongPoints}
                </pre>

                <p>
                  <strong>Weak Points</strong>
                </p>

                <pre>
                  {question.answer?.weakPoints}
                </pre>

              </CardContent>

            </Card>
          )
        )}

      </div>

    </DashboardLayout>
  );
}