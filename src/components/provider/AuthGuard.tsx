'use client';
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Loading from "../common/loading";
import { useAuth } from "@/hooks/useAuth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated && !["/auth/login", "/auth/signup"].includes(pathName)) {
        router.replace("/auth/login");
      } else if (isAuthenticated && ["/auth/login", "/auth/signup"].includes(pathName)) {
        router.replace("/backlog");
      }
    }
  }, [isAuthenticated, loading, pathName, router]);

  if (loading) return <Loading />;

  return <>{children}</>;
}