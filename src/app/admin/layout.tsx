import React from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Admin Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 py-4">
            <Link
              href="/admin/teams"
              className="text-sm font-medium text-gray-900 hover:text-blue-600"
            >
              Teams
            </Link>
            <Link
              href="/admin/players"
              className="text-sm font-medium text-gray-900 hover:text-blue-600"
            >
              Players
            </Link>
            <Link
              href="/admin/settings"
              className="text-sm font-medium text-gray-900 hover:text-blue-600"
            >
              Settings
            </Link>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
} 