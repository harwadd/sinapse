"use client";
import api from "@/lib/api";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Shield, Zap } from "lucide-react";
import { useToast } from "@/components/ToastPopup";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { WorldMap } from "@/components/home/WorldMap";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const { login, admin } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Tentando fazer login com:", { username, password });

    try {
      console.log("Fazendo requisição para:", "http://localhost:8000/login");
      
      const response = await api.post("/login",
        new URLSearchParams({ username, password }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );

      console.log("Resposta recebida:", response.data);

      const token = response.data.access_token;
      const isadmin = response.data.admin;
      
      // Usar o contexto de auth para fazer login
      login(token);
      admin(isadmin);
      
      showToast("Logged in successfully!", "success");
      
      // Redirecionar para dashboard
      router.push("/dashboard");

    } catch (err) {
      const error = err as AxiosError<{ detail: string }>;
      console.error("Erro completo:", error);
      console.error("Detalhes do erro:", {
        message: error.message,
        code: error.code,
        response: error.response,
        request: error.request
      });

      if (error.response) {
        showToast(error.response.data.detail || "Erro no servidor", "error");
      } else if (error.request) {
        showToast("Erro de conexão. Verifique se o servidor está rodando.", "error");
      } else {
        showToast("Erro desconhecido", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = !username || !password || isSubmitting;

  return (
    <div className="relative min-h-screen bg-gray-950 overflow-hidden">
      {/* Fundo dark */}
      <div className="absolute inset-0 bg-gray-950"></div>
      
      {/* Mapa mundi em pontilhados */}
      <WorldMap />

      {/* Ícones flutuantes */}
      <div className="absolute top-20 left-10 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Shield className="w-6 h-6 text-white animate-pulse" />
        </motion.div>
      </div>
      
      <div className="absolute top-32 right-16 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Zap className="w-6 h-6 text-white animate-pulse" />
        </motion.div>
      </div>

      <div className="relative z-20 flex justify-center items-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Card principal com gradiente */}
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
            {/* Efeito de brilho no topo */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl"></div>
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-white mb-2">CyberTools</h1>
              <p className="text-gray-300 text-sm">Acesse sua conta para continuar</p>
            </motion.div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="flex items-center gap-3 border border-gray-600 rounded-lg px-4 py-3 bg-gray-800/50 backdrop-blur-sm hover:border-gray-500 transition-colors">
                  <User size={18} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
              >
                <div className="flex items-center gap-3 border border-gray-600 rounded-lg px-4 py-3 bg-gray-800/50 backdrop-blur-sm hover:border-gray-500 transition-colors">
                  <Lock size={18} className="text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
                  />
                </div>
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                type="submit"
                disabled={isDisabled}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 text-sm ${
                  isDisabled
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
                }`}
              >
                {isSubmitting ? "Verificando..." : "Entrar"}
              </motion.button>
            </form>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm text-center text-gray-400 mt-6"
            >
              Não tem uma conta?{" "}
              <a href="/register" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">Criar conta</a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}