import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TasksProvider } from "./components/contexts/task/tasksContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TasksProvider>
      <App />
    </TasksProvider>
  </StrictMode>
);
