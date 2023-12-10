import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../common/modules/contexts/UserContext";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="min-h-[100vh] dark:bg-gray-800 w-full flex flex-col gap-10 items-center justify-center ">
      <h1 className="text-3xl font-bold dark:text-white">
        Shopping list homerwork
      </h1>
      <div className="flex gap-5">
        <button
          className="bg-green-500 hover:bg-green-700 transition-all shadow-lg text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            login({
              id: "f2c0838c-766c-11ee-b962-0242ac120002",
              name: "Jan Mráz",
            });
            navigate("/");
          }}
        >
          {t("login.asUser")}
        </button>

        <button
          className="bg-green-500 hover:bg-green-700 transition-all shadow-lg text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            login({
              id: "8d168ae2-766a-11ee-b962-0242ac120002",
              name: "Jan Port",
            });
            navigate("/");
          }}
        >
          {t("login.asOwner")}
        </button>
      </div>
    </div>
  );
};

export default Login;
