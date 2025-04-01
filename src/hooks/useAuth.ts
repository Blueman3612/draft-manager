import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export type UserRole = 'admin' | 'manager' | 'viewer' | null;

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setUserRole(determineUserRole(session?.user?.email));
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setUserRole(determineUserRole(session?.user?.email));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return {
    user,
    userRole,
    loading,
    signOut,
  };
}

function determineUserRole(email: string | undefined): UserRole {
  if (!email) return null;
  if (email.includes('admin')) return 'admin';
  if (email.includes('manager')) return 'manager';
  return 'viewer';
} 