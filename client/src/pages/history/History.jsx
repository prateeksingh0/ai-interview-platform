import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await interviewService.deleteInterview(id);

      toast.success(response.message);

      setHistory((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete interview."
      );
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

                  <div className="mt-4 flex gap-2">

                    {item.status === "COMPLETED" ? (
                      <Link to={`/results/${item.id}`}>
                        <Button>
                          View Result
                        </Button>
                      </Link>
                    ) : (
                      <Link to={`/interview/${item.id}`}>
                        <Button>
                          Continue Interview
                        </Button>
                      </Link>
                    )}

                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>

                  </div>

                </div>

              </CardContent>

            </Card>

          ))}

        </div>
      )}

    </DashboardLayout>
  );
}