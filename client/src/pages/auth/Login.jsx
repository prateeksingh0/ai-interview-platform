import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import authService from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await authService.login(data);

      login(
        response.data.token,
        response.data.user
      );

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">

      <Card className="w-full max-w-md">

        <CardHeader>
          <CardTitle className="text-center text-2xl">
            AI Interview Platform
          </CardTitle>
        </CardHeader>

        <CardContent>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <div>

              <Label>Email</Label>

              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}

            </div>

            <div>

              <Label>Password</Label>

              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}

            </div>

            <Button
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

          </form>

          <p className="mt-6 text-center text-sm">

            Don't have an account?

            {" "}

            <Link
              to="/register"
              className="font-medium text-primary"
            >
              Register
            </Link>

          </p>

        </CardContent>

      </Card>

    </div>
  );
}