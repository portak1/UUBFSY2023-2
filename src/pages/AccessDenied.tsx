import clsx from "clsx";
import React from "react";
import { useUser } from "../common/modules/contexts/UserContext";
import { useNavigate } from "react-router-dom";
const AccessDenied: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useUser();
  return (
    <div className="min-h-[80vh] w-full flex flex-col gap-10 items-center text-center justify-center ">
      <h1 className="text-3xl text-red-600 font-bold">
        Nepatříte mezi uživatele tohoto listu
      </h1>
      <button
        className={clsx(
          " mx-auto text-sm py-2 text-gray-800 shadow-lg bg-gray-200 px-3 m-5 rounded-lg w-[150px]"
        )}
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Vrátit se na začátek
      </button>
    </div>
  );
};

export default AccessDenied;
