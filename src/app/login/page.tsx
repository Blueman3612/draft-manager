import Header from '@/components/layout/Header';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto">
        <LoginForm />
      </div>
    </main>
  );
} 