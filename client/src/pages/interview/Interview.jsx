import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import interviewService from "../../services/interview.service";
import dashboardService from "../../services/dashboard.service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function Interview() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("");

  const [difficulty, setDifficulty] =
    useState("MEDIUM");

  const [currentInterview, setCurrentInterview] =
    useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data =
        await dashboardService.getDashboard();

      const interview =
        data.recentInterviews.find(
          (item) => item.status === "IN_PROGRESS"
        );

      if (interview) {
        setCurrentInterview(interview);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleStart() {
    if (!role.trim()) {
      toast.error("Enter a job role.");
      return;
    }

    try {
      setLoading(true);

      const response =
        await interviewService.startInterview({
          role,
          difficulty,
        });

      toast.success(response.message);

      localStorage.setItem(
        "currentQuestion",
        "0"
      );

      navigate(
        `/interview/${response.data.id}`
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to start interview."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>

      <h1 className="mb-6 text-3xl font-bold">
        Interview
      </h1>

      {currentInterview && (
        <Card className="mb-6 max-w-xl">

          <CardHeader>

            <CardTitle>
              Continue Interview
            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-4">

            <div>

              <p className="font-medium">
                {currentInterview.role}
              </p>

              <p className="text-sm text-muted-foreground">
                Difficulty:{" "}
                {currentInterview.difficulty}
              </p>

            </div>

            <Button
              onClick={() =>
                navigate(
                  `/interview/${currentInterview.id}`
                )
              }
            >
              Continue Interview
            </Button>

          </CardContent>

        </Card>
      )}

      <Card className="max-w-xl">

        <CardHeader>

          <CardTitle>
            Start New Interview
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-5">

          <div>

            <Label>
              Job Role
            </Label>

            <Input
              placeholder="Node.js Developer"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            />

          </div>

          <div>

            <Label>
              Difficulty
            </Label>

            <select
              className="w-full rounded-md border p-2"
              value={difficulty}
              onChange={(e) =>
                setDifficulty(
                  e.target.value
                )
              }
            >
              <option>
                EASY
              </option>

              <option>
                MEDIUM
              </option>

              <option>
                HARD
              </option>

            </select>

          </div>

          <Button
            className="w-full"
            onClick={handleStart}
            disabled={loading}
          >
            {loading
              ? "Generating..."
              : "Generate Interview"}
          </Button>

        </CardContent>

      </Card>

    </DashboardLayout>
  );
}