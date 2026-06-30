import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function RecentInterviews({
  interviews,
}) {
  return (
    <Card>

      <CardHeader>
        <CardTitle>
          Recent Interviews
        </CardTitle>
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
                className="flex items-center justify-between border-b pb-3 last:border-0"
              >
                <div>

                  <h3 className="font-medium">
                    {interview.role}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {interview.difficulty}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-semibold">
                    {interview.overallScore ?? "-"}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {interview.status}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </CardContent>

    </Card>
  );
}