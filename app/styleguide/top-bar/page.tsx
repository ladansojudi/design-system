import type { Metadata } from "next";
import { Sparkles, Bell } from "lucide-react";
import { PageHeader } from "@/components/styleguide/page-header";
import { TopBarShowcase } from "@/sections/top-bar/top-bar-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Top Bar — Design System",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-10">
      <PageHeader category="Organisms" title="Top Bar" status="stable" description="Persistent header with a Test Mode toggle on the left and Ask AI, notifications and account on the right." />

      <TopBarShowcase />

      <Anatomy
        parts={[
          { label: "Container",       description: "52px-tall surface spanning the viewport width, aligned with the Sidebar header." },
          { label: "Test Mode pill",  description: "Left-side pill with a pulsing red dot when active; turns into a dashed “Try demo data” trigger when off." },
          { label: "Ask AI",          description: "Text button with Sparkles icon; colorful ripple animation and color-cycling icon on hover." },
          { label: "Notification bell", description: "Icon button with an unread red dot in the top-right of the bell." },
          { label: "Divider",         description: "Thin vertical line that separates product actions from account controls." },
          { label: "Avatar",          description: "Circular initial badge that opens the account menu on click." },
        ]}
      >
        <div className="w-full max-w-2xl flex items-center h-[52px] px-4 bg-s4e-surface-app border border-s4e-neutral-divider-10 rounded-xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-s4e-scale-red-50 text-s4e-scale-red-600">
            <span className="s4e-pulse-dot w-[7px] h-[7px] rounded-full bg-s4e-scale-red-500 shrink-0" />
            <span className="text-[11px] font-semibold">Test Mode</span>
          </span>
          <div className="ml-auto flex items-center gap-1">
            <span className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-[12px] font-semibold">
              <Sparkles size={14} className="ai-gradient-icon" />
              <span className="ai-gradient-text">Ask AI</span>
            </span>
            <span className="w-px h-5 bg-s4e-neutral-divider-10 mx-1.5" />
            <span className="relative w-8 h-8 rounded-lg flex items-center justify-center text-s4e-text-secondary">
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full bg-s4e-scale-red-500 ring-2 ring-s4e-surface-app" />
            </span>
            <span className="w-px h-5 bg-s4e-neutral-divider-10 mx-1.5" />
            <span className="w-8 h-8 rounded-full bg-s4e-neutral-grey-200 border border-s4e-neutral-divider-10 text-s4e-text-primary text-[12px] font-semibold flex items-center justify-center">S</span>
          </div>
        </div>
      </Anatomy>

      <UseCases
        items={[
          "Use the Top Bar on every authenticated page — it's the persistent entry point for Ask AI, notifications and the account menu.",
          "Use the Test Mode pill to let a user load demo data on their dashboard — primarily a sales / onboarding aid.",
          "Swap Test Mode pill for the “Try demo data” trigger when no demo is currently running.",
          "Animate Ask AI only on hover — the shimmer signals intelligence without being distracting at rest.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Keep the Top Bar at 52px — it aligns with the Sidebar header for a clean grid." },
          { type: "dont", text: "Don't pack more than four right-side icons; move secondary actions into the account menu." },
          { type: "do",   text: "Show the Test Mode pulse only while demo data is live, not just hover or idle." },
          { type: "dont", text: "Don't animate Ask AI constantly; the shimmer must be triggered by hover (or first-run tooltip)." },
          { type: "do",   text: "Put a red dot on the Bell only when the user has unread notifications; remove it on open." },
          { type: "dont", text: "Don't stack badges on the avatar — put upgrade CTAs in the Sidebar footer, not here." },
        ]}
      />
    </div>
  );
}
