import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "../auth/AuthContext";
import { ROLES } from "../auth/roles";
import { ChevronDown, LogOut, MapPin, ShoppingBag, Phone, Mail, Github } from "lucide-react";

const navLinkClass = ({ isActive }) =>
  `inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition ${
    isActive
      ? "bg-blue-500 text-white"
      : "text-gray-700 hover:bg-gray-100"
  }`;

function RolePill({ role }) {
  const label =
    role === ROLES.PATIENT
      ? "Patient"
      : role === ROLES.PHARMACY_ADMIN
      ? "Pharmacy Admin"
      : role === ROLES.RIDER
      ? "Rider"
      : "Admin";

  const colors = {
    [ROLES.PATIENT]: "bg-blue-100 text-blue-700",
    [ROLES.PHARMACY_ADMIN]: "bg-green-100 text-green-700",
    [ROLES.RIDER]: "bg-purple-100 text-purple-700",
  };

  return (
    <Badge className={`rounded-full ${colors[role] || "bg-gray-100 text-gray-700"}`}>
      {label}
    </Badge>
  );
}

export default function AppShell({ children }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const role = auth.user?.role;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 hover:opacity-80 transition"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MedXpress</h1>
                <p className="text-xs text-gray-500">Pharmacy Delivery</p>
              </div>
            </button>

            {/* Center Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {auth.isAuthenticated && (
                <>
                  <NavLink to="/pharmacies" className={navLinkClass}>
                    <MapPin className="w-4 h-4 mr-1" />
                    Pharmacies
                  </NavLink>
                  <NavLink to="/orders" className={navLinkClass}>
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Orders
                  </NavLink>
                </>
              )}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {auth.isAuthenticated && role && <RolePill role={role} />}

              {!auth.isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="rounded-lg text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate("/login")}
                  >
                    Log in
                  </Button>
                  <Button
                    className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </Button>
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="rounded-full gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                        {auth.user?.name?.[0]?.toUpperCase() || "U"}
                      </div>
                      <span className="hidden sm:inline text-sm">
                        {auth.user?.name?.split(" ")[0] || "Account"}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex items-center justify-between">
                      <span>{auth.user?.name}</span>
                      {role && <RolePill role={role} />}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                      className="text-red-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          {auth.isAuthenticated && (
            <nav className="md:hidden flex items-center gap-1 pb-3 border-t border-gray-100 pt-3">
              <NavLink to="/pharmacies" className={navLinkClass}>
                <MapPin className="w-4 h-4 mr-1" />
                Pharmacies
              </NavLink>
              <NavLink to="/orders" className={navLinkClass}>
                <ShoppingBag className="w-4 h-4 mr-1" />
                Orders
              </NavLink>
               {role === ROLES.PHARMACY_ADMIN && (
              <NavLink to="/medicines" className={navLinkClass}>
                 Medicines
              </NavLink>
                )}

              {role === ROLES.RIDER && (
              <NavLink to="/rider/deliveries" className={navLinkClass}>
                Deliveries
              </NavLink>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
                  M
                </div>
                <h2 className="text-lg font-bold text-gray-900">MedXpress</h2>
              </div>
              <p className="text-sm text-gray-600">Fast, reliable pharmacy delivery at your doorstep.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-600 hover:text-blue-500 transition">Home</a></li>
                {auth.isAuthenticated && (
                  <>
                    <li><a href="/pharmacies" className="text-gray-600 hover:text-blue-500 transition">Pharmacies</a></li>
                    <li><a href="/orders" className="text-gray-600 hover:text-blue-500 transition">My Orders</a></li>
                  </>
                )}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  +1 (555) 000-0000
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  support@medxpress.com
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-sm text-gray-600">
                © 2025 MedXpress. All rights reserved.
              </p>
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
