import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import interviewService from "../../services/interview.service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Button } from "../../components/ui/button";

export default function History() {
  const [loading, setLoading] = useState(true);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const response =
        await interviewService.getHistory();

      setHistory(response.data);
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

  return (
    <DashboardLayout>

      <h1 className="mb-6 text-3xl font-bold">
        Interview History
      </h1>

      {history.length === 0 ? (
        <Card>

          <CardContent className="p-6 text-center">

            No interviews found.

          </CardContent>

        </Card>
      ) : (
        <div className="space-y-4">

          {history.map((item) => (

            <Card key={item.id}>

              <CardHeader>

                <CardTitle>
                  {item.role}
                </CardTitle>

              </CardHeader>

              <CardContent>

                <div className="space-y-2">

                  <p>
                    <strong>Difficulty:</strong>{" "}
                    {item.difficulty}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {item.status}
                  </p>

                  <p>
                    <strong>Score:</strong>{" "}
                    {item.overallScore ?? "-"} / 10
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </p>

                  {item.status === "COMPLETED" ? (
                    <Link to={`/results/${item.id}`}>
                      <Button className="mt-4">
                        View Result
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className="mt-4"
                      disabled
                    >
                      Interview In Progress
                    </Button>
                  )}

                </div>

              </CardContent>

            </Card>

          ))}

        </div>
      )}

    </DashboardLayout>
  );
}