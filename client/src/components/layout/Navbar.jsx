import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-8">

      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>

      <div className="text-right">

        <p className="font-medium">
          {user?.name}
        </p>

        <p className="text-sm text-muted-foreground">
          {user?.email}
        </p>

      </div>

    </header>
  );
}