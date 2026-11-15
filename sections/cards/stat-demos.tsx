"use client";

import { BarChart2, Link2, RefreshCw, Sparkles } from "lucide-react";
import { StatCard } from "@/components/ui/cards";

// Client wrappers: icon components can't be passed from a Server Component.

export function StatDemo() {
  return <StatCard icon={Link2} title="Total URLs" value="816" trend={{ direction: "down", value: "23%", label: "from last month", positive: true }} />;
}

export function StatGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <StatDemo />
      <StatCard icon={BarChart2} title="Unique requests" value="1,091" trend={{ direction: "up", value: "12%", label: "from last month" }} />
      <StatCard icon={RefreshCw} title="Crawlers started" value="329" description="Number of crawlers started since the beginning." />
      <StatCard icon={Sparkles} title="Enrichments" value="14" description="Enrichment records found across crawler scans." />
    </div>
  );
}
