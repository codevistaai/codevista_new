import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { Zap, Home, FolderOpen, Settings, Menu, X, LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "Dashboard", 
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "Build Website",
    url: createPageUrl("Builder"),
    icon: Zap,
  },
  {
    title: "My Projects",
    url: createPageUrl("Projects"),
    icon: FolderOpen,
  },
  {
    title: "Settings",
    url: createPageUrl("Settings"),
    icon: Settings,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await User.logout();
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = createPageUrl("Home");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogin = async () => {
    try {
      await User.loginWithRedirect(window.location.href);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <style>{`
        :root {
          --primary: 225 100% 50%;
          --primary-foreground: 210 40% 98%;
          --secondary: 210 40% 96%;
          --secondary-foreground: 222.2 84% 4.9%;
          --muted: 210 40% 96%;
          --muted-foreground: 215.4 16.3% 46.9%;
          --accent: 210 40% 96%;
          --accent-foreground: 222.2 84% 4.9%;
          --destructive: 0 84.2% 60.2%;
          --destructive-foreground: 210 40% 98%;
          --border: 214.3 31.8% 91.4%;
          --input: 214.3 31.8% 91.4%;
          --ring: 221.2 83.2% 53.3%;
          --radius: 0.75rem;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Responsive improvements */
        @media (max-width: 768px) {
          .mobile-hidden { display: none; }
          .mobile-full { width: 100%; }
        }
      `}</style>

      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and App Name */}
            <div className="flex items-center gap-3">
              <Link to={createPageUrl("Home")} className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-bold text-xl text-gray-900 hidden sm:block">AI WebBuilder</h2>
              </Link>
            </div>

            {/* Desktop Navigation */}
            {isAuthenticated && (
              <nav className="hidden md:flex items-center gap-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      location.pathname === item.url
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="mobile-hidden">{item.title}</span>
                  </Link>
                ))}
              </nav>
            )}

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 p-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user?.full_name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <span className="hidden sm:block text-sm font-medium text-gray-700">
                        {user?.full_name || 'User'}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("Settings")} className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                >
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              {isAuthenticated && (
                <div className="md:hidden">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <span className="sr-only">Open main menu</span>
                    {mobileMenuOpen ? (
                      <X className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Menu className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isAuthenticated && mobileMenuOpen && (
          <nav className="md:hidden px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-3 ${
                  location.pathname === item.url
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}