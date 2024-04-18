import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./assets/style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IndexContextProvider from "./context/IndexContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <IndexContextProvider>
      <Router>
        <App />
      </Router>
    </IndexContextProvider>
  </QueryClientProvider>
);
