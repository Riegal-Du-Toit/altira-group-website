"use client";

import { useRouter } from "next/navigation";

import NotFound from "@/components/ui/demo";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen [&>div]:!h-screen">
      <NotFound onBack={() => router.back()} />
    </main>
  );
}
