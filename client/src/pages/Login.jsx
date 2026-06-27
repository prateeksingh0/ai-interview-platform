import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../services/auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Login
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
                {...register("email")}
              />
            </div>

            <div>
              <Label>Password</Label>

              <Input
                type="password"
                {...register("password")}
              />
            </div>

            <Button
              className="w-full"
              type="submit"
            >
              Login
            </Button>

            <p className="text-center text-sm">
              Don't have an account?

              <Link
                className="ml-2 text-blue-500"
                to="/register"
              >
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;