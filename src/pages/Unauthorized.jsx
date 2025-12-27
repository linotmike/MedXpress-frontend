import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Home } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-[calc(100vh-180px)] grid place-items-center px-4 py-8">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">403</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page with your current role.</p>
        </div>

        <Card className="shadow-md border-gray-200 mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> You can switch roles from the account dropdown in the top-right menu to test different features.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button asChild className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold py-6">
                  <Link to="/" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Go Back Home
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-sm text-gray-500">
          If you believe this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
}
