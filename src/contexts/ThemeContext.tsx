"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Theme {
  id: string;
  name: string;
  description: string;
  dashboard: {
    background: string;
    cards: string;
    borders: string;
    text: string;
    textSecondary: string;
  };
  sidebar: {
    background: string;
    borders: string;
    text: string;
    textSecondary: string;
    active: string;
    hover: string;
  };
}

const themes: Theme[] = [
  {
    id: 'dark-modern',
    name: 'Dark Modern',
    description: 'Tema escuro moderno com tons de cinza',
    dashboard: {
      background: 'bg-zinc-900',
      cards: 'bg-zinc-700',
      borders: 'border-zinc-600',
      text: 'text-white',
      textSecondary: 'text-zinc-300'
    },
    sidebar: {
      background: 'bg-zinc-800',
      borders: 'border-zinc-700',
      text: 'text-white',
      textSecondary: 'text-zinc-400',
      active: 'bg-zinc-700',
      hover: 'hover:bg-zinc-700/50'
    }
  },
  {
    id: 'light-modern',
    name: 'Light Modern',
    description: 'Tema claro moderno e limpo',
    dashboard: {
      background: 'bg-zinc-100',
      cards: 'bg-white',
      borders: 'border-zinc-200',
      text: 'text-zinc-900',
      textSecondary: 'text-zinc-600'
    },
    sidebar: {
      background: 'bg-white',
      borders: 'border-zinc-200',
      text: 'text-zinc-900',
      textSecondary: 'text-zinc-500',
      active: 'bg-zinc-100',
      hover: 'hover:bg-zinc-50'
    }
  },
  {
    id: 'dark-blue',
    name: 'Dark Blue',
    description: 'Tema escuro com tons azuis',
    dashboard: {
      background: 'bg-slate-900',
      cards: 'bg-slate-800',
      borders: 'border-slate-700',
      text: 'text-white',
      textSecondary: 'text-slate-300'
    },
    sidebar: {
      background: 'bg-slate-800',
      borders: 'border-slate-700',
      text: 'text-white',
      textSecondary: 'text-slate-400',
      active: 'bg-slate-700',
      hover: 'hover:bg-slate-700/50'
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Tema cyberpunk com tons escuros',
    dashboard: {
      background: 'bg-black',
      cards: 'bg-zinc-900',
      borders: 'border-zinc-800',
      text: 'text-white',
      textSecondary: 'text-zinc-300'
    },
    sidebar: {
      background: 'bg-black',
      borders: 'border-zinc-800',
      text: 'text-white',
      textSecondary: 'text-zinc-400',
      active: 'bg-zinc-900',
      hover: 'hover:bg-zinc-900/50'
    }
  },
  {
    id: 'contrast',
    name: 'Contrast',
    description: 'Sidebar claro com dashboard escuro',
    dashboard: {
      background: 'bg-zinc-900',
      cards: 'bg-zinc-700',
      borders: 'border-zinc-600',
      text: 'text-white',
      textSecondary: 'text-zinc-300'
    },
    sidebar: {
      background: 'bg-white',
      borders: 'border-zinc-200',
      text: 'text-zinc-900',
      textSecondary: 'text-zinc-500',
      active: 'bg-zinc-100',
      hover: 'hover:bg-zinc-50'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Tema minimalista e clean',
    dashboard: {
      background: 'bg-gray-50',
      cards: 'bg-white',
      borders: 'border-gray-200',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600'
    },
    sidebar: {
      background: 'bg-white',
      borders: 'border-gray-200',
      text: 'text-gray-900',
      textSecondary: 'text-gray-500',
      active: 'bg-gray-50',
      hover: 'hover:bg-gray-50'
    }
  }
];

interface ThemeContextType {
  currentTheme: Theme;
  themes: Theme[];
  setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme) {
      const theme = themes.find(t => t.id === savedTheme);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
  }, []);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('selected-theme', themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, themes, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 