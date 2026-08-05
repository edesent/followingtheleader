"use client";

import ModalButton from "./Modal";
import PreorderForm from "./PreorderForm";
import { NEW_RELEASE } from "@/config/site";

/**
 * "Preorder your copy" button for the new book. Opens the preorder form in a
 * modal — no payment step; the order is emailed to Joe, who follows up with the
 * total and how to send it.
 */
export default function PreorderButton({
  className = "inline-flex items-center gap-2 rounded-full bg-dawn-deep px-8 py-3.5 text-[0.98rem] font-semibold text-white shadow-lg shadow-dawn-deep/25 transition-colors hover:bg-ink",
  label = NEW_RELEASE.cta.label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <ModalButton
      className={className}
      label={`Preorder ${NEW_RELEASE.title}`}
      eyebrow={NEW_RELEASE.badge}
      title={NEW_RELEASE.title}
      intro={NEW_RELEASE.preorder.intro}
      maxWidth="max-w-lg"
      render={() => <PreorderForm autoFocus />}
    >
      {label}
    </ModalButton>
  );
}
