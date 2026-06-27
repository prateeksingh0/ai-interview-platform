import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { register as registerUser } from "../services/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);

      reset();

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <Label>Name</Label>

              <Input
                type="text"
                placeholder="John Doe"
                {...register("name")}
              />
            </div>

            <div>
              <Label>Email</Label>

              <Input
                type="email"
                placeholder="john@example.com"
                {...register("email")}
              />
            </div>

            <div>
              <Label>Password</Label>

              <Input
                type="password"
                placeholder="********"
                {...register("password")}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              Register
            </Button>

            <p className="text-center text-sm">
              Already have an account?

              <Link
                to="/"
                className="ml-2 text-blue-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;