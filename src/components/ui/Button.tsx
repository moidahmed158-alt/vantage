import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./Icon";

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
};

const isPlainAnchor = (href: string) => /^(#|mailto:|tel:|https?:)/.test(href);

/** Link styled as a button. Uses next/link for internal routes. */
export function Btn({ href, children, variant = "primary", size = "md", arrow, className = "" }: BtnProps) {
  const cls = ["v-btn", `v-btn--${variant}`, size === "sm" && "v-btn--sm", className].filter(Boolean).join(" ");
  const inner = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );
  if (isPlainAnchor(href)) {
    return (
      <a className={cls} href={href}>
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {inner}
    </Link>
  );
}

/** Full-width list row with a trailing arrow (`.v-row-link`). */
export function RowLink({
  href,
  children,
  className = "",
  large,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** Display-type row used for specialty and page lists. */
  large?: boolean;
}) {
  const cls = ["v-row-link", large && "v-row-link--lg", className].filter(Boolean).join(" ");
  return (
    <Link href={href} className={cls}>
      <span>{children}</span>
      <Arrow size={large ? 20 : 18} />
    </Link>
  );
}
