// EditUsersModal.tsx

import { Dialog, Transition } from "@headlessui/react";
import { set, useForm } from "react-hook-form";
import { User } from "../types/User"; // Assuming you have a User type
import { Fragment } from "react";

interface IEditUsersModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  users: { user: User; isOwner: boolean }[];
  deleteUser: (userId: string) => void;
  setIsAddUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditUsersModal: React.FC<IEditUsersModalProps> = ({
  isOpen,
  setIsOpen,
  users,
  deleteUser,
  setIsAddUserModalOpen,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={() => setIsOpen(false)}>
        <div className="min-h-screen px-4 text-center">
          {/* User List */}
          <div className="inline-block w-full mx-auto fixed inset-0 z-50 max-w-md p-6 overflow-hidden text-left align-middle bg-white shadow-xl rounded-2xl">
            <Dialog.Title className="text-xl font-medium leading-6 text-gray-900">
              Edit Users
            </Dialog.Title>

            {users.map(({ isOwner, user }) => (
              <div
                key={user.id}
                className="flex justify-between items-center mt-4"
              >
                <span>
                  {user.name} {isOwner && "(Owner)"}
                </span>
                <button
                  className="text-red-600"
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}

            <button
              className="mt-4 rounded-lg bg-green-500 px-3 py-2"
              onClick={() => {
                setIsAddUserModalOpen(true);
                setIsOpen(false);
              }}
            >
              Add User
            </button>
          </div>{" "}
          <Dialog.Overlay className="fixed inset-0 blur-2xl bg-black opacity-30" />
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditUsersModal;
