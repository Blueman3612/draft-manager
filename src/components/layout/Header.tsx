'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type HeaderProps = {
  userRole?: 'admin' | 'manager' | 'viewer' | null;
  teamName?: string;
};

export default function Header({ userRole, teamName }: HeaderProps) {
  const pathname = usePathname();
  
  return (
    <header className="border-b border-gray-200 py-4 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Softball League Draft
          </Link>
          {teamName && (
            <span className="ml-4 text-gray-600">Team: {teamName}</span>
          )}
        </div>
        
        <div>
          {!userRole ? (
            <Link 
              href="/login" 
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              {userRole === 'admin' && <span className="text-sm font-semibold">Admin</span>}
              <Link 
                href="/login?logout=true" 
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {userRole === 'admin' && (
        <nav className="mt-4">
          <ul className="flex gap-6">
            <li>
              <Link 
                href="/draft" 
                className={`${pathname === '/draft' ? 'font-bold' : ''}`}
              >
                Draft Board
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/teams" 
                className={`${pathname === '/admin/teams' ? 'font-bold' : ''}`}
              >
                Teams
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/players" 
                className={`${pathname === '/admin/players' ? 'font-bold' : ''}`}
              >
                Players
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/settings" 
                className={`${pathname === '/admin/settings' ? 'font-bold' : ''}`}
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
} 