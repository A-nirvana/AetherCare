'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';
import clsx from 'clsx';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Statistics', href: '/statistic' },
  { name: 'Health Tips', href: '/health' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Logout', href: '/login' },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-[#0fc100] text-white w-60 min-h-screen px-5 py-10 flex flex-col rounded-r-[2.5rem] shadow-2xl">
      {/* Logo + Title */}
      <div className="flex items-center mb-20 mt-5">
        <img
          src="https://res.cloudinary.com/dmhbmurzw/image/upload/v1750528328/ChatGPT_Image_Jun_21_2025_04_48_40_PM_xk4fe2.png"
          alt="AetherCare Logo"
          className="w-12 h-12"
        />
        <h2
          className={clsx(
            montserrat.className,
            'text-2xl font-black tracking-wide text-white'
          )}
        >
          AetherCare
        </h2>
      </div>

      {/* Nav Items */}
      <ul className="space-y-5 font-medium">
        {navItems.map(({ name, href }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

          return (
            <li key={name}>
              <Link
                href={href}
                className={clsx(
                  montserrat.className,
                  'block text-[1.1rem] font-semibold px-5 py-3 transition-all duration-300 rounded-3xl',
                  {
                    'bg-white text-[#0fc100] shadow-lg scale-[1.03]': isActive,
                    'hover:bg-white hover:text-[#0fc100] hover:shadow-md': !isActive,
                  }
                )}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="mt-auto pt-10 text-xs text-center text-white/80">
        © 2025 AetherCare
      </div>
    </aside>
  );
};

export default Sidebar;
