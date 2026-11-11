"use client";

import type React from "react";
import { useState } from "react";
import { X, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExampleCard } from "@/components/styleguide/example-card";
import { Modal, ModalHeader as UIModalHeader, ModalTitle } from "@/components/ui/modal";
import { SeverityBadge } from "@/components/ui/severity-badge";

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
  // The shipped Modal: focus trap, Escape, focus restore, scroll lock, inert page.
  return (
    <Modal open={open} onOpenChange={(next) => { if (!next) onClose(); }} size={size}>
      {children}
    </Modal>
  );
}

function ModalHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <UIModalHeader onClose={onClose}>
      <ModalTitle>{title}</ModalTitle>
    </UIModalHeader>
  );
}

// ── Trigger button ─────────────────────────────────────────────────────────

function Trigger({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center h-9 px-4 rounded-lg border border-snt-neutral-divider-10 bg-snt-surface-app text-[14px] font-medium text-snt-text-primary hover:border-snt-brand-primary-500 hover:text-snt-brand-primary-500 transition-colors"
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
        <div className="w-10 h-10 rounded-full bg-snt-scale-green-50 flex items-center justify-center mb-3">
          <CheckCircle size={18} className="text-snt-scale-green-600" />
        </div>
        <div className="text-[14px] font-semibold text-snt-text-primary mb-1">Scan completed</div>
        <p className="text-[14px] text-snt-text-disabled leading-relaxed">
          We finished scanning your asset. All detected findings are now available in the dashboard.
        </p>
      </div>
      <div className="flex justify-end px-5 pb-4">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center h-9 px-4 rounded-lg bg-snt-btn-primary-600 hover:bg-snt-btn-primary-700 text-white text-[14px] font-medium transition-colors"
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
          destructive ? "bg-snt-scale-red-50" : "bg-snt-scale-yellow-50",
        )}>
          {destructive
            ? <AlertTriangle size={18} className="text-snt-scale-red-600" />
            : <Info           size={18} className="text-snt-scale-yellow-600" />
          }
        </div>
        <div className="text-[14px] font-semibold text-snt-text-primary mb-1">
          {destructive ? "Delete asset?" : "Restart continuous monitoring?"}
        </div>
        <p className="text-[14px] text-snt-text-disabled leading-relaxed">
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
          className="inline-flex items-center h-9 px-4 rounded-lg border border-snt-neutral-divider-10 text-[14px] font-medium text-snt-text-primary hover:bg-snt-neutral-grey-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "inline-flex items-center h-9 px-4 rounded-lg text-white text-[14px] font-medium transition-colors",
            destructive
              ? "bg-snt-scale-red-600 hover:bg-snt-scale-red-700"
              : "bg-snt-btn-primary-600 hover:bg-snt-btn-primary-700",
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
        "relative w-9 h-[22px] rounded-full transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-snt-brand-primary-500",
        checked
          ? "bg-snt-btn-primary-600 hover:bg-snt-btn-primary-700"
          : "bg-snt-neutral-grey-300 hover:bg-snt-neutral-grey-400",
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

  // Reset the toggles on every close so the showcase always reopens fresh.
  const close = () => {
    setAgreeTerms(false);
    setAllowScan(false);
    setConfirmAuth(false);
    onClose();
  };

  return (
    <ModalShell open={open} onClose={close} size="md">
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <span className="text-[15px] font-semibold text-snt-text-primary">Add asset</span>
        <button
          type="button"
          onClick={close}
          className="w-7 h-7 rounded-full border border-snt-neutral-divider-10 flex items-center justify-center text-snt-text-disabled hover:text-snt-text-primary hover:border-snt-text-disabled transition-colors"
        >
          <X size={13} />
        </button>
      </div>

      <div className="px-5 pb-5 space-y-4">
        <div className="space-y-1.5">
          <textarea
            rows={2}
            placeholder="Write your asset (Domain, Subdomain, IPv4/IPv6 Address, CIDR Subnet)"
            className="w-full px-3 py-2 rounded-lg border border-snt-neutral-divider-10 bg-snt-surface-app text-[14px] text-snt-text-primary placeholder:text-snt-text-disabled outline-none focus:border-snt-brand-primary-500 focus:ring-2 focus:ring-snt-brand-primary-500/20 transition-colors resize-none"
          />
          <p className="text-[11px] text-snt-text-disabled">
            To add more than one asset, type each asset on a separate line.
          </p>
        </div>

        <div className="space-y-1.5">
          <textarea
            rows={2}
            placeholder="You can write a description for your asset here."
            className="w-full px-3 py-2 rounded-lg border border-snt-neutral-divider-10 bg-snt-surface-app text-[14px] text-snt-text-primary placeholder:text-snt-text-disabled outline-none focus:border-snt-brand-primary-500 focus:ring-2 focus:ring-snt-brand-primary-500/20 transition-colors resize-none"
          />
          <p className="text-[11px] text-snt-text-disabled">
            Description&apos;s length must be between 3 and 300 characters
          </p>
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex items-center gap-3">
            <Toggle checked={agreeTerms} onChange={setAgreeTerms} />
            <span className="text-[12px] text-snt-text-primary">
              I have read and agree to the{" "}
              <a href="#" className="text-snt-brand-primary-500 hover:underline">Terms</a>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Toggle checked={allowScan} onChange={setAllowScan} />
            <span className="text-[12px] text-snt-text-primary">
              I allow regular scanning for vulnerabilities specified in the{" "}
              <a href="#" className="text-snt-brand-primary-500 hover:underline">terms</a>.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Toggle checked={confirmAuth} onChange={setConfirmAuth} />
            <span className="text-[12px] text-snt-text-primary">
              I confirm that I have authority over assets.
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={close}
          className={cn(
            "w-full h-10 rounded-lg text-[14px] font-medium transition-colors mt-1",
            canSubmit
              ? "bg-snt-btn-primary-600 hover:bg-snt-btn-primary-700 text-white"
              : "bg-snt-neutral-grey-200 text-snt-text-disabled cursor-not-allowed",
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
          <SeverityBadge severity="high" size="sm" />
          <span className="text-[12px] text-snt-text-disabled">Found on 18 Apr 2026</span>
        </div>

        <div className="space-y-1.5">
          <div className="text-[12px] font-semibold uppercase tracking-widest text-snt-text-disabled">Description</div>
          <p className="text-[14px] text-snt-text-primary leading-relaxed">
            OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h does not properly restrict processing of ChangeCipherSpec messages,
            which allows man-in-the-middle attackers to trigger use of a zero-length master key.
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="text-[12px] font-semibold uppercase tracking-widest text-snt-text-disabled">Affected assets</div>
          <ul className="text-[14px] text-snt-text-primary space-y-1">
            <li>• zero.webappsecurity.com:443</li>
            <li>• server.lababidi.it:443</li>
          </ul>
        </div>

        <div className="space-y-1.5">
          <div className="text-[12px] font-semibold uppercase tracking-widest text-snt-text-disabled">Recommended fix</div>
          <p className="text-[14px] text-snt-text-primary leading-relaxed">
            Upgrade OpenSSL to 0.9.8za, 1.0.0m, or 1.0.1h. Restart any services that load the library.
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-2 px-5 py-3.5 border-t border-snt-neutral-divider-10">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center h-9 px-4 rounded-lg border border-snt-neutral-divider-10 text-[14px] font-medium text-snt-text-primary hover:bg-snt-neutral-grey-100 transition-colors"
        >
          Close
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center h-9 px-4 rounded-lg bg-snt-btn-primary-600 hover:bg-snt-btn-primary-700 text-white text-[14px] font-medium transition-colors"
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
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
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
        <div className="text-[14px] font-medium text-snt-text-primary">{label}</div>
        <div className="text-[12px] text-snt-text-disabled mt-0.5">{description}</div>
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
        <div className="border border-snt-neutral-divider-10 rounded-xl divide-y divide-snt-neutral-divider-10">

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

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────
//
// Modal previews render a STYLED FAKE card (header + body + footer) instead
// of opening the real portal — the portal overlay can't be embedded inline.

function FakeModalCard({
  children,
  size = "sm",
}: {
  children: React.ReactNode;
  size?:    "sm" | "md";
}) {
  return (
    <div
      className={cn(
        "w-full bg-snt-surface-app border border-snt-neutral-divider-10 rounded-xl shadow-snt-lg",
        size === "sm" ? "max-w-sm" : "max-w-md",
      )}
    >
      {children}
    </div>
  );
}

export function ModalExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Alert"
        density="tall"
        code={`const [open, setOpen] = useState(false);

<Modal open={open} onOpenChange={setOpen}>
  <ModalHeader onClose={() => setOpen(false)}>
    <ModalTitle>Scan completed</ModalTitle>
  </ModalHeader>
  <ModalBody>
    <ModalDescription>All detected findings are now available in the dashboard.</ModalDescription>
  </ModalBody>
  <ModalFooter>
    <Button onClick={() => setOpen(false)}>Got it</Button>
  </ModalFooter>
</Modal>`}
        preview={
          <FakeModalCard size="sm">
            <div className="px-5 pt-5 pb-4">
              <div className="w-10 h-10 rounded-full bg-snt-scale-green-50 flex items-center justify-center mb-3">
                <CheckCircle size={18} className="text-snt-scale-green-600" />
              </div>
              <div className="text-[14px] font-semibold text-snt-text-primary mb-1">Scan completed</div>
              <p className="text-[14px] text-snt-text-disabled leading-relaxed">
                We finished scanning your asset. All detected findings are now available in the dashboard.
              </p>
            </div>
            <div className="flex justify-end px-5 pb-4">
              <span className="inline-flex items-center h-9 px-4 rounded-lg bg-snt-btn-primary-600 text-white text-[14px] font-medium">
                Got it
              </span>
            </div>
          </FakeModalCard>
        }
      />
      <ExampleCard
        title="Confirm · Destructive"
        density="tall"
        code={`<Modal open={open} onOpenChange={setOpen}>
  <ModalHeader onClose={() => setOpen(false)}>
    <ModalTitle>Delete asset?</ModalTitle>
  </ModalHeader>
  <ModalBody>
    <ModalDescription>This permanently removes the asset and all of its findings. This can't be undone.</ModalDescription>
  </ModalBody>
  <ModalFooter>
    <Button intent="neutral" variant="outline" data-autofocus onClick={() => setOpen(false)}>Cancel</Button>
    <Button intent="destructive" onClick={deleteAsset}>Delete</Button>
  </ModalFooter>
</Modal>`}
        preview={
          <FakeModalCard size="sm">
            <div className="px-5 pt-5 pb-4">
              <div className="w-10 h-10 rounded-full bg-snt-scale-red-50 flex items-center justify-center mb-3">
                <AlertTriangle size={18} className="text-snt-scale-red-600" />
              </div>
              <div className="text-[14px] font-semibold text-snt-text-primary mb-1">Delete asset?</div>
              <p className="text-[14px] text-snt-text-disabled leading-relaxed">
                This permanently removes the asset and all of its findings. This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-2 px-5 pb-4">
              <span className="inline-flex items-center h-9 px-4 rounded-lg border border-snt-neutral-divider-10 text-[14px] font-medium text-snt-text-primary">
                Cancel
              </span>
              <span className="inline-flex items-center h-9 px-4 rounded-lg bg-snt-scale-red-600 text-white text-[14px] font-medium">
                Delete
              </span>
            </div>
          </FakeModalCard>
        }
      />
      <ExampleCard
        title="Detail"
        density="tall"
        code={`<Modal open={open} onOpenChange={setOpen} size="lg">
  <ModalHeader onClose={() => setOpen(false)}>
    <ModalTitle>CVE-2021-44228</ModalTitle>
  </ModalHeader>
  <ModalBody scrollable>
    {/* finding details */}
  </ModalBody>
  <ModalFooter bordered>
    <Button intent="neutral" variant="outline" onClick={() => setOpen(false)}>Close</Button>
    <Button>Create ticket</Button>
  </ModalFooter>
</Modal>`}
        preview={
          <FakeModalCard size="md">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-snt-neutral-divider-10">
              <span className="text-[14px] font-semibold text-snt-text-primary">CVE-2014-0224 · Detail</span>
              <span className="w-7 h-7 rounded-md flex items-center justify-center text-snt-text-disabled">
                <X size={15} />
              </span>
            </div>
            <div className="px-5 py-5 space-y-4">
              <div className="flex items-center gap-2">
                <SeverityBadge severity="high" size="sm" />
                <span className="text-[12px] text-snt-text-disabled">Found on 18 Apr 2026</span>
              </div>
              <div className="space-y-1.5">
                <div className="text-[12px] font-semibold uppercase tracking-widest text-snt-text-disabled">Description</div>
                <p className="text-[14px] text-snt-text-primary leading-relaxed">
                  OpenSSL before 0.9.8za does not properly restrict processing of ChangeCipherSpec messages,
                  allowing man-in-the-middle attackers to trigger use of a zero-length master key.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-3.5 border-t border-snt-neutral-divider-10">
              <span className="inline-flex items-center h-9 px-4 rounded-lg border border-snt-neutral-divider-10 text-[14px] font-medium text-snt-text-primary">
                Close
              </span>
              <span className="inline-flex items-center h-9 px-4 rounded-lg bg-snt-btn-primary-600 text-white text-[14px] font-medium">
                Open ticket
              </span>
            </div>
          </FakeModalCard>
        }
      />
    </div>
  );
}
