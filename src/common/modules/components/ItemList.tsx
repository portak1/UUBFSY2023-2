import React, { Fragment, useEffect, useState } from "react";
import { Item } from "../types/Item";
import clsx from "clsx";
import { List } from "../types/List";
import { useForm } from "react-hook-form";
import { Transition, Dialog, Tab } from "@headlessui/react";
import { useUser } from "../contexts/UserContext";
import { User } from "../types/User";
import EditUsersModal from "./modals/EditUsersModal";
import AddUserModal, { IAddUserForm } from "./modals/AddUserModal";
import { uuid } from "../helpers";
import { useNavigate } from "react-router-dom";

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
  const [isEditUsersModalOpen, setIsEditUsersModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [propsItems, setPropsItems] = useState<Item[]>(mockDataListItem.items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(mockDataListItem.name);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const { user } = useUser();
  const navigate = useNavigate();

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

  const handleNameEditEnd = () => {
    setIsEditingName(false);
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
    <div className="p-4 w-1/2 text-center sm:w-full">
      <div className="flex items-center justify-center mb-4">
        {isEditingName ? (
          <input
            value={editedName}
            onChange={handleNameChange}
            onBlur={handleNameEditEnd}
            onKeyPress={(e) => e.key === "Enter" && handleNameEditEnd()}
            className="text-3xl font-bold bg-gray-100 focus:outline-none focus:border-gray-300 rounded"
          />
        ) : (
          <h1 className="text-3xl font-bold">{mockDataListItem.name}</h1>
        )}
        {isOwner && (
          <button
            className="ml-2 text-blue-600"
            onClick={() => setIsEditingName(!isEditingName)}
          >
            ✏️
          </button>
        )}
      </div>

      <Fragment>
        <button
          className={clsx(
            "mx-auto mr-3 text-gray-800 shadow-lg bg-gray-300 py-1 px-3 m-5 rounded-lg w-[150px]"
          )}
          onClick={() => setIsModalOpen(true)}
        >
          Nová položka
        </button>

        {/* Manage Users Button */}
        {isOwner && (
          <button
            className={clsx(
              "mx-auto  text-sm py-2 text-gray-800 shadow-lg bg-gray-200  px-3 m-5 rounded-lg w-[150px]"
            )}
            onClick={() => setIsEditUsersModalOpen(true)}
          >
            Spravovat uživatele
          </button>
        )}
        <button
          className={clsx(
            "mx-auto ml-3 text-white shadow-lg bg-red-500 py-1 px-3 m-5 rounded-lg w-[150px]"
          )}
          onClick={() => {
            setList({
              ...mockDataListItem,
              users: mockDataListItem.users.filter(
                (listUser) => listUser.user.id !== user?.id
              ),
            });
          }}
        >
          Opustit list
        </button>
      </Fragment>
      <Tab.Group>
        <Tab.List className="gap-6 my-5">
          <Tab
            onClick={() => {
              setFilter(Filter.ALL);
            }}
            className={clsx(
              filter === Filter.ALL && "!bg-green-400",
              "rounded-lg px-3 py-1 mx-1 transition-all bg-gray-200"
            )}
          >
            Vše
          </Tab>
          <Tab
            onClick={() => {
              setFilter(Filter.COMPLETED);
            }}
            className={clsx(
              filter === Filter.COMPLETED && "!bg-green-400",
              "rounded-lg px-3 py-1 mx-1 transition-all bg-gray-200"
            )}
          >
            Vyřešené
          </Tab>
          <Tab
            onClick={() => {
              setFilter(Filter.UNCOMPLETED);
            }}
            className={clsx(
              filter === Filter.UNCOMPLETED && "!bg-green-400",
              "rounded-lg px-3 py-1 mx-1 transition-all bg-gray-200"
            )}
          >
            Nevyřešené
          </Tab>
        </Tab.List>
      </Tab.Group>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setIsModalOpen}
        >
          <div className="min-h-screen px-4  text-center">
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block w-full mx-auto max-h-[350px] my-auto inset-0 fixed max-w-md p-6 overflow-hidden text-left align-middle bg-white shadow-xl rounded-2xl z-50">
              <Dialog.Title className="text-xl font-medium leading-6 text-gray-900">
                Add New Item
              </Dialog.Title>
              <form onSubmit={handleSubmit(addItem)}>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="Item name"
                  />
                  {errors.name && (
                    <span className="text-red-600">Name is required</span>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Item Count
                  </label>
                  <input
                    {...register("itemCount", { required: true })}
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="Item count"
                    type="number"
                  />
                  {errors.itemCount && (
                    <span className="text-red-600">Item count is required</span>
                  )}
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    Add
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
              className={`mb-2 bg-gray-100 shadow-md p-3 min-w-[400px] flex justify-between`}
            >
              <span
                className={clsx(
                  item.isCompleted
                    ? " line-through text-gray-500"
                    : "text-black"
                )}
              >
                {item.name} - {item.itemCount}
              </span>
              <div className="flex">
                <button
                  className={clsx(
                    !item.isCompleted
                      ? "bg-green-500"
                      : "bg-gray-200 !text-black",
                    "ml-2 w-[100px] text-white px-2 py-1 rounded"
                  )}
                  onClick={() => toggleItem(item.id)}
                >
                  {item.isCompleted ? "Vrátit" : "Vyřešit"}
                </button>
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
