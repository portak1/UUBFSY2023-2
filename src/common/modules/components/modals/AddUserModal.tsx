import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface IAddUserForm {
  name: string;
  isOwner: boolean;
  email: string;
}

interface IAddUserModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addUser: (user: IAddUserForm) => void;
}

const AddUserModal: React.FC<IAddUserModalProps> = ({
  isOpen,
  setIsOpen,
  addUser,
}) => {
  const { register, handleSubmit, reset } = useForm<IAddUserForm>();
  const { t } = useTranslation();

  const onSubmit = (data: IAddUserForm) => {
    addUser(data);
    setIsOpen(false);
    reset();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={() => setIsOpen(false)}>
        <div className="min-h-screen flex items-center px-4 text-center">
          {/* Add User Form */}
          <div className="inline-block max-h-[400px] mt-52 border border-black dark:border-gray-700 px-20 w-[90%] fixed inset-0 z-[100] mx-auto max-w-md p-6 overflow-hidden text-left align-middle bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
            <Dialog.Title className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-200">
              {t("addUserModal.addUser")}
            </Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("addUserModal.name")}
                </label>
                <input
                  {...register("name", { required: true })}
                  className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("addUserModal.email")}
                </label>
                <input
                  {...register("email", { required: true })}
                  className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("addUserModal.isOwner")}
                </label>
                <input type="checkbox" {...register("isOwner")} />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="flex items-center p-3 px-10 justify-center bg-green-500 dark:bg-green-600 rounded-lg mx-auto"
                >
                  {t("addUserModal.add")}
                </button>
              </div>
            </form>
          </div>
          <Dialog.Overlay className="fixed z-[60] inset-0 blur-2xl bg-black opacity-30" />
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddUserModal;
