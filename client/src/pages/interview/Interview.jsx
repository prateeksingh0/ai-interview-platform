import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import interviewService from "../../services/interview.service";

export default function Interview() {
  const { id } = useParams();

  const [interview, setInterview] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInterview();
  }, [id]);

  async function loadInterview() {
    try {
      const response = await interviewService.getInterview(id);

      setInterview(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <h1>Loading...</h1>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="mb-6 text-3xl font-bold">
        Interview
      </h1>

      <pre className="overflow-auto rounded-lg border p-6">
        {JSON.stringify(interview, null, 2)}
      </pre>
    </DashboardLayout>
  );
}