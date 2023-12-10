import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../types/User"; // Assuming you have a User type

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
  const { t } = useTranslation();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={() => setIsOpen(false)}>
        <div className="min-h-screen px-4 text-center">
          {/* User List */}
          <div className="inline-block  mx-auto fixed inset-0 z-50 max-w-md p-6 overflow-hidden w-[90%] text-left align-middle bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
            <Dialog.Title className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-200">
              {t("editUsersModal.editUsers")}
            </Dialog.Title>

            {users.map(({ isOwner, user }) => (
              <div
                key={user.id}
                className="flex justify-between items-center mt-4"
              >
                <span className="dark:text-gray-200">
                  {user.name} {isOwner && t("editUsersModal.owner")}
                </span>
                <button
                  className="text-red-600 dark:text-red-400"
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}

            <button
              className="mt-4 rounded-lg bg-green-500 dark:bg-green-600 px-3 py-2"
              onClick={() => {
                setIsAddUserModalOpen(true);
                setIsOpen(false);
              }}
            >
              {t("editUsersModal.addUser")}
            </button>
          </div>{" "}
          <Dialog.Overlay className="fixed inset-0 blur-2xl bg-black opacity-30" />
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditUsersModal;
