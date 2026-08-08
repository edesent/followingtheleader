"use client";

import ModalButton from "./Modal";
import PartnerForm from "./PartnerForm";

/**
 * Opens the partnership form in a lightbox.
 *
 * Every "give" call on the partner page routes through here, so a click acts
 * where the visitor already is instead of reloading the page and dropping them
 * at an anchor further down. A tier card passes its own amount, which lands the
 * visitor on the form with the gift already chosen.
 */
export default function GiveButton({
  className,
  children,
  amount,
  frequency = "Monthly",
  ariaLabel,
}: {
  className?: string;
  children: React.ReactNode;
  /** Pre-chosen gift, e.g. "$50". */
  amount?: string;
  frequency?: "Monthly" | "One-time";
  /** Accessible name for the trigger when its contents aren't plain text. */
  ariaLabel?: string;
}) {
  return (
    <ModalButton
      className={className}
      ariaLabel={ariaLabel}
      label="Partner with Following the Leader"
      eyebrow="Give Now"
      title="Partner with Following the Leader"
      maxWidth="max-w-2xl"
      render={() => (
        <PartnerForm bare initialAmount={amount} initialFrequency={frequency} />
      )}
    >
      {children}
    </ModalButton>
  );
}
