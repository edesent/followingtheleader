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
  presets,
  interests,
  eyebrow = "Give Now",
  title = "Partner with Following the Leader",
  oneTimeOnly,
}: {
  className?: string;
  children: React.ReactNode;
  /** Pre-chosen gift, e.g. "$50". */
  amount?: string;
  frequency?: "Monthly" | "One-time";
  /** Accessible name for the trigger when its contents aren't plain text. */
  ariaLabel?: string;
  /** Override the quick-pick amounts — the major-gift page passes its own. */
  presets?: string[];
  /** Override the "how would you like to partner?" choices. */
  interests?: string[];
  /** Lightbox heading, so the major-gift page can name its own campaign. */
  eyebrow?: string;
  title?: string;
  /** Drop the monthly option — the major-gift page asks for one gift only. */
  oneTimeOnly?: boolean;
}) {
  return (
    <ModalButton
      className={className}
      ariaLabel={ariaLabel}
      label={title}
      eyebrow={eyebrow}
      title={title}
      maxWidth="max-w-2xl"
      render={() => (
        <PartnerForm
          bare
          initialAmount={amount}
          initialFrequency={frequency}
          presets={presets}
          interests={interests}
          oneTimeOnly={oneTimeOnly}
        />
      )}
    >
      {children}
    </ModalButton>
  );
}
