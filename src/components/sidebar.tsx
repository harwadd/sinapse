"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Eye, 
  Search, 
  Bot, 
  Shield, 
  Network, 
  Terminal, 
  Code, 
  Zap,
  Menu,
  X,
  Crown,
  LayoutDashboard,
  User,
  Settings
} from "lucide-react";

const sidebarItems = [
  {
    category: null, // Dashboard sem categoria
    items: [
      { href: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    ]
  },
  {
    category: "System",
    items: [
      { href: "/osint", icon: <Search size={20} />, label: "Divine Vision" },
      { href: "/automation", icon: <Bot size={20} />, label: "Supreme Automation" },
      { href: "/security", icon: <Shield size={20} />, label: "Elite Scanner" },
      { href: "/network", icon: <Network size={20} />, label: "Global Mapping" },
      { href: "/panel", icon: <Zap size={20} />, label: "Destructive Power" },
    ]
  },
  {
    category: "Power",
    items: [
      { href: "/terminal", icon: <Terminal size={20} />, label: "Bash" },
      { href: "/api", icon: <Code size={20} />, label: "Docs" },
    ]
  },
  {
    category: "Advanced",
    items: [
      { href: "/admin", icon: <Crown size={20} />, label: "Elite Panel" },
    ]
  },
  {
    category: "User",
    items: [
      { href: "/profile", icon: <User size={20} />, label: "Profile" },
      { href: "/settings", icon: <Settings size={20} />, label: "Settings" },
    ]
  }
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const { currentTheme } = useTheme();
  const { isLogged, isLoading } = useAuth();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) return null;

  // Não mostrar o sidebar na página inicial ou se não estiver logado
  if (pathname === '/' || !isLogged) return null;

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -256 }}
        animate={{ x: sidebarOpen ? 0 : -256 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className={`fixed inset-y-0 left-0 z-50 w-72 ${currentTheme.dashboard.background} border-r ${currentTheme.dashboard.borders} shadow-2xl md:relative md:translate-x-0 md:z-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`p-6 border-b ${currentTheme.dashboard.borders}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg`}>
                  <Eye className={`w-6 h-6 ${currentTheme.dashboard.text}`} />
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${currentTheme.dashboard.text}`}>ATOMIC EYE</h1>
                  <p className={`text-xs ${currentTheme.dashboard.textSecondary}`}>The Eye That Sees Everything</p>
                </div>
              </div>
              <button
                onClick={toggleSidebar}
                className={`p-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg md:hidden`}
              >
                <X className={`w-5 h-5 ${currentTheme.dashboard.text}`} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto sidebar-scroll">
            <nav className="p-4 space-y-6">
              {sidebarItems.map((section, sectionIndex) => (
                <div key={section.category || 'dashboard'}>
                  {section.category && (
                    <h3 className={`text-xs font-semibold uppercase tracking-wider ${currentTheme.dashboard.textSecondary} mb-3 px-3`}>
                      {section.category}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => {
                      const isActive = pathname === item.href;
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                        >
                          <a
                            href={item.href}
                            className={`sidebar-item group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                              isActive 
                                ? `sidebar-item-active bg-zinc-700/50 ${currentTheme.dashboard.text} border border-zinc-600 shadow-sm` 
                                : `bg-transparent ${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} hover:bg-zinc-700/30`
                            }`}
                          >
                            <div className={`sidebar-icon flex-shrink-0 ${isActive ? currentTheme.dashboard.text : currentTheme.dashboard.textSecondary}`}>
                              {item.icon}
                            </div>
                            <span className="font-medium text-sm">{item.label}</span>
                          </a>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className={`p-4 border-t ${currentTheme.dashboard.borders}`}>
            <div className="text-center">
              <div className={`text-xs ${currentTheme.dashboard.textSecondary} mb-1`}>ATOMIC EYE</div>
              <div className={`text-xs ${currentTheme.dashboard.textSecondary.replace('text-', 'text-').replace('zinc-400', 'zinc-500')}`}>v1.0 • Elite</div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-lg md:hidden shadow-lg`}
      >
        <Menu className={`w-5 h-5 ${currentTheme.dashboard.text}`} />
      </button>
    </>
  );
}