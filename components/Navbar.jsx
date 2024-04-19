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
import { usePathname } from 'next/navigation';
import { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import LoginButton from './UI/buttons/LoginBtn';
import PrimaryButton from './UI/buttons/PrimaryBtn';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { data: session } = useSession();

  const pathname = usePathname();
  const profileImage = session?.user?.image;

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

  return (
    <Disclosure
      as="nav"
      className="bg-white border-b-2  border-gray-200 mb-1 sticky top-0 z-50"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-12 items-center justify-between">
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
                      className="h-8 w-8 text-black"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
                {/* mobile hamburger menu */}
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
                    {session && (
                      <>
                        <Link href="/properties/add">
                          <PrimaryButton text="add property" />
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Login Button  */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!session && (
                  <div className="hidden sm:flex items-center space-x-4">
                    {providers &&
                      Object.values(providers).map((provider, index) => (
                        <button
                          key={index}
                          onClick={() => signIn(provider.id)}
                          type="button"
                        >
                          <LoginButton text="Login" />
                        </button>
                      ))}
                  </div>
                )}

                {session && (
                  <div className='className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"'>
                    <button
                      type="button"
                      className="relative rounded-full  p-1 text-gray-400 hover:text-white "
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon
                        className="h-8 w-8 text-black "
                        aria-hidden="true"
                      />
                    </button>

                    {/* UserIcon dropdown */}
                    <Menu as="div" className="relative ml-3">
                      {profileImage ? (
                        <div>
                          <Menu.Button className="relative rounded-full p-1 text-gray-400 hover:text-white  ">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <Image
                              className="h-8 w-8 rounded-full"
                              alt=""
                              src={profileImage}
                              width={0}
                              height={0}
                            />
                          </Menu.Button>
                        </div>
                      ) : (
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
                      )}
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
                              <Link
                                href="/profile"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                User Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => {
                                  signOut();
                                }}
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
                <Link href="/properties/add">Add property</Link>
              </Disclosure.Button>
              <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-700  ">
                {session ? null : (
                  <div>
                    {providers &&
                      Object.values(providers).map((provider, index) => (
                        <button
                          key={index}
                          onClick={() => signIn(provider.id)}
                          type="button"
                        >
                          <LoginButton text="Login" />
                        </button>
                      ))}
                  </div>
                )}
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
