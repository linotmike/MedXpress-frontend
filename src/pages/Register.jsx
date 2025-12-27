import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../auth/AuthContext";
import { ROLES } from "../auth/roles";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

export default function Register() {
  const { loginDev } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const canSubmit = name.trim().length >= 2 && email.trim().length >= 3 && password.length >= 6 && password === confirmPassword;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    try {
      loginDev(ROLES.PATIENT);
      setTimeout(() => navigate("/pharmacies"), 200);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-180px)] grid place-items-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            M
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join MedXpress to order medicines</p>
        </div>

        <Card className="shadow-md border-gray-200">
          <CardContent className="pt-8">
            <form className="space-y-5" onSubmit={onSubmit}>
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <Input
                    className="pl-12 h-12 rounded-lg border-gray-300 text-gray-900 placeholder-gray-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <Input
                    className="pl-12 h-12 rounded-lg border-gray-300 text-gray-900 placeholder-gray-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    type="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <Input
                    className="pl-12 pr-10 h-12 rounded-lg border-gray-300 text-gray-900 placeholder-gray-500"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 transition"
                    onClick={() => setShowPw(!showPw)}
                  >
                    {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <Input
                    className="pl-12 pr-10 h-12 rounded-lg border-gray-300 text-gray-900 placeholder-gray-500"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 transition"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {password !== confirmPassword && confirmPassword && (
                <p className="text-sm text-red-600">Passwords do not match</p>
              )}

              <Button
                className="w-full h-12 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base"
                disabled={!canSubmit || submitting}
              >
                {submitting ? "Creating Account..." : "Create Account"}
              </Button>

              <div className="text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
                  Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-gray-500">
          By creating an account, you agree to MedXpress terms and privacy policy
        </div>
      </div>
    </div>
  );
}
