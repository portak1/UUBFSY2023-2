import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./common/modules/components/Navbar";
import LandingPage from "./pages/LandingPage";
import "./index.css";
import { UserProvider } from "./common/modules/contexts/UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AccessDenied from "./pages/AccessDenied";
import ListDetail from "./pages/ListDetail";
import { ListsProvider } from "./common/modules/contexts/ListsContext";
import { QueryClient, QueryClientProvider } from "react-query";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/login" Component={Login} />
        <Route path="/accessDenied" Component={AccessDenied} />
        <Route path="/list/:id" Component={ListDetail} />
      </Routes>
      {/* Add other routes as needed */}
    </Router>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
root.render(
  <QueryClientProvider client={queryClient}>
    {" "}
    <UserProvider>
      <ListsProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ListsProvider>
    </UserProvider>
  </QueryClientProvider>
);

reportWebVitals();
