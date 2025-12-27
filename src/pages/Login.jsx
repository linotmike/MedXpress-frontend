import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "../auth/AuthContext";
import { ROLES } from "../auth/roles";
import { Eye, EyeOff, Lock, Mail, Chrome, Apple } from "lucide-react";

export default function Login() {
  const { loginDev } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const canSubmit = useMemo(() => {
    return email.trim().length >= 3 && password.trim().length >= 3;
  }, [email, password]);

  const handleGoogleLogin = () => {
    toast.message("Google login integration coming soon");
    // TODO: Implement Google OAuth
  };

  const handleAppleLogin = () => {
    toast.message("Apple login integration coming soon");
    // TODO: Implement Apple OAuth
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);

    try {
      // Dev mode login (swap with backend later)
      loginDev(ROLES.PATIENT);

      toast.success("Welcome back");
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to access MedXpress</p>
        </div>

        <Card className="shadow-md border-gray-200">
          <CardContent className="pt-8">
            <form className="space-y-5" onSubmit={onSubmit}>
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
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-900">Password</label>
                  <button
                    type="button"
                    className="text-xs text-muted-foreground hover:text-foreground transition"
                    onClick={() => toast.message("Password reset will be added later.")}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-9 pr-10 h-11 rounded-xl"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                className="w-full h-11 rounded-xl"
                disabled={!canSubmit || submitting}
              >
                {submitting ? "Signing in..." : "Continue"}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-xs text-gray-500">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                  onClick={handleGoogleLogin}
                >
                  <Chrome className="w-5 h-5" />
                  Continue with Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                  onClick={handleAppleLogin}
                >
                  <Apple className="w-5 h-5" />
                  Continue with Apple
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <Link to="/register" className="text-foreground underline underline-offset-4">
                  Create account
                </Link>
              </div>

              <div className="pt-2 text-xs text-muted-foreground">
                Dev role switching is available in the top-right menu after login.
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to MedXpress terms and privacy policy (to be added).
        </div>
      </div>
    </div>
  );
}
