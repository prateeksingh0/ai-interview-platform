import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import dashboardService from "../../services/dashboard.service";

import StatCard from "../../components/dashboard/StatCard";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data =
        await dashboardService.getDashboard();

      setDashboard(data);
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
        Welcome back, {dashboard.user.name} 👋
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Interviews"
          value={dashboard.stats.totalInterviews}
        />

        <StatCard
          title="Average Score"
          value={dashboard.stats.averageScore}
        />

        <StatCard
          title="Best Score"
          value={dashboard.stats.bestScore}
        />

        <StatCard
          title="Resume"
          value={
            dashboard.resumeUploaded
              ? "Uploaded"
              : "Missing"
          }
        />

      </div>

    </DashboardLayout>
  );
}