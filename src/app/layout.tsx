import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/Button';
import { Tab } from '@/components/ui/Tab';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Draft Manager",
  description: "Softball League Draft Management System",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  const isAuthenticated = !!session;

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between items-center">
                <div className="flex items-center">
                  <Link href="/" className="text-2xl font-bold text-blue-600">
                    Draft Manager
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-1">
                  <Tab href="/draft">Draft Board</Tab>
                  {isAuthenticated && (
                    <>
                      <Tab href="/teams">Teams</Tab>
                      <Tab href="/players">Players</Tab>
                      <Tab href="/settings">Settings</Tab>
                    </>
                  )}
                </div>
                <div className="flex items-center">
                  {!isAuthenticated ? (
                    <Link href="/login">
                      <Button>Sign In</Button>
                    </Link>
                  ) : (
                    <form action="/auth/signout" method="POST">
                      <Button variant="outline" type="submit">
                        Sign Out
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-sm text-gray-500">
                <p>© {new Date().getFullYear()} Softball League Draft Manager. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
