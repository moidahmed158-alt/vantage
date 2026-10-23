"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Btn } from "@/components/ui/Button";
import { Arrow, Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Mark";
import { PRIMARY_NAV, ROUTES, SERVICE_GROUPS, SITE, SPECIALTIES, specialtyHref } from "@/lib/site";

type Mega = "svc" | "spec" | null;
type Group = "svc" | "spec" | "";

export function Header() {
  const pathname = usePathname();
  const [mega, setMega] = useState<Mega>(null);
  const [menu, setMenu] = useState(false);
  const [group, setGroup] = useState<Group>("svc");
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const hdrRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  // Close everything on navigation.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMega(null);
    setMenu(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock page scroll behind the mobile drawer; close it if the viewport grows past the breakpoint.
  useEffect(() => {
    if (!menu) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const mq = window.matchMedia("(min-width: 1081px)");
    const onChange = () => {
      if (mq.matches) setMenu(false);
    };
    mq.addEventListener("change", onChange);
    return () => {
      html.style.overflow = prev;
      mq.removeEventListener("change", onChange);
    };
  }, [menu]);

  // Click outside closes a mega menu.
  useEffect(() => {
    if (!mega) return;
    const onDown = (e: PointerEvent) => {
      if (!hdrRef.current?.contains(e.target as Node)) setMega(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [mega]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const hoverOpen = (which: Exclude<Mega, null>) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMega(which), mega ? 0 : 90);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMega(null), 160);
  };
  const hoverKeep = () => window.clearTimeout(hoverTimer.current);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Escape") return;
    if (mega) {
      const trigger = hdrRef.current?.querySelector<HTMLButtonElement>(`[aria-controls="mega-${mega === "svc" ? "services" : "specialties"}"]`);
      setMega(null);
      trigger?.focus();
    }
    if (menu) {
      setMenu(false);
      hdrRef.current?.querySelector<HTMLButtonElement>(".v-burger")?.focus();
    }
  };

  const isSvc = pathname.startsWith(ROUTES.services);
  const isSpec = pathname.startsWith(ROUTES.specialties);
  const cur = (href: string) => (pathname === href ? "page" : undefined);
  const cls = ["v-hdr", scrolled && "is-scrolled", (mega || menu) && "is-open"].filter(Boolean).join(" ");

  const row = (i: number) => ({ "--i": i }) as CSSProperties;

  return (
    <header ref={hdrRef} className={cls} onKeyDown={onKeyDown} onPointerLeave={hoverClose} onPointerEnter={hoverKeep}>
      <div className="v-wrap v-hdr-in">
        <Logo draw />

        <nav className="v-nav" aria-label="Primary">
          <button
            type="button"
            className="v-nav-btn"
            data-active={isSvc}
            aria-expanded={mega === "svc"}
            aria-controls="mega-services"
            onClick={() => setMega(mega === "svc" ? null : "svc")}
            onPointerEnter={hoverOpen("svc")}
          >
            Services <Icon name="caret" size={14} strokeWidth={2.2} className="v-caret" />
          </button>
          <button
            type="button"
            className="v-nav-btn"
            data-active={isSpec}
            aria-expanded={mega === "spec"}
            aria-controls="mega-specialties"
            onClick={() => setMega(mega === "spec" ? null : "spec")}
            onPointerEnter={hoverOpen("spec")}
          >
            Specialties <Icon name="caret" size={14} strokeWidth={2.2} className="v-caret" />
          </button>
          {PRIMARY_NAV.map((l) => (
            <Link key={l.href} className="v-nav-btn" href={l.href} aria-current={cur(l.href)} onPointerEnter={hoverClose}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Btn href={ROUTES.contact} size="sm" className="v-hdr-cta">
          Book a strategy call
        </Btn>

        <button
          type="button"
          className="v-burger"
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          aria-controls="mobile-menu"
          onClick={() => {
            setMenu(!menu);
            setMega(null);
          }}
        >
          <Icon name={menu ? "close" : "menu"} size={22} strokeWidth={2} />
        </button>
      </div>
      <div className="v-progress" aria-hidden="true" />

      {/* Services mega menu */}
      <div id="mega-services" className="v-mega" data-open={mega === "svc"} inert={mega !== "svc"}>
        <div className="v-wrap v-mega-grid">
          <div className="v-mega-intro">
            <span className="v-tag">The Vantage growth system</span>
            <p className="v-display" style={{ fontSize: 28, lineHeight: 1.08 }}>
              Found. <span className="v-neon">Chosen.</span> Connected.
            </p>
            <p className="v-small v-muted">Seven disciplines working as one system — measured on the appointments they produce.</p>
            <Link className="v-alink" href={ROUTES.services} style={{ marginTop: "auto", color: "var(--cyan2)" }}>
              All services <Arrow />
            </Link>
          </div>
          {SERVICE_GROUPS.map((g, gi) => (
            <div className="v-mega-col" key={g.tag}>
              <span className="v-tag">{g.tag}</span>
              {g.links.map((l) => (
                <Link className="v-mega-link" href={l.href} key={l.label}>
                  <span>
                    <strong>{l.label}</strong>
                    <small>{l.desc}</small>
                  </span>
                </Link>
              ))}
              {gi === SERVICE_GROUPS.length - 1 && (
                <Link className="v-mega-link v-mega-link--cta" href={ROUTES.contact}>
                  <span>
                    <strong>Request a growth assessment</strong>
                    <small>See where your practice stands</small>
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Specialties mega menu */}
      <div id="mega-specialties" className="v-mega" data-open={mega === "spec"} inert={mega !== "spec"}>
        <div className="v-wrap v-mega-grid">
          <div className="v-mega-intro">
            <span className="v-tag">Specialties</span>
            <p className="v-display" style={{ fontSize: 28, lineHeight: 1.08 }}>
              Strategy shaped by how your patients choose.
            </p>
            <Link className="v-alink" href={ROUTES.specialties} style={{ marginTop: "auto", color: "var(--cyan2)" }}>
              All specialties <Arrow />
            </Link>
          </div>
          <div className="v-mega-col">
            <span className="v-tag">Dental</span>
            {SPECIALTIES.dental.map((s) => (
              <Link className="v-mega-link" href={specialtyHref(s.slug)} key={s.slug}>
                <span>
                  <strong>{s.label}</strong>
                </span>
              </Link>
            ))}
          </div>
          <div className="v-mega-col">
            <span className="v-tag">Medical</span>
            {SPECIALTIES.medical.map((s) => (
              <Link className="v-mega-link" href={specialtyHref(s.slug)} key={s.slug}>
                <span>
                  <strong>{s.label}</strong>
                </span>
              </Link>
            ))}
          </div>
          <div className="v-mega-col">
            <span className="v-tag">Not listed?</span>
            <div className="v-card v-card--hi v-card--static" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
              <p className="v-small" style={{ color: "var(--fg2)" }}>
                Every specialty has its own patient journey. Tell us about yours and we&apos;ll show you how we&apos;d approach it.
              </p>
              <Btn href={ROUTES.contact} size="sm">
                Discuss your practice
              </Btn>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div id="mobile-menu" className="v-drawer" data-open={menu} inert={!menu}>
        <nav className="v-drawer-list" aria-label="Mobile">
          <button
            type="button"
            className="v-drawer-row"
            style={row(0)}
            aria-expanded={group === "svc"}
            aria-controls="m-services"
            onClick={() => setGroup(group === "svc" ? "" : "svc")}
          >
            Services <Icon name="caret" size={18} strokeWidth={2.2} className="v-caret" />
          </button>
          <div id="m-services" className="v-drawer-sub" data-open={group === "svc"} style={row(1)}>
            <div inert={group !== "svc"}>
              <Link href={ROUTES.services} className="is-all" aria-current={cur(ROUTES.services)}>
                All services
              </Link>
              {SERVICE_GROUPS.map((g) => (
                <div key={g.tag} style={{ display: "contents" }}>
                  <span className="v-tag">{g.title}</span>
                  {g.links
                    .filter((l) => l.href !== ROUTES.services)
                    .map((l) => (
                      <Link key={l.label} href={l.href} aria-current={cur(l.href)}>
                        {l.label}
                      </Link>
                    ))}
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="v-drawer-row"
            style={row(2)}
            aria-expanded={group === "spec"}
            aria-controls="m-specialties"
            onClick={() => setGroup(group === "spec" ? "" : "spec")}
          >
            Specialties <Icon name="caret" size={18} strokeWidth={2.2} className="v-caret" />
          </button>
          <div id="m-specialties" className="v-drawer-sub" data-open={group === "spec"} style={row(3)}>
            <div inert={group !== "spec"}>
              <Link href={ROUTES.specialties} className="is-all">
                All specialties
              </Link>
              <span className="v-tag">Dental</span>
              {SPECIALTIES.dental.map((s) => (
                <Link key={s.slug} href={specialtyHref(s.slug)}>
                  {s.label}
                </Link>
              ))}
              <span className="v-tag">Medical</span>
              {SPECIALTIES.medical.map((s) => (
                <Link key={s.slug} href={specialtyHref(s.slug)}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
          {[...PRIMARY_NAV, { label: "Contact", href: ROUTES.contact }].map((l, n) => (
            <Link key={l.href} className="v-drawer-row" href={l.href} style={row(4 + n)} aria-current={cur(l.href)}>
              {l.label}
              <Arrow />
            </Link>
          ))}
        </nav>
        <div className="v-drawer-foot">
          <Btn href={ROUTES.contact} arrow>
            Book a strategy call
          </Btn>
          <a className="v-alink" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </div>
      </div>
    </header>
  );
}
