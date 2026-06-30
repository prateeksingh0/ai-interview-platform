import { useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import resumeService from "../../services/resume.service";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function Resume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) {
      toast.error("Please select a resume.");
      return;
    }

    try {
      setLoading(true);

      const response = await resumeService.uploadResume(file);

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Upload Resume</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {file && (
            <div className="rounded-lg border p-4">
              <p className="font-medium">{file.name}</p>

              <p className="text-sm text-muted-foreground">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={loading}
          >
            {loading
              ? "Uploading..."
              : "Upload Resume"}
          </Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}