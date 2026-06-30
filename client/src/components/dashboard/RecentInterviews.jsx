import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";

export default function RecentInterviews({
  interviews,
}) {
  return (
    <Card>

      <CardHeader className="flex flex-row items-center justify-between">

        <CardTitle>
          Recent Interviews
        </CardTitle>

        <Link
          to="/history"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All →
        </Link>

      </CardHeader>

      <CardContent>

        {interviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No interviews yet.
          </p>
        ) : (
          <div className="space-y-4">

            {interviews.map((interview) => (

              <div
                key={interview.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >

                <div className="space-y-1">

                  <h3 className="font-semibold">
                    {interview.role}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {interview.difficulty}
                  </p>

                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                      interview.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {interview.status}
                  </span>

                </div>

                <div className="text-right space-y-2">

                  <p className="text-lg font-bold">
                    {interview.overallScore ?? "-"} / 10
                  </p>

                  {interview.status === "COMPLETED" ? (

                    <Link
                      to={`/results/${interview.id}`}
                    >
                      <Button size="sm">
                        View Result
                      </Button>
                    </Link>

                  ) : (

                    <Link
                      to={`/interview/${interview.id}`}
                    >
                      <Button size="sm">
                        Continue
                      </Button>
                    </Link>

                  )}

                </div>

              </div>

            ))}

          </div>
        )}

      </CardContent>

    </Card>
  );
}