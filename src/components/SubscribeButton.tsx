"use client";

import ModalButton from "./Modal";
import SubscribeForm from "./SubscribeForm";

/**
 * "Subscribe free" button that opens the Morning With Jesus signup in a modal.
 * The form is ours (SubscribeForm → /api/subscribe → Constant Contact), so
 * people are signed up without ever leaving the page.
 *
 * Wrap the trigger's look in `className` — the button is otherwise unstyled so
 * the same component can be a navy pill in the header and a gold pill on a dark
 * section.
 */
export default function SubscribeButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <ModalButton
      className={className}
      label="Subscribe to Morning With Jesus"
      eyebrow="Free daily devotional"
      title="Morning With Jesus"
      intro="A short, Scripture-rooted word in your inbox each morning. Join more than 60,000 readers."
      render={() => <SubscribeForm autoFocus bare />}
    >
      {children}
    </ModalButton>
  );
}
