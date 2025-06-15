'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';
import clsx from 'clsx';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

const navItems = [
  { name: 'Dashboard', href: '/' },
  { name: 'Statistics', href: 'src/app/pages/statistics.jsx' },
  { name: 'Health Tips', href: '/health' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Logout', href: '/login' },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-[#0fc100] text-white w-60 min-h-screen p-6 rounded-tr-3xl rounded-3xl">
      <h2 className={`${montserrat.className} text-2xl mb-20 mt-5 font-[600]`}>AetherCare</h2>
      <ul className="space-y-5 font-medium">
        {navItems.map(({ name, href }) => {
          const isActive = pathname === href;
          return (
            <li key={name}>
              <Link
                href={href}
                className={clsx(
                  montserrat.className,
                  'text-[1.1rem] font-[500] px-4 py-2 rounded-xl block transition-all duration-300',
                  {
                    'bg-gray-50 text-[#0fc100] shadow-xl rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl pt-3 pb-3': isActive,
                    'hover:bg-gray-50 hover:text-[#0fc100] pt-3 pb-3 overflow-hidden rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl': !isActive,
                  }
                )}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
