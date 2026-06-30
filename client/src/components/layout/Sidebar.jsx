import {
  LayoutDashboard,
  FileText,
  Brain,
  History,
  BarChart3,
  User,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { Button } from "../ui/button";

import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 border-r bg-background p-5">

      <h2 className="mb-8 text-2xl font-bold">
        AI Interview
      </h2>

      <nav className="space-y-2">

        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/resume"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
        >
          <FileText size={18} />
          Resume
        </NavLink>

        <NavLink
          to="/interview"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
        >
          <Brain size={18} />
          Interview
        </NavLink>

        <NavLink
          to="/history"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
        >
          <History size={18} />
          History
        </NavLink>

        <NavLink
          to="/analytics"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
        >
          <BarChart3 size={18} />
          Analytics
        </NavLink>

        <NavLink
          to="/profile"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
        >
          <User size={18} />
          Profile
        </NavLink>

      </nav>

      <Button
        variant="destructive"
        className="mt-10 w-full"
        onClick={logout}
      >
        <LogOut className="mr-2 h-4 w-4" />

        Logout

      </Button>

    </aside>
  );
}