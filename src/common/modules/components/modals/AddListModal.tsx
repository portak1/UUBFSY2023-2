// AddUserModal.tsx

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit, reset } = useForm<IAddListForm>();

  const onSubmit = (data: IAddListForm) => {
    addList(data);
    setIsOpen(false);
    reset();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={() => setIsOpen(false)}>
        <div className="min-h-screen flex items-center px-4 text-center">
          {/* Add User Form */}
          <div className="inline-block max-h-[400px] mt-52 border border-black px-20 w-full fixed inset-0 z-[100] mx-auto max-w-md p-6 overflow-hidden text-left align-middle bg-white shadow-xl rounded-2xl">
            <Dialog.Title className="text-xl font-medium leading-6 text-gray-900">
              Vytvořit nový seznam
            </Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Jméno
                </label>
                <input
                  {...register("name", { required: true })}
                  className="mt-1 block w-full rounded-md bg-gray-100"
                />
              </div>
              <div className="mt-4">
                <button
                  className="flex items-center p-3 px-10 justify-center bg-green-500 rounded-lg mx-auto"
                  type="submit"
                >
                  Vytvořit
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
