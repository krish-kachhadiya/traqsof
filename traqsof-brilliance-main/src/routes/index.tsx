import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Camera,
  Check,
  ChevronDown,
  Cloud,
  FileText,
  MapPin,
  Menu,
  Minus,
  Plus,
  Scan,
  ShieldCheck,
  Smartphone,
  Upload,
  Users,
  WifiOff,
  X,
} from "lucide-react";
import { useCountUp, useInView } from "@/hooks/use-animations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Traqsof — AI Outdoor Advertising Intelligence" },
      {
        name: "description",
        content:
          "Traqsof delivers GPS-verified campaign monitoring, AI compliance detection, and enterprise-grade outdoor advertising intelligence.",
      },
    ],
  }),
  component: TraqsofLanding,
});

/* ─────────── helpers ─────────── */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function DualHeading({
  parts,
  className = "",
  dark = false,
}: {
  parts: [string, string, string?];
  className?: string;
  dark?: boolean;
}) {
  return (
    <h2
      data-cursor="blend"
      className={`font-display font-bold tracking-tight text-balance ${
        dark ? "text-white" : "text-[#1A050A]"
      } ${className}`}
    >
      {parts[0]} <span className="text-[#EE3038]">{parts[1]}</span>
      {parts[2] ? <> {parts[2]}</> : null}
    </h2>
  );
}

function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateZ(0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(1100px) rotateX(0) rotateY(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────── Custom cursor ─────────── */

function useBlendCursor() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.body.classList.add("has-custom-cursor");
    const cursor = document.createElement("div");
    cursor.className = "tx-cursor";
    document.body.appendChild(cursor);

    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const t = e.target as HTMLElement | null;
      const blend =
        !!t &&
        (t.closest("[data-cursor='blend']") ||
          ["H1", "H2"].includes(t.tagName) ||
          (t.closest("a,button") ? false : false));
      if (blend) cursor.classList.add("is-blend");
      else cursor.classList.remove("is-blend");
    };
    const tick = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor.style.left = cx + "px";
      cursor.style.top = cy + "px";
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      cursor.remove();
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);
}

/* ─────────── Nav ─────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      // detect section bg by checking element under nav
      const el = document.elementFromPoint(window.innerWidth / 2, 80) as HTMLElement | null;
      const section = el?.closest<HTMLElement>("[data-theme]");
      if (section) setDark(section.dataset.theme === "dark");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Platform", href: "#platform" },
    { label: "Intelligence", href: "#intelligence" },
    { label: "Impact", href: "#impact" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all ${
          scrolled ? (dark ? "glass-nav-dark" : "glass-nav-light") : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="#top"
            className={`font-display text-2xl font-bold tracking-tight ${
              dark ? "text-white" : "text-[#1A050A]"
            }`}
          >
            Traq<span className="text-[#EE3038]">sof</span>
          </a>
          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`group relative text-sm font-medium ${
                  dark ? "text-white/80 hover:text-white" : "text-[#1A050A]/70 hover:text-[#1A050A]"
                }`}
              >
                {l.label}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#EE3038] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <button
            onClick={() => setOpen(true)}
            className={`md:hidden ${dark ? "text-white" : "text-[#1A050A]"}`}
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-[#1A050A]/95 backdrop-blur-xl">
          <div className="flex items-center justify-between p-6">
            <span className="font-display text-2xl font-bold text-white">
              Traq<span className="text-[#EE3038]">sof</span>
            </span>
            <button onClick={() => setOpen(false)} className="text-white">
              <X />
            </button>
          </div>
          <nav className="flex flex-col gap-8 px-8 pt-12">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-5xl font-bold text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

/* ─────────── Magnetic button ─────────── */

function MagneticButton({
  children,
  className = "",
  large = false,
}: {
  children: ReactNode;
  className?: string;
  large?: boolean;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-flex items-center gap-3 rounded-full bg-[#EE3038] font-display font-bold text-white shadow-[0_20px_60px_-20px_#EE3038] transition-[transform,box-shadow] duration-300 hover:shadow-[0_30px_80px_-15px_#EE3038] ${
        large ? "px-10 py-6 text-xl" : "px-7 py-4 text-base"
      } ${className}`}
    >
      {children}
    </button>
  );
}

/* ─────────── Hero dashboard mock ─────────── */

function HeroMock() {
  return (
    <div className="relative float-y-slow">
      <div className="absolute -inset-10 rounded-[3rem] bg-[#EE3038]/20 blur-3xl" />
      <TiltCard className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#EE3038]" />
            <span className="text-xs font-semibold text-white/70">LIVE · Mumbai West Zone</span>
          </div>
          <span className="text-xs text-white/50">v4.2</span>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { l: "Sites Live", v: "2,418" },
            { l: "Compliance", v: "96%" },
            { l: "Alerts", v: "12" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl bg-white/5 p-4">
              <div className="text-[10px] uppercase tracking-widest text-white/50">{s.l}</div>
              <div className="font-display text-2xl font-bold text-white">{s.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl bg-white/[0.04] p-5">
          <div className="flex items-end gap-2 h-32">
            {[40, 60, 45, 75, 55, 88, 70, 92, 65, 80, 95, 78].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-gradient-to-t from-[#EE3038] to-[#FF5A62]"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#EE3038]">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold text-white">Andheri Flyover · Hoarding #A-204</div>
            <div className="text-[10px] text-white/50">GPS verified · 09:42 IST</div>
          </div>
          <Check className="h-5 w-5 text-[#EE3038]" />
        </div>
      </TiltCard>
    </div>
  );
}

/* ─────────── Section 1: Hero ─────────── */

function Hero() {
  return (
    <section
      id="top"
      data-theme="dark"
      className="relative overflow-hidden bg-[#1A050A] pt-32 pb-24"
    >
      <div className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-[#EE3038]/20 blur-[120px] animate-blob" />
      <div className="absolute -bottom-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-[#EE3038]/10 blur-[120px] animate-blob" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EE3038]" /> AI Outdoor Intelligence
            </div>
          </Reveal>
          <h1
            data-cursor="blend"
            className="mt-6 font-display text-[clamp(2.75rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white"
          >
            <span className="word-rise inline-block">Ensure</span>{" "}
            <span className="word-rise inline-block" style={{ animationDelay: "80ms" }}>
              Campaign
            </span>{" "}
            <span className="word-rise inline-block" style={{ animationDelay: "160ms" }}>
              Excellence
            </span>
            <br />
            <span className="word-rise inline-block text-white/70" style={{ animationDelay: "240ms" }}>
              with
            </span>{" "}
            <span
              className="word-rise inline-block text-[#EE3038]"
              style={{ animationDelay: "320ms" }}
            >
              Absolute Proof.
            </span>
          </h1>
          <Reveal delay={400}>
            <p className="mt-8 max-w-xl text-lg text-white/70">
              AI-powered campaign monitoring delivering GPS-verified accuracy for enterprise
              agencies.
            </p>
          </Reveal>
          <Reveal delay={500}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <MagneticButton>
                Start Free Trial <ArrowRight className="h-5 w-5" />
              </MagneticButton>
              <a href="#intelligence" className="group flex items-center gap-3 text-white/80">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-white/20 transition-colors group-hover:border-[#EE3038]">
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
                </span>
                <span className="text-sm font-semibold">See the platform</span>
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <HeroMock />
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Section 2: Scale of Impact ─────────── */

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v = useCountUp(to, inView, 2000);
  return (
    <div ref={ref} className="font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-none text-[#1A050A]">
      {prefix}
      {v.toLocaleString()}
      <span className="text-[#EE3038]">{suffix}</span>
    </div>
  );
}

function Impact() {
  return (
    <section id="impact" data-theme="light" className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <DualHeading
            parts={["Empowering Global", "Advertising Portfolios."]}
            className="text-[clamp(2.5rem,6vw,5rem)] leading-[1]"
          />
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-6 max-w-2xl text-lg text-[#1A050A]/60">
            Verified at scale. Measured in milliseconds. Trusted by India's most demanding agency
            networks.
          </p>
        </Reveal>
        <div className="mt-20 grid gap-14 md:grid-cols-3">
          {[
            { to: 12847, label: "Active Sites Monitored" },
            { to: 94, suffix: ".8%", label: "AI Compliance Accuracy", customSuffix: true },
            { to: 500, prefix: "₹", suffix: "+ Cr", label: "Ad Spend Protected" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="border-t-2 border-[#1A050A]/10 pt-8">
                {s.customSuffix ? (
                  <Counter to={s.to} suffix=".8%" />
                ) : (
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                )}
                <div className="mt-6 text-sm font-semibold uppercase tracking-widest text-[#1A050A]/60">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Section 3: Intelligence Engine (sticky scroll, image LEFT) ─────────── */

const FEATURES = [
  { icon: Upload, title: "Bulk Upload", desc: "Onboard thousands of sites and campaigns in a single sweep.", tone: "Operations" },
  { icon: FileText, title: "Automated Reports", desc: "Boardroom-ready PDFs generated the moment data lands.", tone: "Reporting" },
  { icon: MapPin, title: "GPS-Verified Photos", desc: "Every capture pinned with geocoordinates and timestamps.", tone: "Verification" },
  { icon: ShieldCheck, title: "Complaint System", desc: "Closed-loop dispute resolution with full audit history.", tone: "Compliance" },
  { icon: Users, title: "Team Management", desc: "Granular roles, regions and approval ladders.", tone: "Org" },
  { icon: Scan, title: "AI Detection", desc: "Computer vision flags damage, vandalism and miscreatives.", tone: "Intelligence" },
  { icon: WifiOff, title: "Offline Mode", desc: "Captures sync the instant your field team gets signal.", tone: "Field" },
];

function IntelligenceEngine() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="intelligence"
      data-theme="dark"
      className="relative overflow-hidden bg-[#1A050A] py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <DualHeading
            dark
            parts={["Capabilities Built", "For Flawless Execution."]}
            className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] max-w-4xl"
          />
        </Reveal>

        <div className="relative mt-20 grid gap-12 lg:grid-cols-2">
          {/* LEFT sticky image */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8">
                <div className="absolute -inset-20 rounded-full bg-[#EE3038]/20 blur-[120px]" />
                {FEATURES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={i}
                      className={`absolute inset-8 flex flex-col items-center justify-center text-center transition-all duration-700 ${
                        active === i ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                      }`}
                    >
                      <div className="grid h-32 w-32 place-items-center rounded-3xl bg-[#EE3038] shadow-[0_30px_80px_-20px_#EE3038]">
                        <Icon className="h-14 w-14 text-white" />
                      </div>
                      <div className="mt-8 text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
                        {f.tone}
                      </div>
                      <div className="mt-4 font-display text-4xl font-bold text-white">
                        {f.title}
                      </div>
                      <div className="mt-4 max-w-sm text-white/60">{f.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT scroll list */}
          <div>
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  data-idx={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="flex min-h-[70vh] flex-col justify-center"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">
                    0{i + 1} · {f.tone}
                  </div>
                  <h3
                    className={`mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight transition-colors duration-500 ${
                      active === i ? "text-[#EE3038]" : "text-white/80"
                    }`}
                  >
                    {f.title}
                  </h3>
                  <p className="mt-4 max-w-md text-lg text-white/60">{f.desc}</p>
                  <div className="mt-6 flex items-center gap-3 lg:hidden">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#EE3038]">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Section 4: Real Results & Comparison ─────────── */

function Results() {
  const stats = [
    { to: 25, suffix: "%", label: "Budget Saved", prefix: "15–" },
    { to: 95, suffix: "%", label: "Faster Reporting" },
    { to: 0, suffix: "%", label: "Vendor Disputes" },
  ];
  return (
    <section data-theme="light" className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <DualHeading
            parts={["Real Campaigns.", "Real Results."]}
            className="text-[clamp(2.5rem,6vw,5rem)] leading-[1]"
          />
        </Reveal>

        <div className="mt-20 grid gap-12 md:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="border-t-2 border-[#EE3038] pt-6">
                <div className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none text-[#1A050A]">
                  {s.prefix}
                  <CounterInline to={s.to} />
                  <span className="text-[#EE3038]">{s.suffix}</span>
                </div>
                <div className="mt-5 text-sm font-semibold uppercase tracking-widest text-[#1A050A]/60">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-2">
          <Reveal>
            <TiltCard className="rounded-3xl border border-[#1A050A]/10 bg-white p-10">
              <div className="text-xs font-semibold uppercase tracking-[0.4em] text-[#1A050A]/40">
                Before
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold text-[#1A050A]/40">
                Campaign Chaos
              </h3>
              <ul className="mt-8 space-y-4">
                {[
                  "Untracked placements across cities",
                  "Manual photo audits taking weeks",
                  "Disputes resolved on phone calls",
                  "No proof of campaign performance",
                ].map((l) => (
                  <li key={l} className="flex items-start gap-3 text-[#1A050A]/40">
                    <X className="mt-0.5 h-5 w-5 shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
          <Reveal delay={150}>
            <TiltCard className="rounded-3xl border-2 border-[#EE3038] bg-white p-10 shadow-[0_40px_120px_-30px_#EE3038]">
              <div className="text-xs font-semibold uppercase tracking-[0.4em] text-[#EE3038]">
                After
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold text-[#EE3038]">
                Organized Monitoring
              </h3>
              <ul className="mt-8 space-y-4">
                {[
                  "Live dashboard of all sites globally",
                  "Reports generated in seconds, not weeks",
                  "Audit-grade dispute trail end-to-end",
                  "GPS-verified, AI-validated proof",
                ].map((l) => (
                  <li key={l} className="flex items-start gap-3 text-[#1A050A]">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#EE3038]" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CounterInline({ to }: { to: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const v = useCountUp(to, inView, 1800);
  return <span ref={ref}>{v}</span>;
}

/* ─────────── Section 5: Data in Motion (sticky scroll, image RIGHT) ─────────── */

const WORKFLOW = [
  { n: "01", icon: Camera, title: "Capture", desc: "Field teams photograph sites with one tap." },
  { n: "02", icon: Cloud, title: "Cloud Sync", desc: "Captures stream to encrypted cloud the moment signal returns." },
  { n: "03", icon: Scan, title: "AI Analysis", desc: "Computer vision validates creative, condition, geofence." },
  { n: "04", icon: BarChart3, title: "Live Dashboard", desc: "Boardroom-grade reports update in real time." },
];

function PhoneMock({ active }: { active: number }) {
  const screens = [
    { color: "from-[#EE3038] to-[#FF5A62]", label: "CAPTURE", icon: Camera, text: "Hoarding #A-204" },
    { color: "from-[#1A050A] to-[#3a0a14]", label: "UPLOADING", icon: Cloud, text: "68% · Synced" },
    { color: "from-[#EE3038] to-[#1A050A]", label: "AI SCAN", icon: Scan, text: "Creative Verified" },
    { color: "from-[#1A050A] to-[#EE3038]", label: "LIVE", icon: BarChart3, text: "96% Compliant" },
  ];
  return (
    <div className="relative mx-auto float-y" style={{ width: 280 }}>
      <div className="absolute -inset-10 rounded-[3rem] bg-[#EE3038]/30 blur-3xl" />
      <div className="relative aspect-[9/19] rounded-[3rem] border-[10px] border-white/10 bg-[#1A050A] p-3 shadow-[0_40px_120px_-20px_rgba(238,48,56,0.5)]">
        <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/40" />
        <div className="relative h-full w-full overflow-hidden rounded-[2.2rem]">
          {screens.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${s.color} p-6 text-center transition-all duration-700 ${
                  active === i ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/70">
                  {s.label}
                </div>
                <div className="mt-8 grid h-24 w-24 place-items-center rounded-3xl bg-white/15 backdrop-blur-md">
                  <Icon className="h-10 w-10 text-white" />
                </div>
                <div className="mt-8 font-display text-2xl font-bold text-white">{s.text}</div>
                <div className="mt-2 text-xs text-white/70">{WORKFLOW[i].title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DataInMotion() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <section
      id="platform"
      data-theme="dark"
      className="relative overflow-hidden bg-[#1A050A] py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <DualHeading
            dark
            parts={["From Street-Level Capture", "To Boardroom Reports."]}
            className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] max-w-4xl"
          />
        </Reveal>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <div>
            {WORKFLOW.map((w, i) => {
              const Icon = w.icon;
              return (
                <div
                  key={i}
                  data-idx={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="flex min-h-[70vh] flex-col justify-center"
                >
                  <div
                    className={`font-display text-7xl font-bold transition-colors duration-500 ${
                      active === i ? "text-[#EE3038]" : "text-white/15"
                    }`}
                  >
                    {w.n}
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-xl transition-colors duration-500 ${
                        active === i ? "bg-[#EE3038]" : "bg-white/10"
                      }`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3
                      className={`font-display text-3xl font-bold transition-colors duration-500 ${
                        active === i ? "text-white" : "text-white/60"
                      }`}
                    >
                      {w.title}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-md text-white/60">{w.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <PhoneMock active={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Section 6: Customer Review ─────────── */

function Review() {
  return (
    <section data-theme="light" className="bg-white py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <DualHeading
            parts={["Trusted By", "Industry Leaders."]}
            className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] text-center"
          />
        </Reveal>
        <Reveal delay={200}>
          <TiltCard className="mt-20 rounded-[2rem] border border-[#1A050A]/10 bg-gradient-to-br from-white to-[#FFF5F6] p-12 md:p-20 shadow-[0_60px_120px_-40px_rgba(238,48,56,0.25)]">
            <div className="font-display text-[12rem] leading-none text-[#EE3038]/15">"</div>
            <blockquote className="-mt-20 font-display text-[clamp(1.5rem,3vw,2.75rem)] font-bold leading-tight tracking-tight text-[#1A050A]">
              We were losing <span className="text-[#EE3038]">₹15 lakh per campaign</span> to
              unverified placements. Traqsof paid for itself in the first month.
            </blockquote>
            <div className="mt-10 flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[#EE3038] font-display text-xl font-bold text-white">
                M
              </div>
              <div>
                <div className="font-display text-lg font-bold text-[#1A050A]">Marketing Head</div>
                <div className="text-sm text-[#1A050A]/60">National OOH Agency · Mumbai</div>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── Section 7: Pricing & FAQ ─────────── */

const PLANS = [
  {
    name: "Starter",
    price: "₹24,999",
    period: "/month",
    desc: "For boutique agencies onboarding their first campaigns.",
    features: ["Up to 250 sites", "GPS verification", "Weekly reports", "Email support"],
    popular: false,
  },
  {
    name: "Standard",
    price: "₹74,999",
    period: "/month",
    desc: "The choice of growing agency networks.",
    features: [
      "Up to 2,500 sites",
      "AI compliance detection",
      "Daily reports",
      "Dedicated CS manager",
      "Priority SLAs",
    ],
    popular: true,
  },
  {
    name: "Professional",
    price: "Custom",
    period: "",
    desc: "Enterprise rollouts across regions and entities.",
    features: ["Unlimited sites", "Custom AI models", "API & SSO", "On-prem option", "24/7 support"],
    popular: false,
  },
];

const FAQS = [
  { q: "How fast can we onboard our portfolio?", a: "Bulk upload ingests up to 10,000 sites per hour. Most clients are live within 48 hours." },
  { q: "Does AI detection require a custom model?", a: "Our base model ships ready for hoardings, transit, and retail. Custom models are included on Professional." },
  { q: "How does GPS verification work?", a: "Every photo is signed with geocoordinates, device fingerprint, and a tamper-proof timestamp at capture." },
  { q: "Can we white-label client reports?", a: "Yes — Standard and Professional include white-label PDFs and a brandable client portal." },
];

function PricingFAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="pricing" data-theme="dark" className="relative overflow-hidden bg-[#1A050A] py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <DualHeading
            dark
            parts={["Transparent Scaling", "For Your Agency."]}
            className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] max-w-4xl"
          />
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <div
                className={`relative h-full rounded-3xl border p-10 transition-transform hover:-translate-y-2 ${
                  p.popular
                    ? "border-[#EE3038] bg-gradient-to-br from-[#EE3038]/15 to-[#1A050A] shadow-[0_40px_120px_-20px_#EE3038] scale-[1.04]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#EE3038] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white pulse-ring">
                    Most Popular
                  </span>
                )}
                <div className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
                  {p.name}
                </div>
                <div className="mt-6 font-display text-5xl font-bold text-white">
                  {p.price}
                  <span className="text-base font-normal text-white/50">{p.period}</span>
                </div>
                <p className="mt-3 text-sm text-white/60">{p.desc}</p>
                <ul className="mt-8 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                      <Check className="h-4 w-4 text-[#EE3038]" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-10 w-full rounded-full py-4 font-display font-bold transition-colors ${
                    p.popular
                      ? "bg-[#EE3038] text-white hover:bg-[#FF5A62]"
                      : "border border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  Choose {p.name}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-32">
          <Reveal>
            <DualHeading
              dark
              parts={["Frequently Asked", "Questions."]}
              className="text-[clamp(2rem,4vw,3.5rem)] leading-[1]"
            />
          </Reveal>
          <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={i}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="block w-full py-8 text-left"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span
                      className={`font-display text-xl md:text-2xl font-bold transition-colors ${
                        isOpen ? "text-[#EE3038]" : "text-white"
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      className={`mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors ${
                        isOpen
                          ? "border-[#EE3038] bg-[#EE3038] text-white"
                          : "border-white/20 text-white"
                      }`}
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </div>
                  <div
                    className={`grid transition-all duration-500 ${
                      isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-3xl text-white/70">{f.a}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Section 8: CTA & Footer ─────────── */

function CTAFooter() {
  return (
    <section data-theme="light" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-32 text-center">
        <Reveal>
          <h2
            data-cursor="blend"
            className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-[#1A050A] text-balance"
          >
            Ready To Elevate{" "}
            <span className="text-[#EE3038]">Your Campaign Intelligence?</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-[#1A050A]/60">
            Join the agencies operating with absolute proof. 14-day free trial. No card required.
          </p>
        </Reveal>
        <Reveal delay={250}>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <MagneticButton large>
              Start Your 14-Day Free Trial <ArrowRight className="h-6 w-6" />
            </MagneticButton>
          </div>
        </Reveal>
      </div>

      <footer className="border-t border-[#1A050A]/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-4">
            <div>
              <div className="font-display text-2xl font-bold text-[#1A050A]">
                Traq<span className="text-[#EE3038]">sof</span>
              </div>
              <p className="mt-4 text-sm text-[#1A050A]/60">
                AI-powered outdoor advertising intelligence for enterprise agencies.
              </p>
            </div>
            {[
              { h: "Platform", l: ["Dashboard", "AI Detection", "GPS Verification", "Reports"] },
              { h: "Company", l: ["About", "Customers", "Careers", "Press"] },
              { h: "Resources", l: ["Docs", "Blog", "Status", "Support"] },
            ].map((c) => (
              <div key={c.h}>
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1A050A]/50">
                  {c.h}
                </div>
                <ul className="mt-5 space-y-3">
                  {c.l.map((i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-sm text-[#1A050A]/80 hover:text-[#EE3038] transition-colors"
                      >
                        {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#1A050A]/10 pt-8 text-xs text-[#1A050A]/50">
            <div>© {new Date().getFullYear()} Traqsof Technologies. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#EE3038]">Privacy</a>
              <a href="#" className="hover:text-[#EE3038]">Terms</a>
              <a href="#" className="hover:text-[#EE3038]">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

/* ─────────── Page ─────────── */

function TraqsofLanding() {
  useBlendCursor();
  return (
    <main className="relative bg-white">
      <Nav />
      <Hero />
      <Impact />
      <IntelligenceEngine />
      <Results />
      <DataInMotion />
      <Review />
      <PricingFAQ />
      <CTAFooter />
    </main>
  );
}
