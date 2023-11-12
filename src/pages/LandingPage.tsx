import React, { Fragment, useEffect, useState } from "react";
import { List } from "../common/modules/types/List";
import { useNavigate } from "react-router-dom";
import { useUser } from "../common/modules/contexts/UserContext";
import clsx from "clsx";
import AddListModal, {
  IAddListForm,
} from "../common/modules/components/modals/AddListModal";
import { useLists } from "../common/modules/contexts/ListsContext";
import { User } from "../common/modules/types/User";

const LandingPage: React.FC = () => {
  const { user } = useUser();
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const { lists, setLists } = useLists();
  const navigate = useNavigate();

  const deleteItem = (id: string) => {
    const updatedItems = lists.filter((item) => item.id !== id);
    setLists(updatedItems);
  };

  const addItem = (data: IAddListForm) => {
    const updatedLists: List[] = [
      ...lists,
      {
        id: (lists.length + 1).toString(),
        name: data.name,
        users: [{ isOwner: true, user: user as User }],
        items: [],
      },
    ];
    setLists([...updatedLists]);
    setIsAddListModalOpen(true);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="p-4 w-1/2 text-center sm:w-full">
      <Fragment>
        {/* Manage Users Button */}
        <button
          className={clsx(
            "mx-auto  text-sm py-2 text-gray-800 shadow-lg bg-gray-200  px-3 m-5 rounded-lg w-[150px]"
          )}
          onClick={() => setIsAddListModalOpen(true)}
        >
          Nový list
        </button>
      </Fragment>
      <ul className="flex flex-col items-center">
        {lists.map((item) => {
          return (
            <li
              key={item.id}
              className={`mb-2 cursor-pointer bg-gray-100 shadow-md p-3 min-w-[400px] flex justify-between`}
            >
              <span
                onClick={() => {
                  navigate(`/list/${item.id}`);
                }}
                className={clsx("text-black")}
              >
                {item.name}
              </span>
              <div className="flex">
                <button
                  className="ml-2 text-red-600"
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
