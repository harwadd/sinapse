"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Users, Settings, Eye, Shield, Zap } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import UserManagement from "@/components/admin/UserManagement";
import PlanManagement from "@/components/admin/PlanManagement";
import StressMethods from "@/components/admin/StressMethods";
import VisitorMonitoring from "@/components/admin/VisitorMonitoring";

type AdminTab = "users" | "plans" | "methods" | "visitors";

export default function AdminPanel() {
  const { currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<AdminTab>("visitors");

  const tabs = [
    {
      id: "visitors" as AdminTab,
      label: "Monitoring",
      icon: <Eye className="w-5 h-5" />,
      description: "Total surveillance system"
    },
    {
      id: "users" as AdminTab,
      label: "Users",
      icon: <Users className="w-5 h-5" />,
      description: "User management"
    },
    {
      id: "plans" as AdminTab,
      label: "Plans",
      icon: <Settings className="w-5 h-5" />,
      description: "Plan configuration"
    },
    {
      id: "methods" as AdminTab,
      label: "Methods",
      icon: <Zap className="w-5 h-5" />,
      description: "Attack methods"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "visitors":
        return <VisitorMonitoring />;
      case "users":
        return <UserManagement />;
      case "plans":
        return <PlanManagement />;
      case "methods":
        return <StressMethods />;
      default:
        return <VisitorMonitoring />;
    }
  };

  return (
    <div className={`min-h-screen p-6 ${currentTheme.dashboard.background}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 ${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} rounded-xl`}>
              <Crown className={`w-8 h-8 ${currentTheme.dashboard.text}`} />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${currentTheme.dashboard.text}`}>Elite Panel</h1>
              <p className={currentTheme.dashboard.textSecondary}>Total control of the ATOMIC EYE system</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? `${currentTheme.dashboard.cards} border ${currentTheme.dashboard.borders} shadow-lg`
                    : `${currentTheme.dashboard.cards.replace('bg-', 'bg-').replace('zinc-700', 'zinc-600')} border ${currentTheme.dashboard.borders} hover:${currentTheme.dashboard.cards} hover:shadow-lg`
                }`}
              >
                <div className={`${activeTab === tab.id ? currentTheme.dashboard.text : currentTheme.dashboard.textSecondary}`}>
                  {tab.icon}
                </div>
                <div className="text-left">
                  <h3 className={`font-semibold ${activeTab === tab.id ? currentTheme.dashboard.text : currentTheme.dashboard.textSecondary}`}>
                    {tab.label}
                  </h3>
                  <p className={`text-sm ${currentTheme.dashboard.textSecondary}`}>
                    {tab.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}