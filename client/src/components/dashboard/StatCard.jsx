import { Card, CardContent } from "../ui/card";

export default function StatCard({
  title,
  value,
  subtitle,
}) {
  return (
    <Card>

      <CardContent className="p-6">

        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {value}
        </h2>

        {subtitle && (
          <p className="mt-2 text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}

      </CardContent>

    </Card>
  );
}