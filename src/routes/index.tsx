import { createFileRoute } from "@tanstack/react-router";
import Home from "../pages/HomePage";

const HomePage = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: HomePage,
});
