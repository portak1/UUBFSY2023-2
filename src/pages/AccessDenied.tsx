import clsx from "clsx";
import React from "react";
import { useUser } from "../common/modules/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logout } = useUser();

  return (
    <div className="min-h-[100vh] dark:bg-gray-800 w-full flex flex-col gap-10 items-center text-center justify-center">
      <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">
        {t("accessDeniedPage.notInUserList")}
      </h1>
      <button
        className={clsx(
          "mx-auto text-sm py-2 shadow-lg bg-gray-200 dark:bg-gray-700 px-3 m-5 rounded-lg w-[150px] text-gray-800 dark:text-gray-200"
        )}
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        {t("accessDeniedPage.backToLogin")}
      </button>
    </div>
  );
};

export default AccessDenied;
