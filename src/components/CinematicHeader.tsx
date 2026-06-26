import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const NAV = [
  { label: "Platform", href: "#platform" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Benefits", href: "#benefits" },
  { label: "Solutions", href: "#solutions" },
  { label: "Compare", href: "#compare" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ's", href: "#faq" },
];

export function CinematicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Framer Motion variants for cascading drop-in
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 25,
      },
    },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[#1A050A]/80 backdrop-blur-md border-b border-white/10"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-6 text-white transition-all duration-300 ${scrolled ? "h-20" : "h-24"}`}>
        {/* Logo */}
        <motion.a
          variants={itemVariants}
          href="#top"
          className="flex items-center"
        >
          <img src={logo} alt="Traqsof" className="h-14 w-auto" />
        </motion.a>

        {/* Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <motion.li key={n.label} variants={itemVariants}>
              <a
                href={n.href}
                className="group relative text-sm font-medium opacity-90 transition-opacity hover:opacity-100"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#EE3038] transition-all duration-300 group-hover:w-full" />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Right Action */}
        <motion.div variants={itemVariants} className="hidden items-center gap-6 md:flex">
          <a
            href="#login"
            className="bg-[#EE3038] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#d62b32] transition-colors shadow-[0_0_15px_rgba(238,48,56,0.5)]"
          >
            Login
          </a>
        </motion.div>

        {/* Hamburger */}
        <motion.button
          variants={itemVariants}
          aria-label="Menu"
          className="md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6 text-white" />
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#1A050A]/95 backdrop-blur-xl md:hidden"
          >
            <button
              className="absolute right-6 top-6 text-white"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X className="h-7 w-7" />
            </button>
            <ul className="flex h-full flex-col items-center justify-center gap-8 text-white">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-bold hover:text-[#EE3038] transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <a
                href="#login"
                className="text-lg hover:text-[#EE3038] transition-colors"
                onClick={() => setOpen(false)}
              >
                Login
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
