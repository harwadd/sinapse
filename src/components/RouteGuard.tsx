"use client";
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

interface RouteGuardProps {
  children: React.ReactNode;
}

const publicRoutes = ['/login', '/register', '/'];
const authRoutes = ['/login', '/register'];
const adminRoutes = ['/admin']; // <- restritas para admin

export function RouteGuard({ children }: RouteGuardProps) {
  const { isLogged, isLoading, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Redireciona admin para dashboard se tentar acessar login/register
    if (isLogged && authRoutes.includes(pathname)) {
      router.push('/dashboard');
      return;
    }

    // Bloqueia usuários não logados em rotas privadas
    if (!isLogged && !publicRoutes.includes(pathname)) {
      router.push('/login');
      return;
    }

    // Bloqueia usuários não-admin tentando acessar rota admin
    if (isLogged && adminRoutes.includes(pathname) && !isAdmin) {
      router.push('/dashboard');
      return;
    }
  }, [isLogged, isLoading, isAdmin, pathname, router]);

  // Tela de loading minimalista e bonita
  if (isLoading && pathname !== '/') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="bg-gray-900 border border-gray-700 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
              <Eye className="w-8 h-8 text-blue-400" />
            </div>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-bold text-white mb-2"
          >
            ATOMIC EYE
          </motion.h1>
          
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 text-sm mb-8"
          >
            The Eye That Sees Everything
          </motion.p>

          {/* Loading spinner simples */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <div className="w-8 h-8 border-2 border-gray-700 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          </motion.div>

          {/* Texto de status */}
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-gray-400 text-sm"
          >
            Verifying authentication...
          </motion.p>
        </div>
      </div>
    );
  }

  if (isLogged && authRoutes.includes(pathname)) return null;
  if (!isLogged && !publicRoutes.includes(pathname)) return null;
  if (isLogged && adminRoutes.includes(pathname) && !isAdmin) return null;

  return <>{children}</>;
}
