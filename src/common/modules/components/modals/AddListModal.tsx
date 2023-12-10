import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface IAddListForm {
  name: string;
}

interface IAddUserModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addList: (user: IAddListForm) => void;
}

const AddListModal: React.FC<IAddUserModalProps> = ({
  isOpen,
  setIsOpen,
  addList,
}) => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm<IAddListForm>();

  const onSubmit = (data: IAddListForm) => {
    addList(data);
    setIsOpen(false);
    reset();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={() => setIsOpen(false)}>
        <div className="min-h-screen  flex items-center px-4 text-center">
          {/* Add User Form */}
          <div className="inline-block max-h-[400px] mt-52 border border-black dark:border-gray-700 px-20 w-[90%] fixed inset-0 z-[100] mx-auto max-w-md p-6 overflow-hidden text-left align-middle bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
            <Dialog.Title className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-200">
              {t("addListModal.createNewList")}
            </Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("addListModal.name")}
                </label>
                <input
                  {...register("name", { required: true })}
                  className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700"
                />
              </div>
              <div className="mt-4">
                <button
                  className="flex items-center p-3 px-10 justify-center bg-green-500 dark:bg-green-600 rounded-lg mx-auto"
                  type="submit"
                >
                  {t("addListModal.create")}
                </button>
              </div>
            </form>
          </div>{" "}
          <Dialog.Overlay className="fixed z-[60] inset-0 blur-2xl bg-black opacity-30" />
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddListModal;
