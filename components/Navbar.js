"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "./data";

const links = ["home", "projects", "about", "contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false), [active, setActive] = useState("home"), [theme, setTheme] = useState("dark");
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved); document.documentElement.dataset.theme = saved;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((l) => { const el = document.getElementById(l); el && io.observe(el); });
    return () => io.disconnect();
  }, []);
  const toggle = () => {
    const n = theme === "dark" ? "light" : "dark";
    setTheme(n); document.documentElement.dataset.theme = n; localStorage.setItem("theme", n);
  };
  return (
    <header className="nav">
      <div className="wrap bar">
        <a href="#home" className="logo">{profile.name}<small>ONLINE</small></a>
        <nav className={open ? "open" : ""}>
          {links.map((l) => (
            <a key={l} href={`#${l}`} onClick={() => setOpen(false)} className={active === l ? "on" : ""}>
              {l[0].toUpperCase() + l.slice(1)}
              {active === l && <motion.span layoutId="pill" className="pill" />}
            </a>
          ))}
          <a className="btn solid" href="#contact" onClick={() => setOpen(false)}>Hire Me</a>
        </nav>
        <button className="icon" onClick={toggle} aria-label="Toggle theme">{theme === "dark" ? "☀" : "☾"}</button>
        <button className="icon burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? "✕" : "☰"}</button>
      </div>
    </header>
  );
}
