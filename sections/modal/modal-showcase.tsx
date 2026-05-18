"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { X, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Shared: backdrop + container ───────────────────────────────────────────

function ModalShell({
  open,
  onClose,
  size = "sm",
  children,
}: {
  open:     boolean;
  onClose:  () => void;
  size?:    "sm" | "md" | "lg";
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const widthClass = size === "sm" ? "max-w-sm" : size === "md" ? "max-w-md" : "max-w-2xl";

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={cn(
          "relative w-full bg-s4e-surface-app border border-s4e-neutral-divider-10 rounded-xl shadow-xl",
          widthClass,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-s4e-neutral-divider-10">
      <span className="text-[14px] font-semibold text-s4e-text-primary">{title}</span>
      <button
        type="button"
        onClick={onClose}
        className="w-7 h-7 rounded-md hover:bg-s4e-neutral-grey-100 flex items-center justify-center text-s4e-text-disabled hover:text-s4e-text-primary transition-colors"
      >
        <X size={15} />
      </button>
    </div>
  );
}

// ── Trigger button ─────────────────────────────────────────────────────────

function Trigger({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center h-9 px-4 rounded-lg border border-s4e-neutral-divider-10 bg-s4e-surface-app text-[13px] font-medium text-s4e-text-primary hover:border-s4e-brand-primary-500 hover:text-s4e-brand-primary-500 transition-colors"
    >
      {children}
    </button>
  );
}

// ── 1. Alert — single action ───────────────────────────────────────────────

function AlertModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <ModalShell open={open} onClose={onClose} size="sm">
      <div className="px-5 pt-5 pb-4">
        <div className="w-10 h-10 rounded-full bg-s4e-scale-green-50 flex items-center justify-center mb-3">
          <CheckCircle size={18} className="text-s4e-scale-green-600" />
        </div>
        <div className="text-[14px] font-semibold text-s4e-text-primary mb-1">Scan completed</div>
        <p className="text-[13px] text-s4e-text-disabled leading-relaxed">
          We finished scanning your asset. All detected findings are now available in the dashboard.
        </p>
      </div>
      <div className="flex justify-end px-5 pb-4">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center h-9 px-4 rounded-lg bg-s4e-btn-primary-600 hover:bg-s4e-btn-primary-700 text-white text-[13px] font-medium transition-colors"
        >
          Got it
        </button>
      </div>
    </ModalShell>
  );
}

// ── 2. Confirm — two actions, optional destructive ────────────────────────

function ConfirmModal({
  open,
  onClose,
  destructive = false,
}: {
  open:         boolean;
  onClose:      () => void;
  destructive?: boolean;
}) {
  return (
    <ModalShell open={open} onClose={onClose} size="sm">
      <div className="px-5 pt-5 pb-4">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center mb-3",
          destructive ? "bg-s4e-scale-red-50" : "bg-s4e-scale-yellow-50",
        )}>
          {destructive
            ? <AlertTriangle size={18} className="text-s4e-scale-red-600" />
            : <Info           size={18} className="text-s4e-scale-yellow-600" />
          }
        </div>
        <div className="text-[14px] font-semibold text-s4e-text-primary mb-1">
          {destructive ? "Delete asset?" : "Restart continuous monitoring?"}
        </div>
        <p className="text-[13px] text-s4e-text-disabled leading-relaxed">
          {destructive
            ? "This permanently removes the asset and all of its findings. This action cannot be undone."
            : "Monitoring will resume on the next scan cycle. You can pause again at any time."
          }
        </p>
      </div>
      <div className="flex justify-end gap-2 px-5 pb-4">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center h-9 px-4 rounded-lg border border-s4e-neutral-divider-10 text-[13px] font-medium text-s4e-text-primary hover:bg-s4e-neutral-grey-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "inline-flex items-center h-9 px-4 rounded-lg text-white text-[13px] font-medium transition-colors",
            destructive
              ? "bg-s4e-scale-red-600 hover:bg-s4e-scale-red-700"
              : "bg-s4e-btn-primary-600 hover:bg-s4e-btn-primary-700",
          )}
        >
          {destructive ? "Delete" : "Restart"}
        </button>
      </div>
    </ModalShell>
  );
}

// ── 3. Onboarding — gated form with terms toggles ──────────────────────────

function Toggle({
  checked,
  onChange,
}: {
  checked:  boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative w-9 h-[22px] rounded-full transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-s4e-brand-primary-500",
        checked
          ? "bg-s4e-btn-primary-600 hover:bg-s4e-btn-primary-700"
          : "bg-s4e-neutral-grey-300 hover:bg-s4e-neutral-grey-400",
      )}
    >
      <div
        className={cn(
          "absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out",
          checked ? "translate-x-[18px]" : "translate-x-[3px]",
        )}
      />
    </button>
  );
}

function OnboardingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [agreeTerms,   setAgreeTerms]   = useState(false);
  const [allowScan,    setAllowScan]    = useState(false);
  const [confirmAuth,  setConfirmAuth]  = useState(false);

  const canSubmit = agreeTerms && allowScan && confirmAuth;

  // Reset toggles when the modal re-opens so the showcase always starts fresh.
  useEffect(() => {
    if (!open) {
      setAgreeTerms(false);
      setAllowScan(false);
      setConfirmAuth(false);
    }
  }, [open]);

  return (
    <ModalShell open={open} onClose={onClose} size="md">
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <span className="text-[15px] font-semibold text-s4e-text-primary">Add asset</span>
        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 rounded-full border border-s4e-neutral-divider-10 flex items-center justify-center text-s4e-text-disabled hover:text-s4e-text-primary hover:border-s4e-text-disabled transition-colors"
        >
          <X size={13} />
        </button>
      </div>

      <div className="px-5 pb-5 space-y-4">
        <div className="space-y-1.5">
          <textarea
            rows={2}
            placeholder="Write your asset (Domain, Subdomain, IPv4/IPv6 Address, CIDR Subnet)"
            className="w-full px-3 py-2 rounded-lg border border-s4e-neutral-divider-10 bg-s4e-surface-app text-[13px] text-s4e-text-primary placeholder:text-s4e-text-disabled outline-none focus:border-s4e-brand-primary-500 focus:ring-2 focus:ring-s4e-brand-primary-500/20 transition-colors resize-none"
          />
          <p className="text-[11px] text-s4e-text-disabled">
            To add more than one asset, type each asset on a separate line.
          </p>
        </div>

        <div className="space-y-1.5">
          <textarea
            rows={2}
            placeholder="You can write a description for your asset here."
            className="w-full px-3 py-2 rounded-lg border border-s4e-neutral-divider-10 bg-s4e-surface-app text-[13px] text-s4e-text-primary placeholder:text-s4e-text-disabled outline-none focus:border-s4e-brand-primary-500 focus:ring-2 focus:ring-s4e-brand-primary-500/20 transition-colors resize-none"
          />
          <p className="text-[11px] text-s4e-text-disabled">
            Description&apos;s length must be between 3 and 300 characters
          </p>
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex items-center gap-3">
            <Toggle checked={agreeTerms} onChange={setAgreeTerms} />
            <span className="text-[12px] text-s4e-text-primary">
              I have read and agree to the{" "}
              <a href="#" className="text-s4e-brand-primary-500 hover:underline">Terms</a>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Toggle checked={allowScan} onChange={setAllowScan} />
            <span className="text-[12px] text-s4e-text-primary">
              I allow regular scanning for vulnerabilities specified in the{" "}
              <a href="#" className="text-s4e-brand-primary-500 hover:underline">terms</a>.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Toggle checked={confirmAuth} onChange={setConfirmAuth} />
            <span className="text-[12px] text-s4e-text-primary">
              I confirm that I have authority over assets.
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={onClose}
          className={cn(
            "w-full h-10 rounded-lg text-[13px] font-medium transition-colors mt-1",
            canSubmit
              ? "bg-s4e-btn-primary-600 hover:bg-s4e-btn-primary-700 text-white"
              : "bg-s4e-neutral-grey-200 text-s4e-text-disabled cursor-not-allowed",
          )}
        >
          Add Asset
        </button>
      </div>
    </ModalShell>
  );
}

// ── 4. Detail — large scrollable content ──────────────────────────────────

function DetailModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <ModalShell open={open} onClose={onClose} size="lg">
      <ModalHeader title="CVE-2014-0224 · Detail" onClose={onClose} />
      <div className="px-5 py-5 max-h-[60vh] overflow-y-auto space-y-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-md px-2.5 py-1 bg-s4e-scale-red-50 border-l-[3px] border-s4e-scale-red-500 text-[12px] font-medium text-s4e-scale-red-600">
            High
          </span>
          <span className="text-[12px] text-s4e-text-disabled">Found on 18 Apr 2026</span>
        </div>

        <div className="space-y-1.5">
          <div className="text-[12px] font-semibold uppercase tracking-widest text-s4e-text-disabled">Description</div>
          <p className="text-[13px] text-s4e-text-primary leading-relaxed">
            OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h does not properly restrict processing of ChangeCipherSpec messages,
            which allows man-in-the-middle attackers to trigger use of a zero-length master key.
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="text-[12px] font-semibold uppercase tracking-widest text-s4e-text-disabled">Affected assets</div>
          <ul className="text-[13px] text-s4e-text-primary space-y-1">
            <li>• zero.webappsecurity.com:443</li>
            <li>• server.lababidi.it:443</li>
          </ul>
        </div>

        <div className="space-y-1.5">
          <div className="text-[12px] font-semibold uppercase tracking-widest text-s4e-text-disabled">Recommended fix</div>
          <p className="text-[13px] text-s4e-text-primary leading-relaxed">
            Upgrade OpenSSL to 0.9.8za, 1.0.0m, or 1.0.1h. Restart any services that load the library.
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-2 px-5 py-3.5 border-t border-s4e-neutral-divider-10">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center h-9 px-4 rounded-lg border border-s4e-neutral-divider-10 text-[13px] font-medium text-s4e-text-primary hover:bg-s4e-neutral-grey-100 transition-colors"
        >
          Close
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center h-9 px-4 rounded-lg bg-s4e-btn-primary-600 hover:bg-s4e-btn-primary-700 text-white text-[13px] font-medium transition-colors"
        >
          Open ticket
        </button>
      </div>
    </ModalShell>
  );
}

// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

function VariantRow({
  label,
  description,
  children,
}: {
  label:       string;
  description: string;
  children:    React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-5">
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-s4e-text-primary">{label}</div>
        <div className="text-[12px] text-s4e-text-disabled mt-0.5">{description}</div>
      </div>
      {children}
    </div>
  );
}

// ── Showcase ───────────────────────────────────────────────────────────────

type ModalKey = "alert" | "confirm" | "destructive" | "onboarding" | "detail" | null;

export function ModalShowcase() {
  const [open, setOpen] = useState<ModalKey>(null);
  const close = () => setOpen(null);

  return (
    <div className="space-y-10">

      <div>
        <SectionTitle>Variants</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl divide-y divide-s4e-neutral-divider-10">

          <div className="px-6 py-4">
            <VariantRow label="Alert" description="Single-action information or success confirmation.">
              <Trigger onClick={() => setOpen("alert")}>Show Alert</Trigger>
            </VariantRow>
          </div>

          <div className="px-6 py-4">
            <VariantRow label="Confirm" description="Two-action prompt before applying a change.">
              <Trigger onClick={() => setOpen("confirm")}>Show Confirm</Trigger>
            </VariantRow>
          </div>

          <div className="px-6 py-4">
            <VariantRow label="Confirm · Destructive" description="Red primary button for irreversible actions.">
              <Trigger onClick={() => setOpen("destructive")}>Show Destructive</Trigger>
            </VariantRow>
          </div>

          <div className="px-6 py-4">
            <VariantRow label="Onboarding · Gated" description="Asset-entry form gated by terms toggles; CTA activates once all are on.">
              <Trigger onClick={() => setOpen("onboarding")}>Show Onboarding</Trigger>
            </VariantRow>
          </div>

          <div className="px-6 py-4">
            <VariantRow label="Detail" description="Large modal with scrollable content for deep-dive views.">
              <Trigger onClick={() => setOpen("detail")}>Show Detail</Trigger>
            </VariantRow>
          </div>

        </div>
      </div>

      {/* Portals */}
      <AlertModal   open={open === "alert"}      onClose={close} />
      <ConfirmModal open={open === "confirm"}    onClose={close} />
      <ConfirmModal open={open === "destructive"} onClose={close} destructive />
      <OnboardingModal open={open === "onboarding"} onClose={close} />
      <DetailModal     open={open === "detail"}     onClose={close} />

    </div>
  );
}
