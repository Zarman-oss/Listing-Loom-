'use client';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  BookmarkIcon,
  HomeIcon,
  HomeModernIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import LoginButton from './UI/buttons/LoginBtn';
import PrimaryButton from './UI/buttons/PrimaryBtn';

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
      className="bg-white border-b-2 border-gray-200 mb-1 sticky top-0 z-50"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-12 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Desktop nav */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center ml-2">
                  <Link href="/">
                    <HomeModernIcon
                      className="h-8 w-8 text-black"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 ">
                    <Link href="/properties">
                      <PrimaryButton
                        text="Properties"
                        className={classNames(
                          pathname === '/properties' ? 'bg-red-700' : '',
                          'mx-2'
                        )}
                      />
                    </Link>
                    {session && (
                      <Link href="/properties/add">
                        <PrimaryButton text="Add Property" className="mx-2" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!session ? (
                  <div className="hidden sm:flex items-center space-x-4">
                    {providers &&
                      Object.values(providers).map((provider, index) => (
                        <button
                          key={index}
                          onClick={() => signIn(provider.id)}
                          type="button"
                        >
                          <LoginButton />
                        </button>
                      ))}
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      className="rounded-full p-1 text-gray-400 hover:text-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon
                        className="h-8 w-8 text-black"
                        aria-hidden="true"
                      />
                    </button>

                    {/* UserIcon dropdown */}
                    <Menu as="div" className="relative">
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        {profileImage ? (
                          <Image
                            className="h-8 w-8 rounded-full"
                            alt=""
                            src={profileImage}
                            width={32}
                            height={32}
                          />
                        ) : (
                          <UserIcon className="h-6 w-6 rounded-full text-white" />
                        )}
                      </Menu.Button>
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
                              <Link
                                href="/properties"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                <HomeIcon className="w-5 h-5 mr-3 text-gray-700 inline" />
                                See Properties
                              </Link>
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
                                <UserIcon className="w-5 h-5 mr-3 text-gray-700 inline" />
                                User Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/properties/saved"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                <BookmarkIcon className="w-5 h-5 mr-3 text-gray-700 inline" />
                                Saved Listings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => signOut()}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block w-full text-left px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Logout
                                <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3 text-gray-700 inline" />
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
            <div className="space-y-2 px-4 py-3">
              <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-300">
                <Link href="/">Home</Link>
              </Disclosure.Button>
              <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-300">
                <Link href="/properties">Properties</Link>
              </Disclosure.Button>
              {session && (
                <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-300">
                  <Link href="/properties/add">Add Property</Link>
                </Disclosure.Button>
              )}
              {!session && (
                <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-700">
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
                </Disclosure.Button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
