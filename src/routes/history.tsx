import { createFileRoute } from "@tanstack/react-router";
import HistoryPage from "../pages/HistoryPage";

const History = () => {
  return (
    <div>
      <HistoryPage />
    </div>
  );
};

export const Route = createFileRoute("/history")({
  component: History,
});
