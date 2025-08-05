"use client";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

export function Footer() {
    const { currentTheme } = useTheme();

    return (
        <footer className={`w-full ${currentTheme.dashboard.background} mt-12 py-10 text-sm border-t ${currentTheme.dashboard.borders}`}>
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h4 className={`mb-2 font-semibold ${currentTheme.dashboard.text}`}>Ferramentas</h4>
                    <ul>
                        <li><Link href="#" className={`${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} transition-colors`}>OSINT Tools</Link></li>
                        <li><Link href="#" className={`${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} transition-colors`}>Automações</Link></li>
                        <li><Link href="#" className={`${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} transition-colors`}>Security Scanner</Link></li>
                        <li><Link href="#" className={`${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} transition-colors`}>Proxy Manager</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className={`mb-2 font-semibold ${currentTheme.dashboard.text}`}>Planos</h4>
                    <ul>
                        <li><Link href="#" className={`${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} transition-colors`}>Básico</Link></li>
                        <li><Link href="#" className={`${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} transition-colors`}>Profissional</Link></li>
                        <li><Link href="#" className={`${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} transition-colors`}>Enterprise</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className={`mb-2 font-semibold ${currentTheme.dashboard.text}`}>Suporte</h4>
                    <ul>
                        <li><Link href="#" className={`${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} transition-colors`}>Documentação</Link></li>
                        <li><Link href="#" className={`${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} transition-colors`}>Tutoriais</Link></li>
                        <li><Link href="#" className={`${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} transition-colors`}>FAQ</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className={`mb-2 font-semibold ${currentTheme.dashboard.text}`}>Contato</h4>
                    <ul className="flex flex-col gap-1">
                        <li>
                            <Link href="#" className={`flex items-center gap-2 ${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} transition-colors`}>
                                <img src="https://ext.same-assets.com/2213466344/2335707712.svg" className="h-4 w-4" alt="Telegram" /> Telegram
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={`${currentTheme.dashboard.textSecondary} hover:${currentTheme.dashboard.text} transition-colors`}>Email: contato@cybertools.com</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`mt-10 text-center ${currentTheme.dashboard.textSecondary}`}>
                Powered by <span className={`font-bold ${currentTheme.dashboard.text}`}>CyberTools</span> - Multi-Ferramentas de Segurança Cibernética.<br />All rights reserved © 2024
            </div>
        </footer>
    )
}