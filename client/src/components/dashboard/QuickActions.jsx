import { Link } from "react-router-dom";

import {
  FileText,
  Brain,
  History,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function QuickActions() {
  const actions = [
    {
      title: "Upload Resume",
      icon: FileText,
      to: "/resume",
    },
    {
      title: "Start Interview",
      icon: Brain,
      to: "/interview",
    },
    {
      title: "Interview History",
      icon: History,
      to: "/history",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                to={action.to}
                className="flex flex-col items-center justify-center rounded-lg border p-6 transition hover:bg-muted"
              >
                <Icon className="mb-3 h-8 w-8" />

                <p className="font-medium">
                  {action.title}
                </p>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}