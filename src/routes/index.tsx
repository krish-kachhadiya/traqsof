import { createFileRoute } from "@tanstack/react-router";
import { CinematicHeader } from "../components/CinematicHeader";
import { useEffect, useRef, useState, type ReactNode } from "react";
import bulkUpload from "../assets/bulk-upload.png";
import automatedReport from "../assets/automated-report.png";
import gpsVerified from "../assets/gps-verefied.png";
import complaintSystem from "../assets/complaint-system.png";
import teamManagement from "../assets/team-management.png";
import aiPowered from "../assets/ai-powered.png";
import offlineMode from "../assets/offline-mode.png";
import logo from "../assets/logo.png";
import favicon from "../assets/favicon.png";
import captureImg from "../assets/capture.png";
import cloudUploadImg from "../assets/cloud upload.png";
import aiProcessingImg from "../assets/ai processing.png";
import dashboardImg from "../assets/dashboard.png";
import mobileFrame from "../assets/mobile_transparent.png";

import {
  motion,
  useInView as useFmInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Brain,
  Camera,
  Check,
  CheckCircle,
  ChevronDown,
  Cloud,
  FileText,
  LayoutGrid,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  MessageSquareWarning,
  Minus,
  Phone,
  Plus,
  Quote,
  Scan,
  Shield,
  ShieldCheck,
  Smartphone,
  Star,
  Upload,
  Users,
  WifiOff,
  X,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: TraqsofLanding,
});

/* ───────── design tokens ───────── */
const MID = "#1A050A";
const RED = "#EE3038";

/* ───────── helpers ───────── */
function FadeUp({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({
  to,
  duration = 1.6,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useFmInView(ref, { once: true, margin: "-60px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  const display = decimals
    ? v.toFixed(decimals)
    : Math.round(v).toLocaleString("en-IN");
  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function DualH({
  children,
  className = "",
  as: As = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <As
      className={`font-display font-bold tracking-tight leading-[0.95] ${className}`}
    >
      {children}
    </As>
  );
}

/* ───────── Hero with Interactive Dashboard ───────── */
const DASH_VIEWS = {
  Dashboard: { icon: LayoutGrid, label: "Dashboard" },
  Campaigns: { icon: Megaphone, label: "Campaigns" },
  Vendors: { icon: Users, label: "Vendors" },
  Complaints: { icon: AlertTriangle, label: "Complaints" },
} as const;
type DashKey = keyof typeof DASH_VIEWS;

function BarChartItem({ height, index, tooltipText }: { height: number; index: number; tooltipText: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex-1 flex flex-col items-center relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: -32, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="absolute z-30 bg-[#1A050A] border border-white/10 text-white text-[10px] py-1 px-2 rounded font-mono shadow-xl whitespace-nowrap -top-4"
          >
            {tooltipText}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="w-full rounded-t bg-gradient-to-t from-[#EE3038] to-[#ff7077] cursor-pointer"
        initial={{ height: 0 }}
        animate={{
          height: `${height}%`,
          y: hovered ? -6 : 0
        }}
        transition={{
          height: { delay: index * 0.03, duration: 0.5 },
          y: { type: "spring", stiffness: 300, damping: 15 }
        }}
      />
    </div>
  );
}

function InteractiveDashboard() {
  const [active, setActive] = useState<DashKey>("Dashboard");
  return (
    <div className="[perspective:2000px] w-full">
      <div className="relative rounded-[24px] p-1.5 bg-gradient-to-b from-[#333] to-[#111] border border-white/10 shadow-[0_0_120px_-20px_rgba(238,48,56,0.3)] mx-auto w-full max-w-5xl transition-transform duration-700 ease-out hover:[transform:rotateX(2deg)_rotateY(-2deg)_scale(1.02)] origin-center animate-fade-in font-sans tracking-normal">
        {/* Black glass bezel wrapper */}
        <div className="relative rounded-[20px] bg-[#050505] border-[12px] border-[#050505] overflow-hidden">
          {/* Webcam */}
          <div className="absolute top-[-9px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/10 ring-1 ring-black/50 flex items-center justify-center z-50">
            <div className="w-0.5 h-0.5 rounded-full bg-[#111]"></div>
          </div>

          {/* Existing dashboard component outer boundary */}
          <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(238,48,56,0.15)] ring-1 ring-white/5">
            {/* macOS window control dots */}
            <div className="absolute top-4 left-4 flex items-center space-x-2 z-50">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10 shadow-sm cursor-pointer hover:brightness-110 transition-all"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10 shadow-sm cursor-pointer hover:brightness-110 transition-all"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10 shadow-sm cursor-pointer hover:brightness-110 transition-all"></div>
            </div>

            <div className="flex flex-col sm:flex-row">
              {/* sidebar */}
              <aside className="w-full sm:w-44 shrink-0 border-b sm:border-b-0 sm:border-r border-white/10 bg-[#10030A]/60 p-3 pt-12">
                <div className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 hidden sm:block">
                  Workspace
                </div>
                <div className="flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible">
                  {(Object.keys(DASH_VIEWS) as DashKey[]).map((k) => {
                    const V = DASH_VIEWS[k].icon;
                    const isActive = active === k;
                    return (
                      <button
                        key={k}
                        onClick={() => setActive(k)}
                        className={`flex-1 sm:flex-none mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors whitespace-nowrap ${isActive
                          ? "bg-[#EE3038] text-white"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                          }`}
                      >
                        <V className="h-4 w-4 flex-shrink-0" />
                        <span>{k}</span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* main view */}
              <div className="min-h-[360px] flex-1 p-5">
                <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="text-sm font-semibold text-white/95">
                    {DASH_VIEWS[active].label}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-3 text-xs text-white/50 border-r border-white/10 pr-3 font-mono">
                      <span>AI Compliance: <span className="text-[#EE3038] font-bold bg-[#EE3038]/10 px-2 py-0.5 rounded-full border border-[#EE3038]/20 ml-1">94.8%</span></span>
                      <span>Saved: <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded-full border border-white/10 ml-1">₹12.4L</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] text-white/60 font-medium">Live Connection</span>
                    </div>
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="animate-in fade-in slide-in-from-bottom-2 duration-500"
                  >
                    {active === "Dashboard" && <DashView />}
                    {active === "Campaigns" && <CampaignsView />}
                    {active === "Vendors" && <VendorsView />}
                    {active === "Complaints" && <ComplaintsView />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Screen Glare reflection overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/[0.04] via-transparent to-transparent z-50 mix-blend-screen"></div>
        </div>
      </div>
    </div>
  );
}

function DashView() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div className="relative overflow-hidden bg-gradient-to-b from-white/5 to-transparent border border-white/5 rounded-xl transition-all duration-500 hover:from-[#EE3038]/10 hover:border-[#EE3038]/40 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(238,48,56,0.15)] p-3.5 text-left backdrop-blur-sm">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
            Total Campaigns
          </div>
          <div className="mt-1 font-sans text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight leading-none pt-1">
            <CountUp to={5} />
          </div>
        </div>
        <div className="relative overflow-hidden bg-gradient-to-b from-white/5 to-transparent border border-white/5 rounded-xl transition-all duration-500 hover:from-[#EE3038]/10 hover:border-[#EE3038]/40 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(238,48,56,0.15)] p-3.5 text-left backdrop-blur-sm">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
            Active Sites
          </div>
          <div className="mt-1 font-sans text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight leading-none pt-1">
            <CountUp to={31} />
          </div>
        </div>
        <div className="relative overflow-hidden bg-gradient-to-b from-white/5 to-transparent border border-white/5 rounded-xl transition-all duration-500 hover:from-[#EE3038]/10 hover:border-[#EE3038]/40 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(238,48,56,0.15)] p-3.5 text-left backdrop-blur-sm">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
            Pending
          </div>
          <div className="mt-1 font-sans text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight leading-none pt-1">
            <CountUp to={11} />
          </div>
        </div>
        <div className="relative overflow-hidden bg-gradient-to-b from-white/5 to-transparent border border-white/5 rounded-xl transition-all duration-500 hover:from-[#EE3038]/10 hover:border-[#EE3038]/40 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(238,48,56,0.15)] p-3.5 text-left backdrop-blur-sm">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
            Total Complaints
          </div>
          <div className="mt-1 font-sans text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight leading-none pt-1">
            <CountUp to={3} />
          </div>
        </div>
      </div>

      {/* Two-column layout for OOH charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campaign Allocation (Bar Chart) */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left backdrop-blur-md flex flex-col justify-between">
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">Campaign Allocation</h4>
            <p className="text-[10px] text-white/40">Active OOH distribution across major hubs</p>
          </div>

          <div className="space-y-3.5">
            {/* Mumbai */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/75 font-medium">Mumbai</span>
                <span className="font-mono text-white/90">45%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-[#EE3038] to-[#ff6b70] rounded-full shadow-[0_0_8px_rgba(238,48,56,0.3)] transition-all duration-1000"
                  style={{ width: '45%' }}
                />
              </div>
            </div>

            {/* Delhi */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/75 font-medium">Delhi</span>
                <span className="font-mono text-white/90">35%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-[#EE3038] to-[#ff6b70] rounded-full opacity-90 shadow-[0_0_8px_rgba(238,48,56,0.2)] transition-all duration-1000"
                  style={{ width: '35%' }}
                />
              </div>
            </div>

            {/* Bangalore */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/75 font-medium">Bangalore</span>
                <span className="font-mono text-white/90">20%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-[#ff6b70] to-[#ff8f93] rounded-full shadow-[0_0_8px_rgba(255,107,112,0.2)] transition-all duration-1000"
                  style={{ width: '20%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Issue Distribution (Donut Chart) */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left backdrop-blur-md">
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">Issue Distribution</h4>
            <p className="text-[10px] text-white/40">OOH compliance logs by issue type</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            {/* Conic Gradient Donut */}
            <div
              className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(0,0,0,0.4)] border border-white/10"
              style={{
                background: "conic-gradient(#EE3038 0% 50%, #f97316 50% 80%, #eab308 80% 100%)"
              }}
            >
              {/* Inner hole */}
              <div className="w-20 h-20 rounded-full bg-[#10030A] border border-white/10 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-white leading-none">3</span>
                <span className="text-[8px] uppercase tracking-wider text-white/40 mt-0.5 font-mono">Active Logs</span>
              </div>
            </div>

            {/* Legend */}
            <div className="w-full sm:flex-1 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#EE3038] flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center text-xs">
                  <span className="text-white/70">Illumination</span>
                  <span className="font-mono text-white/90">50%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#f97316] flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center text-xs">
                  <span className="text-white/70">Vinyl Damage</span>
                  <span className="font-mono text-white/90">30%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#eab308] flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center text-xs">
                  <span className="text-white/70">Obstruction</span>
                  <span className="font-mono text-white/90">20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CampaignsView() {
  const campaigns = [
    { title: "JDT Campaign", status: "Active", channel: "OOH", start: "Jun 18, 2026", end: "Jul 18, 2026" },
    { title: "BQS Andheri West", status: "Active", channel: "OOH", start: "Jun 10, 2026", end: "Jul 10, 2026" },
    { title: "Metro Line 1 Drive", status: "Draft", channel: "Transit", start: "Jul 01, 2026", end: "Aug 01, 2026" },
    { title: "Link Road Billboard", status: "Active", channel: "OOH", start: "Jun 15, 2026", end: "Jul 15, 2026" }
  ];

  return (
    <div className="space-y-4">
      {/* Top summary row: glass pills */}
      <div className="flex gap-2 text-[10px] sm:text-xs">
        <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-white/80 backdrop-blur-sm">
          Total Qty/Sites: <span className="font-semibold text-white">1071/68</span>
        </span>
        <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-white/80 backdrop-blur-sm">
          Budget: <span className="font-semibold text-emerald-400">₹501,700</span>
        </span>
      </div>

      {/* Grid of Campaign Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {campaigns.map((c) => (
          <div
            key={c.title}
            className="rounded-xl bg-white/[0.02] p-3.5 text-left backdrop-blur-sm flex flex-col justify-between transition-all duration-300 border border-white/5 hover:border-[#EE3038]/50 hover:bg-[#EE3038]/5 hover:shadow-[0_0_25px_rgba(238,48,56,0.2)] hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2.5">
              <h4 className="text-sm font-semibold text-white truncate max-w-[150px]">{c.title}</h4>
              <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${c.status === "Active"
                ? "bg-emerald-400/15 text-emerald-300"
                : "bg-white/10 text-white/60"
                }`}>
                {c.status}
              </span>
            </div>
            <div className="space-y-1 text-[11px] text-white/60">
              <div>Channel: <span className="text-white/90 font-medium">{c.channel}</span></div>
              <div className="flex justify-between text-[10px] text-white/50 border-t border-white/5 pt-2 mt-2">
                <span>Start: {c.start}</span>
                <span>End: {c.end}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VendorsView() {
  const vendors = [
    { name: "Times OOH", email: "contact@timesooh.in", status: "ACTIVE" },
    { name: "Laqshya Media Group", email: "operations@laqshyamedia.com", status: "PENDING" },
    { name: "Bright Outdoor Media", email: "info@brightoutdoor.com", status: "ACTIVE" },
    { name: "JCDecaux India", email: "support@jcdecaux.co.in", status: "IN REVIEW" }
  ];

  return (
    <div className="space-y-1.5">
      <div className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-wider text-white/40 text-left">
        Agency Partners
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden backdrop-blur-sm p-1.5 space-y-1">
        {vendors.map((vendor, idx) => (
          <div
            key={vendor.email}
            className="flex items-center justify-between p-3.5 text-left text-xs transition-all duration-300 border border-white/5 hover:border-[#EE3038]/50 hover:bg-[#EE3038]/5 hover:shadow-[0_0_25px_rgba(238,48,56,0.2)] hover:-translate-y-1 cursor-pointer rounded-lg"
          >
            <div className="space-y-0.5">
              <div className="font-semibold text-white">{vendor.name}</div>
              <div className="text-[10px] text-white/50 font-mono">{vendor.email}</div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-[9px] font-semibold px-2.5 py-0.5 rounded-full border ${vendor.status === "ACTIVE"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.1)]"
                : vendor.status === "PENDING"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_8px_rgba(245,158,11,0.1)] animate-pulse"
                  : "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.1)]"
                }`}>
                {vendor.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComplaintsView() {
  const complaints = [
    {
      subject: "Illumination failure on South-facing panel",
      campaign: "Western Express Hwy",
      img: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=150&h=150",
      status: "OPEN",
      color: "red"
    },
    {
      subject: "Severe vinyl peeling on bottom-right edge",
      campaign: "Bandra Kurla Complex",
      img: "https://images.unsplash.com/photo-1517650862521-d580d5348145?auto=format&fit=crop&w=150&h=150",
      status: "IN PROGRESS",
      color: "yellow"
    },
    {
      subject: "Structural obstruction from overgrown foliage",
      campaign: "Delhi DND Toll",
      img: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=150&h=150",
      status: "RESOLVED",
      color: "green"
    }
  ];

  return (
    <div className="space-y-3.5">
      {/* Top colored metric pills */}
      <div className="flex gap-2 text-[10px] font-semibold">
        <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 text-rose-300">
          1 Open
        </span>
        <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-amber-300">
          1 In Progress
        </span>
        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-emerald-300">
          1 Resolved
        </span>
      </div>

      {/* List of Complaints */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden backdrop-blur-sm p-1.5 space-y-1">
        {complaints.map((c, idx) => (
          <div
            key={c.subject}
            className="flex items-center gap-3.5 p-3.5 text-left text-xs transition-all duration-300 border border-white/5 hover:border-[#EE3038]/50 hover:bg-[#EE3038]/5 hover:shadow-[0_0_25px_rgba(238,48,56,0.2)] hover:-translate-y-1 cursor-pointer rounded-lg"
          >
            {/* Image Thumbnail */}
            <img
              src={c.img}
              alt={c.subject}
              className="w-12 h-12 rounded-lg object-cover border border-white/10 flex-shrink-0 animate-fade-in"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 justify-between">
                <span className="font-semibold text-white truncate">{c.subject}</span>
              </div>
              <div className="text-[10px] text-white/50 mt-0.5">Campaign: <span className="text-white/80">{c.campaign}</span></div>
            </div>
            {/* Status dot */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className={`w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor] ${c.color === "red"
                ? "bg-rose-500 text-rose-500 animate-pulse"
                : c.color === "yellow"
                  ? "bg-amber-400 text-amber-400"
                  : "bg-emerald-400 text-emerald-400"
                }`} />
              <span className={`text-[10px] font-semibold hidden sm:inline ${c.color === "red"
                ? "text-rose-300"
                : c.color === "yellow"
                  ? "text-amber-300"
                  : "text-emerald-300"
                }`}>
                {c.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

function RippleButton({ children, href, className }: { children: ReactNode; href: string; className: string }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height);
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id, x, y, size }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${className} relative overflow-visible`}
    >
      <span className="relative z-10 flex items-center gap-2 pointer-events-none">{children}</span>
      <span className="absolute inset-0 rounded-full border-2 border-[#EE3038] animate-pulse-ring pointer-events-none"></span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/40 rounded-full animate-ripple pointer-events-none"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </a>
  );
}

function Hero() {
  return (
    <section
      id="top"
      data-theme="dark"
      className="relative overflow-visible bg-[#1A050A] pt-12 pb-24 text-white animate-fade-in"
    >
      {/* Grid background — ONLY here */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      {/* Floating Data Particles */}
      <div className="absolute bottom-[10%] left-[20%] w-1.5 h-1.5 bg-[#EE3038] rounded-full blur-[1px] animate-[float-up_10s_ease-in-out_infinite] opacity-40 pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[25%] w-2 h-2 bg-white rounded-full blur-[2px] animate-[float-up_14s_ease-in-out_infinite_2s] opacity-20 pointer-events-none z-0"></div>
      <div className="absolute top-[40%] left-[15%] w-1.5 h-1.5 bg-white rounded-full blur-[0.5px] animate-[float-up_12s_ease-in-out_infinite_1s] opacity-30 pointer-events-none z-0"></div>
      <div className="absolute top-[30%] right-[15%] w-1.5 h-1.5 bg-[#EE3038] rounded-full blur-[1px] animate-[float-up_16s_ease-in-out_infinite_3s] opacity-25 pointer-events-none z-0"></div>

      <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#EE3038] opacity-20 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#EE3038] opacity-20 blur-[120px] pointer-events-none z-0"></div>
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center text-center justify-center pt-32 pb-16 px-4 z-10">
        <FadeUp>
          <div className="flex items-center gap-2 border border-white/10 rounded-full px-6 py-2 mb-3 text-sm font-semibold tracking-widest text-white/70 uppercase shadow-[0_0_15px_rgba(238,48,56,0.2)] animate-[pulse_4s_ease-in-out_infinite]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EE3038]"></div>
            AI OUTDOOR INTELLIGENCE &middot; ENTERPRISE GRADE
          </div>
        </FadeUp>

        <h1
          className="text-4xl md:text-5xl lg:text-[5rem] font-bold tracking-tight leading-[1.1] text-white mb-6 w-full max-w-5xl mx-auto animate-blur-fade-up opacity-0"
          data-cursor-massive="true"
        >
          Ensure Campaign Excellence <br className="hidden md:block" />
          with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EE3038] via-[#ff6b70] to-[#EE3038] bg-[length:200%_auto] animate-[gradient-shift_3s_linear_infinite]">Absolute Proof.</span>
        </h1>

        <div className="max-w-3xl mb-10 animate-blur-fade-up opacity-0 [animation-delay:200ms]">
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            AI-powered campaign monitoring delivering GPS-verified accuracy and real-time compliance for the world's most demanding advertising agencies.
          </p>
        </div>

        <FadeUp delay={0.3}>
          <div className="flex items-center justify-center gap-4 mt-12 relative z-20">
            <RippleButton
              href="#platform"
              className="relative overflow-visible bg-[#EE3038] text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-[#d62b32] transition-all shadow-[0_0_20px_rgba(238,48,56,0.3)]"
            >
              See the Platform
              <ArrowUpRight className="w-5 h-5" />
            </RippleButton>
          </div>
        </FadeUp>

        {/* Anti-Gravity React Dashboard stacked here */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 18,
            mass: 0.8,
          }}
          className="w-full max-w-5xl mt-16"
        >
          <InteractiveDashboard />
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── Scale of Impact ───────── */
function Impact() {
  const stats = [
    { v: 12847, p: "", s: "", label: "Sites Monitored", fmt: "n" },
    { v: 94.8, p: "", s: "%", label: "Verification Rate", fmt: "d" },
    { v: 500, p: "₹", s: "+ Cr", label: "Ad Spend Protected", fmt: "n" },
  ];
  return (
    <section
      id="platform"
      data-theme="light"
      className="bg-white py-24 text-[#1A050A]"
    >
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#EE3038]">
              Scale of Impact
            </div>
            <DualH className="text-4xl sm:text-5xl lg:text-6xl">
              Precision at the scale of{" "}
              <span className="text-[#EE3038]">a billion impressions.</span>
            </DualH>
          </div>
        </FadeUp>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.12}>
              <div className="border-t-2 border-[#1A050A]/10 pt-6 text-center">
                <div className="font-display text-5xl font-bold leading-none tracking-tight text-[#1A050A] sm:text-6xl">
                  {s.fmt === "d" ? (
                    <CountUp to={s.v} decimals={1} suffix={s.s} prefix={s.p} />
                  ) : (
                    <CountUp to={s.v} suffix={s.s} prefix={s.p} />
                  )}
                </div>
                <div className="mt-3 text-sm font-medium text-[#1A050A]/60">
                  {s.label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Capabilities Section ───────── */
const CAPABILITIES_DATA = [
  {
    icon: Upload,
    title: "Bulk Site Upload",
    text: "Import 10,000 sites in seconds. CSV, Excel, or API — Traqsof auto-normalizes addresses, dedupes records, and geocodes with sub-meter accuracy.",
    image: bulkUpload
  },
  {
    icon: FileText,
    title: "Automated Reports",
    text: "White-labeled PDF reports sent to clients daily, weekly, or on milestones. Branded, signed, and verifiable in one click.",
    image: automatedReport
  },
  {
    icon: MapPin,
    title: "GPS-Verified Captures",
    text: "Every photo is stamped with sub-5m GPS, device ID, timezone, and tamper-evident hash. Disputes end before they start.",
    image: gpsVerified
  },
  {
    icon: MessageSquareWarning,
    title: "Compliance System",
    text: "End-to-end ticket flow from field to vendor to client. SLA timers, escalations, and audit logs out of the box.",
    image: complaintSystem
  },
  {
    icon: Users,
    title: "Team Management",
    text: "Role-based access for ops, vendors, and clients. Geo-fenced assignments ensure crews are exactly where they need to be.",
    image: teamManagement
  },
  {
    icon: Brain,
    title: "AI Detection",
    text: "Vision models flag obstructed faces, wrong creatives, lighting failures, and unauthorized over-postings automatically.",
    image: aiPowered
  },
  {
    icon: WifiOff,
    title: "Offline Mode",
    text: "Field crews capture in dead zones. Everything syncs intact the moment a signal returns — no lost evidence, ever.",
    image: offlineMode
  },
];

function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        <div className="absolute top-10 left-10 z-50 pointer-events-none">
          <h2 className="text-[#EE3038] tracking-[0.2em] text-sm font-bold uppercase">
            Capabilities
          </h2>
        </div>

        <div className="absolute top-1/2 left-[10%] right-0 h-2 -translate-y-1/2 z-10">
          <div className="w-full h-full bg-gray-800 rounded-full" />
          <motion.div
            style={{ scaleX }}
            className="absolute left-0 top-0 h-full bg-[#EE3038] rounded-full shadow-[0_0_20px_rgba(238,48,56,0.8)] origin-left min-w-[1rem]"
          />
        </div>

        <motion.div
          style={{ x }}
          className="flex absolute top-0 left-[10%] h-full z-20"
        >
          {CAPABILITIES_DATA.map((item, index) => (
            <div key={index} className="w-[40vw] shrink-0 h-full relative">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "0px -40% 0px 0px" }}
                className={`absolute left-0 ${index % 2 === 0 ? "bottom-[55%]" : "top-[55%]"
                  }`}
              >
                <h3 className="text-4xl text-white font-bold">
                  {item.title}
                </h3>
                <p className="text-gray-400 mt-4 max-w-sm">
                  {item.text}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ───────── Results ───────── */
function Results() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const stats = [
    { start: 15, end: 25, isRange: true, suffix: "%", l: "Vendor billing reduced", val: 0 },
    { val: 95, suffix: "%", l: "Faster proof-of-display", start: 0, end: 0, isRange: false },
    { val: 0, suffix: "%", l: "Disputed invoices", start: 0, end: 0, isRange: false },
  ];

  return (
    <section data-theme="light" className="bg-white py-28 text-[#1A050A]">
      <div className="mx-auto max-w-7xl px-6">

        {/* Cinematic Headline Kinetic Drop */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#EE3038]">
            Real Campaigns. Real Results.
          </div>
          <DualH className="text-4xl sm:text-5xl lg:text-6xl flex flex-col md:block">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              Numbers that change{" "}
            </motion.span>
            <motion.span
              className="text-[#EE3038] inline-block"
              initial={{ opacity: 0, y: -20, scale: 1.05 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: 0.2 }}
            >
              how agencies operate.
            </motion.span>
          </DualH>
        </div>

        {/* Staggered Stat Cards with Count-up */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(238,48,56,0.1)" }}
              className="rounded-2xl border border-[#1A050A]/10 bg-white p-8 text-center transition-shadow duration-300"
            >
              <div className="font-display text-5xl font-bold tracking-tight text-[#EE3038] sm:text-6xl">
                {s.isRange ? (
                  <>
                    <CountUp to={s.start} />-<CountUp to={s.end} />%
                  </>
                ) : (
                  <CountUp to={s.val} suffix={s.suffix} />
                )}
              </div>
              <div className="mt-2 text-sm font-medium text-[#1A050A]/70">
                {s.l}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Before / After Focus Shift Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Before Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 0.6, x: 0 }}
            whileHover={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl border border-[#1A050A]/10 bg-[#F8F8FA] p-8"
          >
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#1A050A]/50">
              Before
            </div>
            <h3 className="font-display text-2xl font-bold">Campaign Chaos</h3>
            <ul className="mt-6 space-y-3 text-sm text-[#1A050A]/70">
              {[
                "Manual WhatsApp photo dumps",
                "Vendor invoices accepted on trust",
                "Client reports cobbled in Excel",
                "Disputes resolved over weeks",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-[#1A050A]/40" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After Card */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="rounded-2xl border-2 border-[#EE3038] bg-white p-8 shadow-[0_0_40px_rgba(238,48,56,0.15)] ring-1 ring-[#EE3038]/50"
          >
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#EE3038]">
              After Traqsof
            </div>
            <h3 className="font-display text-2xl font-bold">
              Organized Monitoring
            </h3>
            <ul className="mt-6 space-y-3 text-sm text-[#1A050A]/80">
              {[
                "GPS-stamped captures from every site",
                "AI-verified, audit-grade evidence",
                "Branded reports in one click",
                "Disputes resolved before they start",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#EE3038]" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Solution — vertical tabs + phone ───────── **/
const SOL_TABS = [
  {
    title: "GPS-Verified Monitoring",
    body: "Sub-meter accuracy with tamper-evident metadata on every capture.",
  },
  {
    title: "Real-time Dashboard",
    body: "Live site status, vendor performance, and campaign pacing in one view.",
  },
  {
    title: "AI-Powered Reports",
    body: "Auto-generated, white-labeled reports your clients actually trust.",
  },
  {
    title: "Compliance Tracking",
    body: "End-to-end audit trail for every site, every photo, every change.",
  },
];

function PhoneFrame({ active }: { active: number }) {
  return (
    <div className="relative mx-auto h-[560px] w-[280px] rounded-[44px] border-[10px] border-[#10030A] bg-[#0a0205] shadow-2xl">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#10030A]" />
      <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-[#1A050A] p-4 pt-10 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-[#EE3038]">
              {SOL_TABS[active].title}
            </div>
            {active === 0 && (
              <div className="space-y-2">
                <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-[#EE3038]/30 to-transparent" />
                <div className="flex items-center justify-between rounded-lg bg-white/5 p-2 text-[10px]">
                  <span>📍 19.0760° N, 72.8777° E</span>
                  <Check className="h-3 w-3 text-emerald-400" />
                </div>
              </div>
            )}
            {active === 1 && (
              <div className="space-y-2">
                {[88, 64, 92, 51].map((v, j) => (
                  <div key={j} className="rounded-lg bg-white/5 p-2">
                    <div className="mb-1 flex justify-between text-[10px]">
                      <span>Campaign {j + 1}</span>
                      <span>{v}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-[#EE3038]" style={{ width: `${v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {active === 2 && (
              <div className="space-y-2">
                <div className="rounded-lg bg-white/5 p-3">
                  <FileText className="mb-2 h-6 w-6 text-[#EE3038]" />
                  <div className="text-xs font-semibold">Weekly Report</div>
                  <div className="text-[10px] text-white/50">Generated 2m ago</div>
                </div>
                <div className="rounded-lg bg-[#EE3038] p-2 text-center text-[10px] font-semibold">
                  Download PDF
                </div>
              </div>
            )}
            {active === 3 && (
              <div className="space-y-2">
                {[
                  "Vendor signed", "GPS verified", "AI approved", "Client notified",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2 rounded-lg bg-white/5 p-2 text-[10px]">
                    <Check className="h-3 w-3 text-emerald-400" /> {t}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Solution() {
  return (
    <section
      id="solutions"
      data-theme="light"
      className="bg-white py-28 text-gray-900 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-100 to-transparent rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-50 to-transparent rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <FadeUp>
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#EE3038]">
              The Solution
            </div>
            <DualH className="text-4xl drop-shadow-md sm:text-5xl lg:text-6xl">
              One platform.{" "}
              <span className="text-[#EE3038]">Every answer.</span>
            </DualH>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Streamline your outdoor advertising workflow with our comprehensive platform designed for modern agencies and brands.
            </p>
          </div>
        </FadeUp>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {SOL_TABS.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group cursor-pointer rounded-3xl p-8 transition-all duration-800 ease-[cubic-bezier(0.25,0.1,0.25,1)] bg-white border-2 border-gray-100 hover:bg-gradient-to-br hover:from-[#E85A5F] hover:to-[#EE3038] hover:border-[#EE3038] hover:shadow-[0_8px_32px_rgba(238,48,56,0.2)] hover:-translate-y-1 hover:scale-[1.02]"
            >
              {/* Number badge */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-800 ease-[cubic-bezier(0.25,0.1,0.25,1)] bg-gray-100 text-gray-600 group-hover:bg-white group-hover:text-[#EE3038]">
                0{i + 1}
              </div>

              {/* Icon placeholder */}
              <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-all duration-800 ease-[cubic-bezier(0.25,0.1,0.25,1)] bg-gray-100 group-hover:bg-white/20 backdrop-blur-sm">
                {i === 0 && <Upload className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors duration-800" />}
                {i === 1 && <FileText className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors duration-800" />}
                {i === 2 && <Scan className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors duration-800" />}
                {i === 3 && <CheckCircle className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors duration-800" />}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-white transition-colors duration-800">
                {t.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-gray-600 group-hover:text-white/90 transition-colors duration-800">
                {t.body}
              </p>

              {/* Hover effect indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-800">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#EE3038]/20 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#EE3038]/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-[#EE3038]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Lightning Fast</h4>
              <p className="text-sm text-gray-600">Real-time updates and instant notifications keep your team in sync.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#EE3038]/20 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#EE3038]/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-[#EE3038]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Secure & Compliant</h4>
              <p className="text-sm text-gray-600">Enterprise-grade security with full audit trails and compliance reporting.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#EE3038]/20 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#EE3038]/10 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-6 h-6 text-[#EE3038]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Data-Driven Insights</h4>
              <p className="text-sm text-gray-600">Advanced analytics and reporting to optimize your campaigns.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── Benefits Section with Scroll Animation ───────── */
const BENEFITS = [
  {
    title: "Free Trial",
    description: "Get started with TraQsof for free and explore real-time campaign monitoring, AI verification, and smart reporting tools.",
    image: "/free-trial.png"
  },
  {
    title: "Easy to use",
    description: "Simple, smart, and powerful outdoor campaign monitoring for modern teams.",
    image: "/easy-to-use.png"
  },
  {
    title: "24/7 Support",
    description: "24/7 support for seamless campaign monitoring and issue resolution.",
    image: "/customer-support.png"
  },
  {
    title: "One Platform for Everyone",
    description: "Connect clients, vendors, and field teams in a single platform to streamline campaign management, approvals, and issue resolution.",
    image: "/platform.png"
  }
];

function Benefits() {
  return (
    <section
      id="benefits"
      data-theme="dark"
      className="bg-[#1A050A] py-28 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp>
          <div className="mx-auto mb-24 max-w-3xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#EE3038]">
              Benefits
            </div>
            <DualH className="text-4xl drop-shadow-md sm:text-5xl lg:text-6xl">
              Why choose <span className="text-[#EE3038]">TraQsof?</span>
            </DualH>
          </div>
        </FadeUp>

        <div className="space-y-32">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="grid items-center gap-12 lg:grid-cols-2"
            >
              <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <motion.img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-auto rounded-2xl shadow-2xl border border-white/10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                />
              </div>
              <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                >
                  <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-lg text-white/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Workflow (Interactive Phone Preview) ───────── */
const FLOW = [
  {
    n: "01",
    t: "Photo Capture",
    d: "Field crew snaps GPS-locked, tamper-proof photos of campaign layouts on the street.",
    img: captureImg,
  },
  {
    n: "02",
    t: "Cloud Upload",
    d: "Photos are uploaded automatically to cloud storage with secure metadata hashes.",
    img: cloudUploadImg,
  },
  {
    n: "03",
    t: "AI Processing",
    d: "Advanced vision intelligence parses features and validates compliance instantly.",
    img: aiProcessingImg,
  },
  {
    n: "04",
    t: "Dashboard Update",
    d: "Clean data updates the real-time client panel with visual proof of execution.",
    img: dashboardImg,
  },
];

function Workflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance function
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FLOW.length);
    }, 3500);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    startTimer(); // reset timer on click
  };

  return (
    <section id="workflow" data-theme="dark" className="bg-[#1A050A] py-28 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center mb-20">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#EE3038]">
              Workflow
            </div>
            <DualH className="text-4xl sm:text-5xl lg:text-6xl">
              From street-level capture to{" "}
              <span className="text-[#EE3038]">boardroom proof.</span>
            </DualH>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 2x2 Grid of Step Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {FLOW.map((f, i) => {
              const isActive = activeIndex === i;
              return (
                <FadeUp key={f.n} delay={i * 0.05}>
                  <div
                    onClick={() => handleCardClick(i)}
                    className={`group relative p-8 rounded-[1.8rem] cursor-pointer select-none transition-all duration-500 border flex flex-col justify-between h-[210px] ${isActive
                      ? "bg-[#EE3038] border-[#EE3038] text-white scale-[1.05] shadow-[0_15px_30px_rgba(238,48,56,0.3)] z-10"
                      : "bg-[#111111] border-white/5 text-gray-400 hover:border-white/10 hover:bg-[#151515]"
                      }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span
                          className={`font-display text-xs font-bold tracking-widest ${isActive ? "text-white/80" : "text-[#EE3038]"
                            }`}
                        >
                          STEP {f.n}
                        </span>
                        <span
                          className={`text-2xl font-bold font-display leading-none ${isActive ? "text-white/30" : "text-white/10 group-hover:text-white/20 transition-colors"
                            }`}
                        >
                          {f.n}
                        </span>
                      </div>
                      <h3
                        className={`mt-4 text-xl sm:text-2xl font-bold font-display ${isActive ? "text-white" : "text-white group-hover:text-[#EE3038] transition-colors"
                          }`}
                      >
                        {f.t}
                      </h3>
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${isActive ? "text-white/95" : "text-gray-400/80"
                        }`}
                    >
                      {f.d}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          {/* Right Column: Sticky Phone Container */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-[340px] h-[670px] mx-auto select-none pointer-events-none md:sticky md:top-32">
              {/* Opaque PNG Phone Frame overlay */}
              <img
                src={mobileFrame}
                alt="Phone Frame"
                className="absolute inset-0 w-full h-full object-fill pointer-events-none z-20"
              />

              {/* Underlying screen container positioned within screen frame area */}
              <div
                className="absolute top-[3.49%] left-[9.69%] w-[80.63%] h-[91.04%] bg-[#1A050A] rounded-[1rem] overflow-hidden z-10 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
              >
                {FLOW.map((f, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <img
                      key={f.n}
                      src={f.img}
                      alt={f.t}
                      className={`absolute top-0 left-0 w-full h-full object-fill transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0"
                        }`}
                    />
                  );
                })}
                {/* Glossy glass glare reflection overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.08] z-20 mix-blend-screen" />
                {/* Inner shadow for screen depth */}
                <div className="absolute inset-0 pointer-events-none rounded-[1rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] z-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ───────── Compare Table ───────── */
const COMPARE_ROWS = [
  ["GPS-verified evidence", false, "partial", true],
  ["AI compliance detection", false, false, true],
  ["Real-time dashboards", false, true, true],
  ["Branded client reports", false, "partial", true],
  ["Offline field capture", false, false, true],
  ["End-to-end complaint flow", false, false, true],
  ["Audit-grade trail", false, "partial", true],
];

function Cell({ v }: { v: boolean | "partial" }) {
  if (v === true)
    return (
      <div className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-[#EE3038] text-white">
        <Check className="h-4 w-4" />
      </div>
    );
  if (v === "partial")
    return <Minus className="mx-auto h-5 w-5 text-gray-400" />;
  return <X className="mx-auto h-5 w-5 text-gray-300" />;
}

function Compare() {
  return (
    <section
      id="compare"
      data-theme="light"
      className="bg-white py-28 text-gray-900"
    >
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp>
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#EE3038]">
              Compare
            </div>
            <DualH className="text-4xl drop-shadow-md sm:text-5xl lg:text-6xl">
              Why agencies{" "}
              <span className="text-[#EE3038]">switch to Traqsof.</span>
            </DualH>
          </div>
        </FadeUp>

        <FadeUp>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center border-b border-gray-200 text-sm">
              <div className="p-5 font-semibold text-gray-600">Feature</div>
              <div className="p-5 text-center font-semibold text-gray-600">Manual</div>
              <div className="p-5 text-center font-semibold text-gray-600">Competitors</div>
              <div className="bg-[#EE3038]/10 p-5 text-center font-display text-base font-bold text-[#EE3038]">
                Traqsof
              </div>
            </div>
            {COMPARE_ROWS.map(([label, a, b, c], i) => (
              <div
                key={i}
                className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center border-b border-gray-200 text-sm last:border-b-0"
              >
                <div className="p-5 font-medium text-gray-900">{label as string}</div>
                <div className="p-5"><Cell v={a as boolean | "partial"} /></div>
                <div className="p-5"><Cell v={b as boolean | "partial"} /></div>
                <div className="bg-[#EE3038]/5 p-5"><Cell v={c as boolean | "partial"} /></div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ───────── Trusted By — 3D tilt blockquote + marquee ───────── */
function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useTransform(y, [-50, 50], [8, -8]);
  const ry = useTransform(x, [-50, 50], [-8, 8]);
  const sx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sy = useSpring(ry, { stiffness: 200, damping: 18 });
  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set(e.clientX - r.left - r.width / 2);
        y.set(e.clientY - r.top - r.height / 2);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX: sx, rotateY: sy, transformPerspective: 1000 }}
      className="relative will-change-transform"
    >
      {children}
    </motion.div>
  );
}

const LOGOS = [
  "Bright Outdoor", "Selvel One", "Times OOH", "Laqshya", "Posterscope",
  "Kinetic", "Milestone", "Pioneer Publicity", "Signpost", "JCDecaux",
];

function Trusted() {
  return (
    <section data-theme="dark" className="bg-[#1A050A] py-28 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp>
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#EE3038]">
              Trusted By Industry Leaders
            </div>
            <DualH className="text-4xl sm:text-5xl lg:text-6xl">
              The teams shipping India's biggest{" "}
              <span className="text-[#EE3038]">outdoor campaigns.</span>
            </DualH>
          </div>
        </FadeUp>

        <FadeUp>
          <div className="mx-auto max-w-3xl" style={{ perspective: "1200px" }}>
            <TiltCard>
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-10 shadow-[0_30px_80px_-30px_rgba(238,48,56,0.25)]">
                <Quote className="absolute -top-4 left-8 h-10 w-10 fill-[#EE3038] text-[#EE3038]" />
                <p className="font-display text-2xl leading-snug text-white sm:text-3xl">
                  "We were losing{" "}
                  <span className="text-[#EE3038]">₹15 lakh a quarter</span>{" "}
                  to unverifiable sites. Traqsof closed that hole in a single
                  billing cycle."
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#EE3038] to-[#1A050A] font-display text-lg font-bold text-white">
                    RM
                  </div>
                  <div>
                    <div className="font-display text-base font-bold">
                      Rajeev Menon
                    </div>
                    <div className="text-xs text-white/60">
                      Marketing Head · Bright Outdoor Media
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </FadeUp>

        <div className="mt-20 overflow-hidden">
          <div className="flex w-max animate-marquee gap-12">
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <div
                key={i}
                className="font-display text-2xl font-bold tracking-tight text-white/40 transition-colors hover:text-[#EE3038]"
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Pricing & FAQ ───────── */
const TIERS = [
  {
    name: "Starter",
    desc: "For boutique agencies getting started.",
    priceMonthly: "₹24,999",
    priceAnnually: "₹19,999",
    period: "/mo",
    features: ["Up to 500 sites", "GPS verification", "Email reports", "1 admin seat"],
  },
  {
    name: "Standard",
    desc: "For growing teams shipping at scale.",
    priceMonthly: "₹74,999",
    priceAnnually: "₹59,999",
    period: "/mo",
    features: [
      "Up to 5,000 sites",
      "AI compliance detection",
      "Branded PDF reports",
      "5 admin + 50 field seats",
      "Complaint workflow",
    ],
    featured: true,
  },
  {
    name: "Professional",
    desc: "Enterprise control across regions.",
    priceMonthly: "Custom",
    priceAnnually: "Custom",
    period: "",
    features: ["Unlimited sites", "SSO & SCIM", "API + webhooks", "Dedicated CSM", "99.95% SLA"],
  },
];

const FAQS = [
  ["How fast can we onboard?", "Most teams are live within 72 hours. We import your existing site list, train your field crews, and ship branded dashboards in parallel."],
  ["Does Traqsof work offline?", "Yes. Field captures queue locally with full metadata and sync automatically when connectivity returns — no lost evidence."],
  ["Can we white-label reports?", "Every PDF, dashboard, and client portal can be themed with your logo, colors, and domain."],
  ["What about data residency?", "All data resides in India (Mumbai region) by default, with optional regional pinning for enterprise customers."],
  ["How is billing handled?", "Annual or monthly, per-site or per-seat. Cancel anytime within the first 14 days, no questions asked."],
];

function PricingCard({ t, isAnnual, i }: { t: typeof TIERS[number]; isAnnual: boolean; i: number }) {
  const price = isAnnual ? t.priceAnnually : t.priceMonthly;
  const hasDiscount = isAnnual && t.priceAnnually !== "Custom";

  // Spotlight coordinates tracking
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <FadeUp key={t.name} delay={i * 0.1}>
      <div
        onMouseMove={handleMouseMove}
        className={`group relative h-full rounded-3xl border p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 overflow-hidden active:scale-95 select-none ${
          t.featured
            ? "scale-[1.04] border-[#EE3038] bg-gradient-to-b from-[#EE3038]/15 to-[#EE3038]/5 shadow-[0_0_60px_-10px_rgba(238,48,56,0.55)] hover:shadow-[0_20px_50px_rgba(238,48,56,0.22)] z-10"
            : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
        }`}
      >
        {/* Cursor spotlight background overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: t.featured
              ? `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(238, 48, 56, 0.12), transparent 80%)`
              : `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.7), transparent 80%)`,
          }}
        />

        {t.featured && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#EE3038] px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white border border-white/10 z-10">
            Most popular
          </div>
        )}

        <div className="relative z-10 w-full">
          <div className="flex justify-between items-center mb-1">
            <div className="font-display text-xl font-bold text-gray-900">{t.name}</div>
            {hasDiscount && (
              <span className="text-[10px] font-semibold text-[#EE3038] bg-[#EE3038]/10 border border-[#EE3038]/20 rounded-full px-2.5 py-0.5">
                Save 20%
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600 leading-relaxed mb-6">{t.desc}</div>
          
          <div className="flex items-baseline gap-1 mb-6 border-b border-gray-100 pb-6 overflow-hidden">
            <div className="relative h-[56px] flex items-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={price}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="inline-block font-display text-5xl font-bold tracking-tight text-gray-900"
                >
                  {price}
                </motion.span>
              </AnimatePresence>
            </div>
            {t.period && (
              <span className="text-sm text-gray-500 font-medium select-none">
                {t.period}
              </span>
            )}
          </div>

          <ul className="space-y-3.5 text-sm">
            {t.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-gray-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#EE3038]" />
                <span className="leading-tight">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#cta"
          className={`relative z-10 mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer ${
            t.featured
              ? "bg-[#EE3038] text-white hover:bg-[#ff464e] shadow-[0_5px_15px_rgba(238,48,56,0.3)]"
              : "border border-gray-300 text-gray-900 hover:bg-gray-100"
          }`}
        >
          Get started
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" />
        </a>
      </div>
    </FadeUp>
  );
}

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  return (
    <section
      id="pricing"
      data-theme="light"
      className="bg-white py-28 text-gray-900"
    >
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#EE3038]">
              Enterprise Pricing
            </div>
            <DualH className="text-4xl drop-shadow-md sm:text-5xl lg:text-6xl">
              Plans that scale with{" "}
              <span className="text-[#EE3038]">your ambition.</span>
            </DualH>
          </div>
        </FadeUp>

        {/* Interactive Billing Toggle */}
        <div className="flex justify-center mb-16">
          <div className="relative flex items-center p-1 bg-gray-100 rounded-full border border-gray-200/60 shadow-inner">
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                !isAnnual ? "text-white" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {!isAnnual && (
                <motion.div
                  layoutId="billing-pill-light"
                  className="absolute inset-0 bg-[#EE3038] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                isAnnual ? "text-white" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {isAnnual && (
                <motion.div
                  layoutId="billing-pill-light"
                  className="absolute inset-0 bg-[#EE3038] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                Annually
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isAnnual ? "bg-white/20 text-white" : "bg-[#EE3038]/10 text-[#EE3038]"
                }`}>
                  Save 20%
                </span>
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <PricingCard key={t.name} t={t} isAnnual={isAnnual} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <section
      id="faq"
      data-theme="dark"
      className="bg-[#1A050A] py-28 text-white relative"
    >
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#EE3038]">
              FAQs
            </div>
            <DualH className="text-4xl sm:text-5xl lg:text-6xl">
              Frequently asked <span className="text-[#EE3038]">questions.</span>
            </DualH>
          </div>
        </FadeUp>
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQS.map(([q, a], i) => {
            const isOpen = openIdx === i;
            return (
              <FadeUp key={q} delay={i * 0.05}>
                <div className="flex flex-col gap-3">
                  {/* Question (Right Side) */}
                  <div className="flex items-start justify-end gap-3 w-full">
                    <div
                      onClick={() => setOpenIdx(isOpen ? -1 : i)}
                      className={`rounded-[2rem] rounded-tr-none px-5 py-3.5 max-w-[75%] sm:max-w-[80%] text-left font-medium shadow-sm transition-all duration-300 cursor-pointer select-none ${isOpen
                        ? "bg-white text-black border border-[#EE3038]"
                        : "bg-white text-black border border-transparent hover:bg-gray-50"
                        }`}
                    >
                      <p className="text-sm md:text-base leading-relaxed">{q}</p>
                    </div>
                    <button
                      onClick={() => setOpenIdx(isOpen ? -1 : i)}
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${isOpen
                        ? "bg-[#EE3038] text-white opacity-100"
                        : "bg-white/[0.04] text-white/25 hover:bg-white/15 hover:text-white/60"
                        }`}
                      aria-label={isOpen ? "Collapse FAQ" : "Expand FAQ"}
                    >
                      {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Answer (Left Side - Hidden by Default) */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-start justify-start gap-3 w-full pr-10 md:pr-12 mt-1">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A050A] border border-[#EE3038]/30 p-2 shadow-[0_0_10px_rgba(238,48,56,0.25)] overflow-hidden">
                            <img src={favicon} alt="Q" className="h-full w-full object-contain" />
                          </div>
                          <div className="bg-white text-[#EE3038] rounded-[2rem] rounded-tl-none px-5 py-3.5 max-w-[75%] sm:max-w-[80%] text-left font-normal border border-[#EE3038] shadow-sm transition-all duration-300">
                            <p className="text-sm md:text-base leading-relaxed">{a}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}

          {/* Call to Action (Bottom Right) */}
          <FadeUp delay={FAQS.length * 0.05 + 0.1}>
            <div className="flex items-center justify-end gap-3 w-full mt-6">
              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                  setIsSubmitted(false);
                }}
                className="bg-[#EE3038] hover:bg-[#d62b32] text-white rounded-full px-6 py-3.5 font-semibold shadow-md hover:shadow-[0_4px_12px_rgba(238,48,56,0.3)] transition-all duration-300 text-sm md:text-base cursor-pointer"
              >
                Still have questions?
              </a>
              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                  setIsSubmitted(false);
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EE3038] hover:bg-[#d62b32] text-white shadow-md hover:shadow-[0_4px_12px_rgba(238,48,56,0.3)] transition-all duration-300 cursor-pointer"
                aria-label="Ask questions"
              >
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Overlay Modal (Megn Template Replica) */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-40 overflow-y-auto bg-[#1A050A] pointer-events-auto cursor-pointer"
          >
            {/* Living Wave Animations Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {/* Wave 1 (Deep Wine) */}
              <motion.div
                className="absolute bottom-0 left-0 w-[200%] h-full opacity-60"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 35, repeat: Infinity }}
              >
                <svg className="w-full h-full" viewBox="0 0 2880 1000" preserveAspectRatio="none" fill="none">
                  <path d="M0,700 Q360,550 720,700 T1440,700 Q1800,550 2160,700 T2880,700 L2880,1000 L0,1000 Z" fill="#3D0A11" />
                </svg>
              </motion.div>

              {/* Wave 2 (Crimson Wine) */}
              <motion.div
                className="absolute bottom-0 left-0 w-[200%] h-full opacity-40"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ ease: "linear", duration: 25, repeat: Infinity }}
              >
                <svg className="w-full h-full" viewBox="0 0 3200 1000" preserveAspectRatio="none" fill="none">
                  <path d="M0,750 Q400,620 800,750 T1600,750 Q2000,620 2400,750 T3200,750 L3200,1000 L0,1000 Z" fill="#5C0D17" />
                </svg>
              </motion.div>

              {/* Wave 3 (Brand Crimson Accent) */}
              <motion.div
                className="absolute bottom-0 left-0 w-[200%] h-full opacity-35"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 45, repeat: Infinity }}
              >
                <svg className="w-full h-full" viewBox="0 0 2560 1000" preserveAspectRatio="none" fill="none">
                  <path d="M0,800 Q320,710 640,800 T1280,800 Q1600,710 1920,800 T2560,800 L2560,1000 L0,1000 Z" fill="#EE3038" fillOpacity="0.3" />
                </svg>
              </motion.div>
            </div>

            {/* Centered Sizing and Centering Container */}
            <div className="min-h-full flex items-center justify-center p-4 sm:p-8 md:py-24 max-w-4xl mx-auto pointer-events-none">
              {/* Centered Content Card Wrapper (Intercepts clicks inside form area) */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                transition={{ type: "spring", duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-full flex flex-col items-center gap-12 pointer-events-auto cursor-auto"
              >
                {/* Main Header */}
                <div className="text-center flex flex-col gap-3 mt-16 md:mt-20">
                  <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-white">
                    Contact us
                  </h2>
                  <p className="font-sans text-sm md:text-base text-gray-300 max-w-lg mx-auto leading-relaxed select-none">
                    Our platform works seamlessly with your workflows, helping you verify every outdoor site and track compliance without skipping a beat.
                  </p>
                </div>

                {/* Form Card (Frosted Glassmorphic Container) */}
                <div className="w-full bg-white/10 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/15 flex flex-col gap-6">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center text-center py-16 gap-4 font-sans"
                    >
                      <div className="h-12 w-12 rounded-full bg-[#EE3038]/10 text-[#EE3038] border border-[#EE3038]/30 flex items-center justify-center">
                        <Check className="h-6 w-6 stroke-[3]" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white">Message Sent!</h3>
                      <p className="text-sm text-gray-300 leading-relaxed max-w-xs select-none">
                        Thank you for reaching out. We will get back to you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <h3 className="font-display text-xl font-bold text-white tracking-tight">
                        Fill the form
                      </h3>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-sans">
                        {/* Row 1: First Name & Last Name (Side-by-side grid) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5 text-left">
                            <label className="text-xs font-semibold text-white/60 select-none">
                              First Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="John"
                              className="w-full rounded-xl px-4 py-3.5 bg-white/5 border border-white/10 text-white caret-[#EE3038] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#EE3038]/30 text-sm cursor-text font-medium transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5 text-left">
                            <label className="text-xs font-semibold text-white/60 select-none">
                              Last Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Doe"
                              className="w-full rounded-xl px-4 py-3.5 bg-white/5 border border-white/10 text-white caret-[#EE3038] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#EE3038]/30 text-sm cursor-text font-medium transition-all"
                            />
                          </div>
                        </div>

                        {/* Row 2: Email Address (Full Width) */}
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-xs font-semibold text-white/60 select-none">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="john.doe@example.com"
                            className="w-full rounded-xl px-4 py-3.5 bg-white/5 border border-white/10 text-white caret-[#EE3038] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#EE3038]/30 text-sm cursor-text font-medium transition-all"
                          />
                        </div>

                        {/* Row 3: Message (Textarea Full Width) */}
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-xs font-semibold text-white/60 select-none">
                            Message
                          </label>
                          <textarea
                            required
                            rows={4}
                            placeholder="How can we help you?"
                            className="w-full rounded-xl px-4 py-3.5 bg-white/5 border border-white/10 text-white caret-[#EE3038] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#EE3038]/30 text-sm cursor-text font-medium transition-all resize-none"
                          />
                        </div>

                        {/* CTA Submit Button */}
                        <button
                          type="submit"
                          className="mt-2 w-full bg-[#EE3038] hover:bg-[#ff464e] text-white rounded-xl py-3.5 font-bold font-sans shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] text-center cursor-pointer text-sm"
                        >
                          Send message
                        </button>
                      </form>
                    </>
                  )}
                </div>

                {/* Reach Us Section (Side-by-side grid below the card) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
                  {/* Left Column: Reach us detail card */}
                  <div className="bg-[#FFE1E3]/20 border border-[#EE3038]/10 rounded-[2rem] p-8 flex flex-col gap-6 shadow-sm">
                    <h4 className="font-display text-2xl font-bold text-white">
                      Reach us
                    </h4>
                    
                    <div className="flex flex-col gap-4 font-sans text-sm text-gray-300">
                      <a href="mailto:support@traqsof.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                        <div className="h-10 w-10 rounded-full bg-[#EE3038]/10 text-[#EE3038] border border-[#EE3038]/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Mail className="h-5 w-5" />
                        </div>
                        support@traqsof.com
                      </a>

                      <a href="tel:+918001234567" className="flex items-center gap-3 hover:text-white transition-colors group">
                        <div className="h-10 w-10 rounded-full bg-[#EE3038]/10 text-[#EE3038] border border-[#EE3038]/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Phone className="h-5 w-5" />
                        </div>
                        +91 (800) 123-4567
                      </a>

                      <div className="flex items-start gap-3 group">
                        <div className="h-10 w-10 rounded-full bg-[#EE3038]/10 text-[#EE3038] border border-[#EE3038]/20 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <span className="leading-relaxed">
                          Traqsof Technologies, Bandra Kurla Complex, Mumbai, MH 400051, India
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Other office cards stacked */}
                  <div className="flex flex-col gap-4 justify-between">
                    {/* Sydney Office */}
                    <div className="bg-[#FFE1E3]/20 border border-[#EE3038]/10 rounded-[2rem] p-6 flex items-start gap-4 shadow-sm h-full">
                      <div className="h-10 w-10 rounded-full bg-[#EE3038]/10 text-[#EE3038] border border-[#EE3038]/20 flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="font-sans text-sm text-gray-300">
                        <div className="font-semibold text-white mb-1">Sydney Office</div>
                        <div className="leading-relaxed text-xs">
                          88 Pixel Street, 3rd Floor, Surry Hills, NSW 2010, Australia
                        </div>
                      </div>
                    </div>

                    {/* London Office */}
                    <div className="bg-[#FFE1E3]/20 border border-[#EE3038]/10 rounded-[2rem] p-6 flex items-start gap-4 shadow-sm h-full">
                      <div className="h-10 w-10 rounded-full bg-[#EE3038]/10 text-[#EE3038] border border-[#EE3038]/20 flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="font-sans text-sm text-gray-300">
                        <div className="font-semibold text-white mb-1">London Office</div>
                        <div className="leading-relaxed text-xs">
                          45 Tech Lane, Level 2, Shoreditch, London EC2A 3XY, UK
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ───────── Final CTA + Footer ───────── */
function CTA() {
  return (
    <section
      id="cta"
      data-theme="light"
      className="bg-white py-32 text-[#1A050A]"
    >
      <div className="mx-auto max-w-5xl px-6 text-center">
        <FadeUp>
          <DualH
            as="h2"
            className="text-5xl sm:text-6xl lg:text-7xl"
          >
            Ready to elevate{" "}
            <span className="text-[#EE3038]">your campaign intelligence?</span>
          </DualH>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-base text-[#1A050A]/65 sm:text-lg">
            Join the agencies turning every outdoor rupee into measurable,
            defensible proof.
          </p>
        </FadeUp>
        <FadeUp delay={0.25}>
          <a
            href="#pricing"
            className="group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#EE3038] px-10 py-5 text-base font-bold text-white shadow-[0_20px_50px_-15px_rgba(238,48,56,0.7)] transition-transform hover:scale-[1.03]"
          >
            <span className="relative z-10">Start Your 14-Day Free Trial</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    {
      title: "Product",
      links: ["Platform", "Capabilities", "Solutions", "Pricing", "Changelog"],
    },
    {
      title: "Resources",
      links: ["Docs", "API Reference", "Case Studies", "Status", "Security"],
    },
    {
      title: "Company",
      links: ["About", "Customers", "Careers", "Press", "Contact"],
    },
  ];
  return (
    <footer data-theme="dark" className="bg-[#1A050A] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 items-start">
          <div className="sm:col-span-1">
            <div className="flex flex-col items-start">
              <img src={logo} alt="Traqsof" className="h-10 w-auto" />
              <p className="mt-4 text-sm text-white/60 max-w-[280px]">
                AI-powered outdoor advertising intelligence for India's most
                demanding teams.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Bell className="h-4 w-4 text-[#EE3038]" />
                <ShieldCheck className="h-4 w-4 text-[#EE3038]" />
                <Smartphone className="h-4 w-4 text-[#EE3038]" />
              </div>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="font-display text-sm font-bold uppercase tracking-wider text-white/90">
                {c.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-white/60 transition-colors hover:text-[#EE3038]"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <div>© 2026 Traqsof. Built by Flutter Media Pvt. Ltd.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">DPA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────── Page ───────── */
function TraqsofLanding() {
  return (
    <main className="min-h-screen bg-[#1A050A] text-white antialiased overflow-clip">
      <CinematicHeader />
      <Hero />
      <Impact />
      <Capabilities />
      <Results />
      <Benefits />
      <Solution />
      <Workflow />
      <Compare />
      <Trusted />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
