import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import analyticsService from "../../services/analytics.service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function Analytics() {
  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const response =
        await analyticsService.getAnalytics();

      setAnalytics(response.data);
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

      <h1 className="mb-8 text-3xl font-bold">
        Analytics
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

        <Stat
          title="Total"
          value={analytics.totalInterviews}
        />

        <Stat
          title="Completed"
          value={analytics.completedInterviews}
        />

        <Stat
          title="In Progress"
          value={analytics.inProgressInterviews}
        />

        <Stat
          title="Average"
          value={analytics.averageScore}
        />

        <Stat
          title="Best"
          value={analytics.bestScore}
        />

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <Card>

          <CardHeader>

            <CardTitle>
              Role Performance
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="space-y-4">

              {analytics.roleStats.map((role) => (

                <div
                  key={role.role}
                  className="flex justify-between border-b pb-3"
                >

                  <div>

                    <p className="font-medium">
                      {role.role}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {role.interviews} interview(s)
                    </p>

                  </div>

                  <p className="font-bold">
                    {role.averageScore}/10
                  </p>

                </div>

              ))}

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardHeader>

            <CardTitle>
              Difficulty Performance
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="space-y-4">

              {analytics.difficultyStats.map(
                (difficulty) => (

                  <div
                    key={difficulty.difficulty}
                    className="flex justify-between border-b pb-3"
                  >

                    <div>

                      <p className="font-medium">
                        {difficulty.difficulty}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {difficulty.interviews} interview(s)
                      </p>

                    </div>

                    <p className="font-bold">
                      {difficulty.averageScore}/10
                    </p>

                  </div>

                )
              )}

            </div>

          </CardContent>

        </Card>

      </div>

    </DashboardLayout>
  );
}

function Stat({
  title,
  value,
}) {
  return (
    <Card>

      <CardHeader>

        <CardTitle className="text-sm">
          {title}
        </CardTitle>

      </CardHeader>

      <CardContent>

        <p className="text-3xl font-bold">
          {value}
        </p>

      </CardContent>

    </Card>
  );
}