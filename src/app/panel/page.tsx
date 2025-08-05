"use client";
import React, { useState } from 'react';
import AttackLogs from '@/components/panel/AttackLogs';
import Panel from '@/components/panel/Panel';
import { useTheme } from "@/contexts/ThemeContext";

export default function DashboardAttack() {
  const { currentTheme } = useTheme();

  return (
    <div className={`min-h-screen p-6 ${currentTheme.dashboard.background}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${currentTheme.dashboard.text}`}>Stress Testing</h1>
          <p className={currentTheme.dashboard.textSecondary}>Ferramentas avançadas para testes de carga e performance</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Panel />
          </div>
          <div className="lg:col-span-1">
            <AttackLogs />
          </div>
        </div>
      </div>
    </div>
  );
}
