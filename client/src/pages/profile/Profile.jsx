import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import authService from "../../services/auth.service";

import DashboardLayout from "../../layouts/DashboardLayout";
import profileService from "../../services/profile.service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function Profile() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [profile, setProfile] =
    useState({
      name: "",
      email: "",
    });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const response =
        await profileService.getProfile();

      setProfile(response.data);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!profile.name.trim()) {
      toast.error(
        "Name is required."
      );
      return;
    }

    try {
      setSaving(true);

      const response =
        await profileService.updateProfile({
          name: profile.name,
        });

      setProfile(response.data);

      toast.success(response.message);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to update profile."
      );

    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteResume() {
    if (
      !window.confirm(
        "Delete your resume?"
      )
    ) {
      return;
    }

    try {
      const response =
        await profileService.deleteResume();

      toast.success(response.message);

      await loadProfile();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to delete resume."
      );

    }
  }

  function handleLogout() {
    authService.logout();

    navigate("/login");
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
        Profile
      </h1>

      <Card className="max-w-xl">

        <CardHeader>

          <CardTitle>
            Account Information
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-5">

          <div>

            <Label>
              Name
            </Label>

            <Input
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
            />

          </div>

          <div>

            <Label>
              Email
            </Label>

            <Input
              value={profile.email}
              disabled
            />

          </div>


          <div className="rounded-lg border p-4 space-y-2">

            <h3 className="font-semibold">
              Resume
            </h3>

            {profile.resume ? (
              <>

                <p>
                  <strong>Filename:</strong>{" "}
                  {profile.resume.fileName}
                </p>

                <p>
                  <strong>Uploaded:</strong>{" "}
                  {new Date(
                    profile.resume.uploadedAt
                  ).toLocaleString()}
                </p>

              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                No resume uploaded.
              </p>
            )}

          </div>

          <div className="flex flex-wrap gap-3">

            <Button
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                navigate("/resume")
              }
            >
              {profile.resume
                ? "Replace Resume"
                : "Upload Resume"}
            </Button>

            {profile.resume && (
              <Button
                variant="destructive"
                onClick={handleDeleteResume}
              >
                Delete Resume
              </Button>
            )}

            <Button
              variant="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>

          </div>
        </CardContent>

      </Card>

    </DashboardLayout>
  );
}