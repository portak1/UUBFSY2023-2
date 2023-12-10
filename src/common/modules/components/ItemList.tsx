import React, { Fragment, useEffect, useState } from "react";
import { Item } from "../types/Item";
import clsx from "clsx";
import { List } from "../types/List";
import { useForm } from "react-hook-form";
import { Transition, Dialog, Tab } from "@headlessui/react";
import { useUser } from "../contexts/UserContext";
import EditUsersModal from "./modals/EditUsersModal";
import AddUserModal, { IAddUserForm } from "./modals/AddUserModal";
import { uuid } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useMutateUpdateList } from "../../../REST/mutations/listMutations";
import { useTranslation } from "react-i18next";

interface IShoppingListProps {
  mockDataListItem: List;
  setList: (listData: List) => void;
}

interface IAddItemForm {
  name: string;
  itemCount: number;
}

enum Filter {
  ALL,
  COMPLETED,
  UNCOMPLETED,
}

const ShoppingList: React.FC<IShoppingListProps> = ({
  mockDataListItem,
  setList,
}) => {
  const { t } = useTranslation();
  const [isEditUsersModalOpen, setIsEditUsersModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [propsItems, setPropsItems] = useState<Item[]>(mockDataListItem.items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(mockDataListItem.name);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const { user } = useUser();
  const navigate = useNavigate();

  const { mutateAsync: updateListAsync } = useMutateUpdateList();
  useEffect(() => {
    const isUserInList = !!mockDataListItem.users.find(
      (item) => item.user.id === user?.id
    );

    if (!isUserInList) {
      navigate("/accessDenied");
    }
  }, [user, propsItems, mockDataListItem.users, navigate]);

  const isOwner = mockDataListItem.users.find(
    (item) => item.user.id === user?.id
  )?.isOwner;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAddItemForm>();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleNameEditEnd = async () => {
    setIsEditingName(false);
    const res = await updateListAsync({
      ...mockDataListItem,
      name: editedName,
    });
    console.log(res);
    setList({
      ...mockDataListItem,
      name: editedName,
    });
  };
  const toggleItem = (id: string) => {
    const updatedItems = propsItems.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setPropsItems(updatedItems);
  };
  const addItem = (data: IAddItemForm) => {
    const newItem: Item = {
      id: `${propsItems.length + 1}`,
      name: data.name,
      isCompleted: false,
      itemCount: data.itemCount,
    };
    setPropsItems([...propsItems, newItem]);
    setIsModalOpen(false);
    reset();
  };

  const deleteItem = (id: string) => {
    const updatedItems = propsItems.filter((item) => item.id !== id);
    setPropsItems(updatedItems);
  };

  const addUser = (data: IAddUserForm) => {
    const updatedUsers = [
      ...mockDataListItem.users,
      {
        user: {
          id: uuid(),
          name: data.name,
          email: data.email,
        },
        isOwner: data.isOwner,
      },
    ];
    setList({ ...mockDataListItem, users: updatedUsers });
    setIsEditUsersModalOpen(true);
  };

  const deleteUser = (userId: string) => {
    const updatedUsers = mockDataListItem.users.filter(
      (user) => user.user.id !== userId
    );
    setList({ ...mockDataListItem, users: updatedUsers });
  };

  return (
    <div className="p-4  min-h-full text-center sm:w-full dark:bg-gray-800">
      <div className="flex items-center justify-center mb-4">
        {isEditingName ? (
          <input
            value={editedName}
            onChange={handleNameChange}
            onBlur={handleNameEditEnd}
            onKeyPress={(e) => e.key === "Enter" && handleNameEditEnd()}
            className="text-3xl font-bold bg-gray-100 dark:bg-gray-700 focus:outline-none focus:border-gray-300 rounded dark:text-white"
          />
        ) : (
          <h1 className="text-3xl font-bold dark:text-white">
            {mockDataListItem.name}
          </h1>
        )}
        {isOwner && (
          <button
            className="ml-2 text-blue-600 dark:text-blue-400"
            onClick={() => setIsEditingName(!isEditingName)}
          >
            ✏️
          </button>
        )}
      </div>

      <Fragment>
        <button
          className="mx-auto mr-3 text-gray-800 dark:text-gray-200 shadow-lg bg-gray-300 dark:bg-gray-600 py-1 px-3 m-5 rounded-lg w-[150px]"
          onClick={() => setIsModalOpen(true)}
        >
          {t("shoppingList.newItem")}
        </button>

        {isOwner && (
          <button
            className="mx-auto text-sm py-2 text-gray-800 dark:text-gray-200 shadow-lg bg-gray-200 dark:bg-gray-500 px-3 m-5 rounded-lg w-[150px]"
            onClick={() => setIsEditUsersModalOpen(true)}
          >
            {t("shoppingList.manageUsers")}
          </button>
        )}
        <button
          className="mx-auto ml-3 text-white shadow-lg bg-red-500 dark:bg-red-700 py-1 px-3 m-5 rounded-lg w-[150px]"
          onClick={() => {
            setList({
              ...mockDataListItem,
              users: mockDataListItem.users.filter(
                (listUser) => listUser.user.id !== user?.id
              ),
            });
          }}
        >
          {t("shoppingList.leaveList")}
        </button>
      </Fragment>

      <Tab.Group>
        <Tab.List className="gap-6 my-5">
          <Tab
            onClick={() => setFilter(Filter.ALL)}
            className={clsx(
              filter === Filter.ALL && "!bg-green-400 dark:!bg-green-600",
              "rounded-lg px-3 py-1 mx-1 transition-all bg-gray-200 dark:bg-gray-500"
            )}
          >
            {t("shoppingList.all")}
          </Tab>
          <Tab
            onClick={() => setFilter(Filter.COMPLETED)}
            className={clsx(
              filter === Filter.COMPLETED && "!bg-green-400 dark:!bg-green-600",
              "rounded-lg px-3 py-1 mx-1 transition-all bg-gray-200 dark:bg-gray-500"
            )}
          >
            {t("shoppingList.completed")}
          </Tab>
          <Tab
            onClick={() => setFilter(Filter.UNCOMPLETED)}
            className={clsx(
              filter === Filter.UNCOMPLETED &&
                "!bg-green-400 dark:!bg-green-600",
              "rounded-lg px-3 py-1 mx-1 transition-all bg-gray-200 dark:bg-gray-500"
            )}
          >
            {t("shoppingList.uncompleted")}
          </Tab>
        </Tab.List>
      </Tab.Group>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" onClose={setIsModalOpen}>
          <div className="min-h-screen px-4 text-center">
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block w-[90%] mx-auto max-h-[350px] my-auto inset-0 fixed max-w-md p-6 overflow-hidden text-left align-middle bg-white dark:bg-gray-800 shadow-xl rounded-2xl z-50">
              <Dialog.Title className="text-xl font-medium leading-6 text-gray-900 dark:text-white">
                {t("shoppingList.addNewItem")}
              </Dialog.Title>
              <form onSubmit={handleSubmit(addItem)}>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    {t("shoppingList.itemName")}
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder={t("shoppingList.newItem")}
                  />
                  {errors.name && (
                    <span className="text-red-600 dark:text-red-400">
                      {t("shoppingList.nameIsRequired")}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    {t("shoppingList.itemCount")}
                  </label>
                  <input
                    {...register("itemCount", { required: true })}
                    className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder={t("shoppingList.itemCount")}
                    type="number"
                  />
                  {errors.itemCount && (
                    <span className="text-red-600 dark:text-red-400">
                      {t("shoppingList.itemCountIsRequired")}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 dark:bg-blue-700 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    {t("shoppingList.add")}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Dialog.Overlay className="fixed inset-0 blur-2xl bg-black opacity-30" />
        </Dialog>
      </Transition>

      <ul className="flex flex-col items-center">
        {propsItems.map((item) => {
          if (filter === Filter.COMPLETED && !item.isCompleted) return null;
          if (filter === Filter.UNCOMPLETED && item.isCompleted) return null;
          return (
            <li
              key={item.id}
              className="mb-2 bg-gray-100 dark:bg-gray-700 shadow-md p-3 min-w-[250px] sm:min-w-[400px] flex justify-between dark:text-white"
            >
              <span
                className={clsx(
                  item.isCompleted
                    ? "line-through text-gray-500 dark:text-gray-400"
                    : "text-black dark:text-white"
                )}
              >
                {item.name} - {item.itemCount}
              </span>
              <div className="flex">
                <button
                  className={clsx(
                    !item.isCompleted
                      ? "bg-green-500 dark:bg-green-700"
                      : "bg-gray-200 dark:bg-gray-500 !text-black dark:!text-white",
                    "ml-2 w-[100px] text-white px-2 py-1 rounded"
                  )}
                  onClick={() => toggleItem(item.id)}
                >
                  {item.isCompleted
                    ? t("shoppingList.return")
                    : t("shoppingList.resolve")}
                </button>
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

      {/* EditUsersModal and AddUserModal components */}
      <EditUsersModal
        isOpen={isEditUsersModalOpen}
        setIsOpen={setIsEditUsersModalOpen}
        users={mockDataListItem.users}
        setIsAddUserModalOpen={setIsAddUserModalOpen}
        deleteUser={deleteUser}
      />
      <AddUserModal
        isOpen={isAddUserModalOpen}
        setIsOpen={setIsAddUserModalOpen}
        addUser={addUser}
      />
    </div>
  );
};

export default ShoppingList;
