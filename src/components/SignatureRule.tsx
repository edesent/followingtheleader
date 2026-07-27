/**
 * The "signature" divider from the ministry portfolio — two thin gold rules
 * flanking a small gold diamond. Sits under section headings to make them
 * stand out. Use align="left" to anchor it to a left-aligned heading.
 */
export default function SignatureRule({
  align = "center",
  className = "",
}: {
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 ${align === "center" ? "justify-center" : ""} ${className}`}
      aria-hidden
    >
      {align === "center" && (
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/80" />
      )}
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/80" />
    </div>
  );
}
