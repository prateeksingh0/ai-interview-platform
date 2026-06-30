import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

import { Input } from "../../components/ui/input";

import { Label } from "../../components/ui/label";

export default function StartInterview() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("");

  const [difficulty, setDifficulty] =
    useState("MEDIUM");

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

      localStorage.setItem("currentQuestion", "0");
      navigate(`/interview/${response.data.id}`);
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
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>
            Start Interview
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div>
            <Label>Job Role</Label>

            <Input
              placeholder="Node.js Developer"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Difficulty</Label>

            <select
              className="w-full rounded-md border p-2"
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value)
              }
            >
              <option>EASY</option>
              <option>MEDIUM</option>
              <option>HARD</option>
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