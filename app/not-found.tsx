"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 safe-area-x">
      <div className="text-center">
        <p className="text-champagne-400/50 text-xs uppercase tracking-[0.3em] font-medium mb-4">Error</p>
        <h1 className="font-display text-7xl text-white mb-2">404</h1>
        <p className="text-white/40 text-lg mb-8">This page doesn&apos;t exist.</p>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
