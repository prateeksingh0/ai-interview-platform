import DashboardLayout from "../../layouts/DashboardLayout";

export default function Resume() {
  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold">
        Upload Resume
      </h1>

      <p className="mt-3 text-muted-foreground">
        Upload your latest resume to generate AI-powered interview questions.
      </p>

    </DashboardLayout>
  );
}