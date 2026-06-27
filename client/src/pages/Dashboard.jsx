import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TOKEN_KEY } from "../utils/constants";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <Button onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;