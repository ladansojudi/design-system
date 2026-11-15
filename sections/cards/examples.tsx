"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cards";

// Composed examples: product patterns built from the Card parts, not
// components of their own.

export function InsightExample({ title, rows }: { title: string; rows: { label: string; value: string | number }[] }) {
  return (
    <Card>
      <CardHeader className="pt-4">
        <CardTitle>{title}</CardTitle>
        <Button intent="primary" variant="ghost" size="sm" className="-mr-2 text-snt-12">
          View details <ArrowRight />
        </Button>
      </CardHeader>
      <CardContent className="pt-1">
        <dl className="divide-y divide-snt-border-default">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between py-3">
              <dt className="text-snt-12 text-snt-text-secondary">{r.label}</dt>
              <dd className="text-snt-14 font-semibold tabular-nums text-snt-text-primary">{r.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

export function AlertExample({ title, count, heading, description, action }: { title: string; count: number; heading: string; description: string; action: string }) {
  return (
    <Card>
      <CardHeader className="border-b border-snt-border-default pb-4 pt-4">
        <CardTitle>{title}</CardTitle>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-snt-border-default px-2 py-0.5 text-snt-11 font-medium text-snt-text-secondary">
          <span aria-hidden className="snt-pulse-dot size-1.5 rounded-full bg-snt-severity-high" />
          {count} active
        </span>
      </CardHeader>
      <CardContent className="space-y-1 pb-3">
        <p className="text-snt-14 font-semibold text-snt-text-primary">{heading}</p>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="pb-4">
        <Button intent="primary" variant="ghost" size="sm" className="-ml-2 text-snt-12">
          {action} <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
