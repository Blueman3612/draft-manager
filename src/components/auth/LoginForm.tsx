'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isRegistering) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        
        if (error) throw error;
        
        setShowConfirmationMessage(true);
        setIsRegistering(false);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        setShowSuccessMessage(true);
        // Wait a moment to show the success message before redirecting
        setTimeout(() => {
          // Redirect based on user role (this is a simplified version)
          if (email.includes('admin')) {
            router.push('/admin/draft');
          } else if (email.includes('manager')) {
            router.push('/draft/team/1');
          } else {
            router.push('/');
          }
        }, 1500);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isRegistering ? 'Register' : 'Login'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {showConfirmationMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Please check your email to confirm your account. After confirmation, you can log in.
        </div>
      )}
      
      {showSuccessMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Login successful! Redirecting...
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400"
        >
          {loading ? (isRegistering ? 'Registering...' : 'Signing in...') : (isRegistering ? 'Register' : 'Sign In')}
        </button>
      </form>
      
      <div className="mt-4 text-center space-y-2">
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-sm text-gray-600 hover:underline block w-full"
        >
          {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Register"}
        </button>
        <Link href="/" className="text-sm text-gray-600 hover:underline block">
          Back to Draft Board
        </Link>
      </div>
    </div>
  );
} 