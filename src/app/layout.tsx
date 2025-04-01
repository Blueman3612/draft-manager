import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Draft Manager",
  description: "Softball League Draft Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between items-center">
                <div className="flex items-center">
                  <Link href="/" className="text-2xl font-bold text-primary-600">
                    Draft Manager
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/draft"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-secondary-900 hover:text-primary-600"
                  >
                    Draft Board
                  </Link>
                  <Link
                    href="/admin/teams"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-secondary-900 hover:text-primary-600"
                  >
                    Teams
                  </Link>
                  <Link
                    href="/admin/players"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-secondary-900 hover:text-primary-600"
                  >
                    Players
                  </Link>
                </div>
                <div className="flex items-center">
                  <Link
                    href="/login"
                    className="btn btn-primary"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-secondary-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-sm text-secondary-500">
                <p>© {new Date().getFullYear()} Softball League Draft Manager. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
