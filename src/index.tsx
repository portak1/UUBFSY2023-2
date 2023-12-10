import React, { useEffect } from "react";
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
import moment from "moment";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import {
  ThemeProvider,
  useTheme,
} from "./common/modules/contexts/ThemeProvider";

moment.locale(i18n.language === "en" ? "en-gb" : "cs");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const App: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.add(theme);
    return () => {
      document.documentElement.classList.remove(theme);
    };
  }, [theme]);

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
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <ListsProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </ListsProvider>
        </UserProvider>
      </I18nextProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

reportWebVitals();
