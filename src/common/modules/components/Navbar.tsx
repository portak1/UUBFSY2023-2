import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import ThemeSelector from "./ThemeSelector";

const navigation = [{ name: "Shopping list", href: "/", current: true }];

export default function Navbar() {
  const { logout, user } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Disclosure as="nav" className="bg-green-700 dark:bg-green-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">{t("navbar.openMenu")}</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center text-green-300 dark:text-green-400">
                  Shopping List Homework
                </div>
              </div>
              <div className="flex gap-5 flex-row">
                <ThemeSelector className="mr-[10px] hidden md:visible md:flex max-w-[66px]" />
                <LanguageSelector className="mr-[10px] hidden md:visible md:flex max-w-[66px]" />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-green-700 dark:bg-green-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">
                        {t("navbar.openUserMenu")}
                      </span>
                      {user?.name}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              logout();
                              navigate("/login");
                            }}
                            className={clsx(
                              active ? "bg-gray-100 dark:bg-gray-700" : "",
                              "block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                            )}
                          >
                            {t("navbar.signOut")}
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={clsx(
                    item.current
                      ? "bg-gray-900 dark:bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}

              <div className="flex gap-5 flex-row">
                <ThemeSelector className="mr-[10px] w-full" />
                <LanguageSelector className="mr-[10px] w-full" />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
