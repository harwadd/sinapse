"use client";
import api from "@/lib/api";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Mail, Shield, Zap, Cpu } from "lucide-react";
import { useToast } from "@/components/ToastPopup";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { WorldMap } from "@/components/home/WorldMap";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Tentando registrar com:", { username, email, password: "***" });

    try {
      console.log("Fazendo requisição para:", "http://localhost:8000/register");
      
      const response = await api.post("/register",
        new URLSearchParams({ username, email, password }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );

      console.log("Resposta recebida:", response.data);

      showToast("Account created successfully!", "success");

      // Limpar formulário
      setUsername("");
      setEmail("");
      setPassword("");

      // Redirecionar para login
      router.push("/login");

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

  const isDisabled = !username || !email || !password || isSubmitting;

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

      <div className="absolute bottom-20 left-20 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Cpu className="w-6 h-6 text-white animate-pulse" />
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
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-t-2xl"></div>
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-white mb-2">CyberTools</h1>
              <p className="text-gray-300 text-sm">Crie sua conta para começar</p>
            </motion.div>
            
            <form onSubmit={handleRegister} className="space-y-6">
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
                  <Mail size={18} className="text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
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
                transition={{ duration: 0.6, delay: 0.6 }}
                type="submit"
                disabled={isDisabled}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 text-sm ${
                  isDisabled
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 hover:shadow-lg hover:shadow-green-500/25 transform hover:scale-105"
                }`}
              >
                {isSubmitting ? "Criando..." : "Criar Conta"}
              </motion.button>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-sm text-center text-gray-400 mt-6"
            >
              Já tem uma conta? <a href="/login" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">Entrar</a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}