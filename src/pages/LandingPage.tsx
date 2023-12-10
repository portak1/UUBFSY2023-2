import React, { Fragment, useEffect, useState } from "react";
import { List } from "../common/modules/types/List";
import { useNavigate } from "react-router-dom";
import { useUser } from "../common/modules/contexts/UserContext";
import clsx from "clsx";
import AddListModal, {
  IAddListForm,
} from "../common/modules/components/modals/AddListModal";
import { useLists } from "../common/modules/contexts/ListsContext";
import {
  useMutateCreateNewList,
  useMutateDeleteList,
} from "../REST/mutations/listMutations";
import { useTranslation } from "react-i18next";

const LandingPage: React.FC = () => {
  const { user } = useUser();
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const { lists, setLists } = useLists();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutateAsync } = useMutateCreateNewList();
  const { mutateAsync: mutateAsyncDelete } = useMutateDeleteList();

  const deleteItem = async (id: string) => {
    await mutateAsyncDelete(id);
    const updatedItems = lists.filter((item) => item.id !== id);
    setLists(updatedItems);
  };

  const addItem = async (data: IAddListForm) => {
    const res = await mutateAsync({
      name: data.name,
    });

    if (!res) return;
    const updatedLists: List[] = [...lists, ...res];

    setLists([...updatedLists]);
    setIsAddListModalOpen(false);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="p-4  text-center min-h-full  dark:bg-gray-800 sm:w-full">
      <Fragment>
        <button
          className={clsx(
            "mx-auto text-sm py-2 shadow-lg bg-gray-200 dark:bg-gray-700 px-3 m-5 rounded-lg w-[150px] text-gray-800 dark:text-gray-200"
          )}
          onClick={() => setIsAddListModalOpen(true)}
        >
          {t("landingPage.newList")}
        </button>
      </Fragment>
      <ul className="flex flex-col items-center">
        {lists.map((item) => {
          return (
            <li
              key={item.id}
              className="mb-2 cursor-pointer min-w-[200px] bg-gray-100 dark:bg-gray-700 shadow-md p-3 sm:min-w-[500px] flex justify-between"
            >
              <span
                onClick={() => {
                  navigate(`/list/${item.id}`);
                }}
                className="text-black dark:text-white"
              >
                {item.name}
              </span>
              <div className="flex">
                <button
                  className="ml-2 text-red-600 dark:text-red-400"
                  onClick={() => deleteItem(item.id)}
                >
                  🗑️
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <AddListModal
        isOpen={isAddListModalOpen}
        setIsOpen={setIsAddListModalOpen}
        addList={addItem}
      />
    </div>
  );
};

export default LandingPage;
