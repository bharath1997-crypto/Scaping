"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { storeAuthTokens } from "@/lib/auth-api";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError("Authentication failed. Please try again.");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
      return;
    }

    if (accessToken && refreshToken) {
      // Store tokens
      storeAuthTokens(accessToken, refreshToken);

      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      setError("Invalid authentication response");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <div>
            <div className="text-red-600 text-lg font-medium mb-2">⚠️ {error}</div>
            <p className="text-gray-600">Redirecting to login...</p>
          </div>
        ) : (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Completing sign in...</p>
          </div>
        )}
      </div>
    </div>
  );
}

