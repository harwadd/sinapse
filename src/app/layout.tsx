import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { RouteGuard } from "@/components/RouteGuard";
import { Sidebar } from "@/components/sidebar";
import TopLoadingBar from "@/components/TopLoadingBar";
import { DataCollector } from "@/components/DataCollector";
import { ToastProvider } from "@/components/ToastPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATOMIC EYE - The Eye That Sees Everything",
  description: "Supreme Intelligence System - Divine Vision, Total Automation and Destructive Power",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <SidebarProvider>
              <ToastProvider>
                <DataCollector />
                <div className="flex min-h-screen">
                  <Sidebar />
                  <main className="flex-1 md:ml-0">
                    <RouteGuard>
                      {children}
                    </RouteGuard>
                  </main>
                </div>
              </ToastProvider>
            </SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}