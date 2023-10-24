'use client';

import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Data', href: '/' },
  { name: 'Graph', href: '/graph' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white shadow-sm">
        <div className="flex h-16 sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                pathname === item.href
                  ? 'border-slate-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
              )}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
