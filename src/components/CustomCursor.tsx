import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Disable custom cursor entirely on touch devices
    const touchDevice = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    setIsTouchDevice(touchDevice);
    if (touchDevice) return;

    setIsVisible(true);
    document.documentElement.classList.add("has-custom-cursor");

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        // Hover math: Detect if mouse is over any h1, h2, or custom marked massive elements
        const hoverMassive = !!target.closest("h1, h2, [data-cursor-massive='true']");
        setIsHovered(hoverMassive);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] transition-transform duration-200 ease-out ${
        isHovered ? "bg-white mix-blend-difference" : "bg-[#EE3038]"
      }`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${isHovered ? 6 : 1})`,
      }}
    />
  );
}
