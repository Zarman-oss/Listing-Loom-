'use client';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  HomeModernIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoginButton from './loginBtn';
import PrimaryButton from './primaryBtn';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedInMenu] = useState(false);

  return (
    <Disclosure
      as="nav"
      className="bg-white border-b-2  border-gray-400 mb-1 sticky top-0 z-50"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* desktop nav */}

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center ml-2">
                  <Link href="/">
                    <HomeModernIcon
                      className="h-12 w-12 text-black"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex flex-col-1  m-8 ">
                    {pathname === '/properties' ? (
                      <Link href="/properties" className="bg-red-700">
                        <PrimaryButton text="properties" />
                      </Link>
                    ) : (
                      <Link href="/properties" className="">
                        <PrimaryButton text="properties" />
                      </Link>
                    )}
                    {isLoggedIn && (
                      <>
                        <Link href="/properties">
                          <PrimaryButton text="add property" />
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!isLoggedIn && (
                  <Link className="" href="/login">
                    <LoginButton />
                  </Link>
                )}

                {isLoggedIn && (
                  <div className='className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"'>
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>

                    {/* UserIcon dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <UserIcon
                            className="h-6 w-6 rounded-full text-white"
                            alt="Logo"
                          />
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/properties"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                See Properties
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                User Settings
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Logout
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="flex-col-1 space-y-2 px-4 py-3">
              <Disclosure.Button
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700  hover:bg-gray-300"
                aria-current="page"
              >
                <Link href="/">Home</Link>
              </Disclosure.Button>
              <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-700  hover:bg-gray-300">
                <Link href="/properties">Properties</Link>
              </Disclosure.Button>
              <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-700  hover:bg-gray-300">
                <Link href="/properties">Add property</Link>
              </Disclosure.Button>
              <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-700  ">
                {isLoggedIn ? null : (
                  <Link href="/login">
                    <LoginButton />
                  </Link>
                )}
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
